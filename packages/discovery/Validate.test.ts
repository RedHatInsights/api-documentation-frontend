import {App, Discovery, getPath} from "./Discovery";
import SwaggerParser from '@apidevtools/swagger-parser';
import {readFileSync} from 'fs';
import path from 'path';
import {parse} from 'yaml';

const discovery: Discovery = parse(readFileSync(path.resolve(__dirname, 'Discovery.yml')).toString());

type WithId = {
    id: string;
}

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

const validApiTest = async (_ignore: string, app: App, groupId: string) => {
    const api = await SwaggerParser.validate(getPath(app, groupId));
    expect(api).toBeTruthy();

    expect(api).toHaveProperty('openapi');

    const version = (api as any).openapi as string;
    expect(version).toMatch(/^3(.\d(.\d)?)?/);
}

describe('Discovered OpenAPI are valid OpenAPI3.0+', () => {
    describe.each(Object.values(discovery.apis).map(g => [`${g.name}(${g.id})`, g.apps, g.id]))('%s', (_ignore, apps, group) => {
        const prepareApp = (app: App) => [`${app.name}(${app.id})`, app, group] as const;

        const skipped = apps.filter(skipFilter);

        const appsWithPublicUrls = apps.filter(publicApiFilter);
        const appsWithNonPublicUrls = apps.filter(privateApiFilter);

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
                test.each(appsWithPublicUrls.map(prepareApp))('%s', validApiTest);
            });
        }

        if (appsWithNonPublicUrls.length > 0) {
            describe('local file', () => {
                test.each(appsWithNonPublicUrls.map(prepareApp))('%s', validApiTest);
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
