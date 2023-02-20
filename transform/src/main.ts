import {Discovery, App} from "discovery/Discovery";
import {parse} from "yaml";
import prettier from 'prettier';
import pLimit from 'p-limit';
import {mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from "fs";
import path from "path";
import got from "got";
import {getCommand} from "./program.js";
import { fileURLToPath } from 'url'
import Dot, {templateSettings} from 'dot';
import * as Eta from "eta"
import render from "eta/dist/types/render";
import SwaggerParser from "@apidevtools/swagger-parser";
import {OpenAPI} from "openapi-types";

interface Options {
    discoveryFile: string;
    outputDir: string;
}

type BuildApi = {
    path: Array<string>;
    apiContent: object;
    app: App;
    apiIsValid: boolean;
}

const getApiContent = async (discoveryPath: string, app: App, group: string): Promise<string> => {
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

export const execute = async (options: Options) => {
    const limit = pLimit(5); // 5 downloads at once

    const discoveryContent = parse(readFileSync(options.discoveryFile).toString()) as Discovery;
    const discoveryPath = path.dirname(options.discoveryFile);

    // Download all the APIs and build
    const buildApis: Array<BuildApi> = await Promise.all(discoveryContent.apis
        .flatMap(group => group.apps
            // Ignore apps that were skipped or are not openapiv3
            .filter(app => !app.skip && app.apiType === "openapi-v3")
            .map(async (app) => {
                return await limit(async (): Promise<BuildApi> => {
                    let content = {};
                    let apiIsValid;
                    try {
                        const apiContent = await getApiContent(discoveryPath, app, group.id);
                        content = JSON.parse(apiContent);
                        await SwaggerParser.validate(JSON.parse(apiContent) as OpenAPI.Document);
                        apiIsValid = true;
                    } catch {
                        apiIsValid = false;
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

    // Delete openapi files except the ones that failed the validation
    // Those are not going to be updated, so lets keep the previous valid version
    const invalidApps = buildApis.filter(a => !a.apiIsValid);

    readdirSync(
        path.resolve(
            options.outputDir,
            'apis'
        )
    )
    .flatMap(
        group => readdirSync(
            path.resolve(
                options.outputDir,
                'apis',
                group
            )
        ).map(app => [group, app])
    )
    .filter(appPath => !invalidApps.find(k => appPath[0] === k.path[0] && appPath[1] === k.path[1]))
    .forEach(toDelete => rmSync(
        path.resolve(
            options.outputDir,
            'apis',
            ...toDelete
        ),
        {
            recursive: true
        }
    ));

    // Write openapi files
    buildApis.forEach(api => {

        if (!api.apiIsValid) {
            console.log(`Validation failed for app: ${api.app.id}... Skipping`);
            return;
        }

        mkdirSync(
            path.resolve(
                options.outputDir,
                'apis',
                ...api.path
            ),
            {
                recursive: true
            }
        );

        writeFileSync(
            path.resolve(
                options.outputDir,
                'apis',
                ...api.path,
                'openapi.json'
            ),
            JSON.stringify(api.apiContent, null, 2)
        );
    });

    // Write ts file
    const templateFile = path.resolve('src', 'apis.eta');
    const templateString = readFileSync(templateFile).toString();
    /*const template = Dot.template(templateString, {
        ...Dot.templateSettings,
        strip: false,
        selfcontained: true,

    });
    const result = template({
        api: buildApis
    });*/

    const result = Eta.render(templateString, {
        api: buildApis
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

if (process.argv) {
    const nodePath = path.resolve(process.argv[1]);
    const modulePath = path.resolve(fileURLToPath(import.meta.url))

    if (nodePath === modulePath) {
        const command = getCommand();
        command.parse(process.argv);
        execute(command.opts() as Options);
    }
}
