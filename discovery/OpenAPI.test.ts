import {App, Discovery, getPath, Tag} from "./Discovery";
import SwaggerParser from '@apidevtools/swagger-parser';
import {readFileSync} from 'fs';
import path from 'path';
import {parse} from 'yaml';
import Ajv from 'ajv';
import DiscoverySchema from './schemas/Discovery.json';

const discovery: Discovery = parse(readFileSync(path.resolve(__dirname, 'Discovery.yml')).toString());

type WithId = {
    id: string;
}

const extractName = (app: App) => [`${app.name}(${app.id})`, app] as const;

const skipReason = (app: App) => {
    if (app.skip) {
        return app.skipReason;
    }

    if (app.apiType !== 'openapi-v3') {
        return `Only OpenApiV3 is supported right now. App has ${app.apiType}`;
    }

    throw new Error('No valid reason to skip this test');
};

const skipFilter = (app: App): boolean => app.skip || app.apiType  !== 'openapi-v3';
const publicApiFilter = (app: App): boolean => !skipFilter(app) && !app.useLocalFile;
const privateApiFilter = (app: App): boolean => !skipFilter(app) && !!app.useLocalFile;
const idMapper = (withId: WithId): string => withId.id;

const validApiTest = async (_ignore: string, app: App) => {
    const api = await SwaggerParser.validate(getPath(app));
    expect(api).toBeTruthy();

    expect(api).toHaveProperty('openapi');

    const version = (api as any).openapi as string;
    expect(version).toMatch(/^3(.\d(.\d)?)?/);
}

const expectNonRepeatedIds = (arrayOfItemsWithId: Array<WithId>) => {
    const idSet = new Set(arrayOfItemsWithId.map(idMapper));
    const repeatedIds = [];
    for (const itemId of arrayOfItemsWithId.map(idMapper)) {
        if (idSet.has(itemId)) {
            idSet.delete(itemId);
        } else {
            repeatedIds.push(itemId);
        }
    }

    expect(repeatedIds).toHaveLength(0);
}

describe('Discovered OpenAPI are valid OpenAPI3.0+', () => {

    test('Discovery file is valid', () => {
        const validate = new Ajv().compile(DiscoverySchema);

        const valid = validate(discovery);
        if (!valid) {
            throw new Error('Invalid discovery file:' + JSON.stringify(validate.errors, null,  2));
        }
    });

    test('No repeated tag.id', () => {
        expectNonRepeatedIds(discovery.tags);
    })

    describe.each(Object.values(discovery.apis).map(a => [`${a.name}(${a.id})`, a.apps]))('%s', (_ignore, apps) => {
        const skipped = apps.filter(skipFilter);

        const appsWithPublicUrls = apps.filter(publicApiFilter);
        const appsWithNonPublicUrls = apps.filter(privateApiFilter);

        test('No repeated app.id within groups', () => {
            expectNonRepeatedIds(apps);
        });

        describe('Using valid tags', () => {
            const tagIds = discovery.tags.map(idMapper);
            const appWithTags = apps.filter(a => !!a.tags);
            if (appWithTags.length > 0) {
                test.each(appWithTags.map(extractName))('%s', (_unused, app) => {
                    expect(tagIds).toEqual(expect.arrayContaining(app.tags as Array<Tag['id']>));
                })
            }
        })

        test('Testing all APIs one way or another', () => {
            const allPieces = [
                ...skipped.map(idMapper),
                ...appsWithPublicUrls.map(idMapper),
                ...appsWithNonPublicUrls.map(idMapper)
            ];

            expect(allPieces).toHaveLength(apps.length);
            expect(allPieces).toEqual(expect.arrayContaining(apps.map(idMapper)));
        });

        if (appsWithPublicUrls.length > 0) {
            describe('public url', () => {
                test.each(appsWithPublicUrls.map(extractName))('%s', validApiTest);
            });
        }

        if (appsWithNonPublicUrls.length > 0) {
            describe('local file', () => {
                test.each(appsWithNonPublicUrls.map(extractName))('%s', validApiTest);
            });
        }
        if (skipped.length > 0) {
            describe('Skipped', () => {
                test.skip.each(skipped.map(a => `${a.name}(${a.id}) - ${skipReason(a)}`))('%s', () => {
                    throw new Error('Should skip this test');
                });
            })
        }
    })
});
