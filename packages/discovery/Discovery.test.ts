import {describe, test, expect} from 'vitest';
import {App, Discovery, getPath, Tag} from "./Discovery";
import {readFileSync, existsSync} from 'fs';
import path from 'path';
import {parse} from 'yaml';
import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';
import DiscoverySchema from './schemas/Discovery.json';

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

describe('Discovery', () => {

    test('Discovery file is valid', () => {
        const validate = new Ajv().compile(DiscoverySchema);

        const valid = validate(discovery);
        if (!valid) {
            const output = betterAjvErrors(DiscoverySchema, discovery, validate.errors!, {
                format: 'cli',
                indent: 2
            });
            console.log(output);
            throw new Error('Invalid discovery file');
        }
    });

    test('No repeated tag.id', () => {
        expectNonRepeatedIds(discovery.tags);
    })

    describe.each(Object.values(discovery.apis).map(g => [`${g.name}(${g.id})`, g.apps, g.id]))('%s', (_ignore, apps, group) => {
        const prepareApp = (app: App) => [`${app.name}(${app.id})`, app, group] as const;
        const appsWithNonPublicUrls = apps.filter(privateApiFilter);

        test('No repeated app.id within groups', () => {
            expectNonRepeatedIds(apps);
        });

        const appWithTags = apps.filter(a => !!a.tags);
        if (appWithTags.length > 0) {
            describe('Using valid tags', () => {
                const tagIds = discovery.tags.map(idMapper);
                test.each(appWithTags.map(prepareApp))('%s', (_unused, app) => {
                    expect(tagIds).toEqual(expect.arrayContaining(app.tags as Array<Tag['id']>));
                })
            })
        }

        if (appsWithNonPublicUrls.length > 0) {
            describe('local file', () => {
                test.each(appsWithNonPublicUrls.map(prepareApp))('%s', (_ignore: string, app: App, groupId: string) => {
                    expect(existsSync(getPath(app, groupId))).toBeTruthy();
                });
            });
        }
    })
});
