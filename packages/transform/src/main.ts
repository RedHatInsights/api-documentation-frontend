import {Discovery, App, Tag, Group} from "@apidocs/discovery";
import {parse} from "yaml";
import prettier from 'prettier';
import pLimit from 'p-limit';
import {mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, existsSync} from "fs";
import path from "path";
import got from "got";
import {getCommand} from "./program.js";
import { fileURLToPath } from 'url'
import * as Eta from "eta"
import SwaggerParser from "@apidevtools/swagger-parser";
import {OpenAPI} from "openapi-types";
import {canonicalize} from "json-canonicalize";

interface Options {
    discoveryFile: string;
    outputDir: string;
    skipApiFetch: boolean;
}

type BuildApi = {
    path: Array<string>;
    apiContent: object;
    app: App;
    apiIsValid: boolean;
}

// output dir to place the openapi files
const OUTPUT_APIS_DIR = 'apis';

// How many files download at once (concurrency)
const DOWNLOAD_AT_ONCE = 5;

const getApiContent = async (discoveryPath: string, app: App, group: string, options: Options): Promise<string> => {
    if (options.skipApiFetch) {
        const apiPath = path.resolve(
            options.outputDir,
            OUTPUT_APIS_DIR,
            group,
            app.id,
            'openapi.json'
        );

        if (existsSync(apiPath)) {
            return readFileSync(apiPath).toString();
        }

        // Return an empty json if we don't have the file and we are not to fetch apis
        return '{}';
    }

    if (app.useLocalFile) {
        return readFileSync(path.resolve(
            discoveryPath,
            'resources',
            'api',
            group,
            app.id,
            'openapi.json'
        )).toString();
    } else if (app.url) {
        return got.get(app.url).text();
    } else {
        throw new Error('API was not skipped, but is not using local file or url:' + app.id);
    }
}

const getDiscoveryPath = (options: Options): string => path.dirname(options.discoveryFile);
const areCanonicallyEqual = (object1: object, object2: object) => canonicalize(object1) === canonicalize(object2);

const downloadApis = (groups: Array<Group>, options: Options): Promise<Array<BuildApi>> => Promise.all(groups
    .flatMap(group => group.apps
        // Ignore apps that were skipped or are not openapiv3
        .filter(app => !app.skip && app.apiType === "openapi-v3")
        .map(async (app) => {
            return await pLimit(DOWNLOAD_AT_ONCE)(async (): Promise<BuildApi> => {
                let content = {};
                let apiIsValid = false;
                try {
                    const apiContent = await getApiContent(getDiscoveryPath(options), app, group.id, options);
                    content = JSON.parse(apiContent);
                    await SwaggerParser.validate(JSON.parse(apiContent) as OpenAPI.Document);
                    if ('openapi' in content && typeof content.openapi === 'string' && content.openapi.match(/^3(.\d(.\d)?)?/)) {
                        apiIsValid = true;
                    }
                } catch {
                    // Ignore exceptions, API is not valid.
                }

                return ({
                    path: [ group.id, app.id ],
                    apiContent: content,
                    app,
                    apiIsValid
                })
            });
        })
    )
);

const cleanUnusedApiFiles = (foundApis: Array<BuildApi>, options: Options) => {
    readdirSync(
        path.resolve(
            options.outputDir,
            OUTPUT_APIS_DIR
        )
    )
        .flatMap(
            group => readdirSync(
                path.resolve(
                    options.outputDir,
                    OUTPUT_APIS_DIR,
                    group
                )
            ).map(app => [group, app])
        )
        .filter(appPath => !foundApis.find(k => appPath[0] === k.path[0] && appPath[1] === k.path[1]))
        .forEach(toDelete => rmSync(
            path.resolve(
                options.outputDir,
                OUTPUT_APIS_DIR,
                ...toDelete
            ),
            {
                recursive: true
            }
        ));
}

const writeOpenApiFiles = (foundApis: Array<BuildApi>, options: Options) => {
    foundApis.forEach(api => {

        if (!api.apiIsValid) {
            console.error(`Validation failed for app: ${api.app.id}... Skipping`);
            return;
        }

        mkdirSync(
            path.resolve(
                options.outputDir,
                OUTPUT_APIS_DIR,
                ...api.path
            ),
            {
                recursive: true
            }
        );

        // We are not writing the JSON file if the contents represent the same OpenAPI
        const destinationFile = path.resolve(
            options.outputDir,
            OUTPUT_APIS_DIR,
            ...api.path,
            'openapi.json'
        );

        let writeFile = true;
        if (existsSync(destinationFile)) {
            if (areCanonicallyEqual(
                JSON.parse(readFileSync(destinationFile).toString()),
                api.apiContent
            )) {
                writeFile = false;
            }
        }

        if (writeFile) {
            writeFileSync(
                destinationFile,
                JSON.stringify(api.apiContent, null, 2)
            );
        }
    });
};

const writeTsTemplates = (foundApis: Array<BuildApi>, tags: Array<Tag>, options: Options) => {
    const templateFile = path.resolve('src', 'apis.eta');
    const templateString = readFileSync(templateFile).toString();

    const result = Eta.render(templateString, {
        api: foundApis,
        tags: tags
    }, {
        filename: templateFile
    }) as string;

    const prettyResult = prettier.format(
        result,
        {
            parser: 'typescript'
        }
    );

    writeFileSync(
        path.resolve(options.outputDir, 'apis.ts'),
        prettyResult
    );
}

const filterTags = (tags: ReadonlyArray<Tag>, apis: ReadonlyArray<BuildApi>) => {
    return tags.filter(t => {
        // Only include tags that are in at least one api
        return apis.some(api => api.app.tags?.includes(t.id));
    });
}

export const execute = async (options: Options) => {
    const discoveryContent = parse(readFileSync(options.discoveryFile).toString()) as Discovery;

    const buildApis: Array<BuildApi> = await downloadApis(discoveryContent.apis, options);
    cleanUnusedApiFiles(buildApis, options);
    writeOpenApiFiles(buildApis, options);

    const tags = filterTags(discoveryContent.tags, buildApis);

    writeTsTemplates(buildApis, tags, options);
}

if (process.argv) {
    const nodePath = path.resolve(process.argv[1]);
    const modulePath = path.resolve(fileURLToPath(import.meta.url))

    if (nodePath === modulePath) {
        const command = getCommand();
        command.parse(process.argv);
        execute(command.opts() as Options);
    }
}
