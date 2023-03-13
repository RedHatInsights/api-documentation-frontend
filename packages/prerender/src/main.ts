import {APIConfiguration, apiConfigurations, pages} from "@apidocs/common";
import {getCommand} from "./program.js";
import {mkdtempSync, mkdirSync} from "fs";
import {copySync, moveSync, removeSync} from "fs-extra";
import path from 'path';
import {PatchedSitePrerenderer} from "./site-prerender-patch";

interface Options {
    basePath?: string;
    distDir: string;
    outputDir: string;
}

export const prependBasePath = (url: string, options: Options) => url;

export const createApiRoutes = (config: ReadonlyArray<Readonly<APIConfiguration>>, options: Options): Array<string> => {
    return config.map(c => pages.getApiPage(c.id)).map(url => prependBasePath(url, options));
}

export const execute = async (options: Options) => {
    const routes = [
        prependBasePath(pages.getLandingPage(), options),
        ...createApiRoutes(apiConfigurations, options),
    ];

    const rootDir = path.resolve(mkdtempSync('pre-rendered'));
    let sourcePath = rootDir;
    let basePath = '';

    if (options.basePath) {
        sourcePath = path.join(rootDir, options.basePath);
        basePath = options.basePath;
        mkdirSync(sourcePath, {
            recursive: true
        });
    }

    copySync(options.distDir, sourcePath);

    const destDir = path.resolve(mkdtempSync('pre-rendered-output'));

    try {
        const sp = new PatchedSitePrerenderer(basePath,{
            staticPath: rootDir,
            outputFolder: destDir,
            routes
        });

        await sp.init();
        await sp.start();
        await sp.close();

        // Copy the resources we are interested in.
        // but clean the dir before starting
        removeSync(options.outputDir);
        mkdirSync(options.outputDir, {
            recursive: true
        });

        routes.forEach(route => {
            const file = path.join(route, 'index.html');
            // Server writes to the destination directory - no need to append the basePath here.
            const input = path.join(destDir, file);
            const output = path.join(options.outputDir, file);
            moveSync(input, output, {
                overwrite: true
            });
        });
    } finally {
        removeSync(rootDir);
        removeSync(destDir);
    }
}

if (process.argv) {
    if (require.main === module) {
        const command = getCommand();
        command.parse(process.argv);
        execute(command.opts() as Options);
    }
}
