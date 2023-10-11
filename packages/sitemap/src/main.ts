import {APIConfiguration, apiConfigurations, pages} from "@apidocs/common";
import {getCommand} from "./program.js";
import path from "path";
import {statSync, writeFileSync} from 'fs';
import {createSitemap} from "sitemaps";
import {UrlItem} from "sitemaps";
import { collector, syncCollection } from './collector';


interface Options {
    outputDir: string;
    baseUri: string;
}

// canonical json file
const CANONICAL_JSON = 'canonical.json';

export const createApiUrlItems = (config: ReadonlyArray<Readonly<APIConfiguration>>): Array<UrlItem> => {

    return config.map(c => ({
        loc: pages.getApiPage(c.id),
        lastmod:  statSync(path.join('..', 'common', 'config', c.apiContentPath)).mtime.toISOString()
    }));
}

export const createLandingPageUrlItem = (): UrlItem => ({
    loc: pages.getLandingPage()
});

const writeCollectorContent = (content:string, options: Options) => {
    writeFileSync(
        path.resolve(options.outputDir, CANONICAL_JSON),
        content
    );
}

export const execute = async (options: Options) => {
    const urlItems = [
        createLandingPageUrlItem(),
        ...createApiUrlItems(apiConfigurations),
    ].map(u => ({
        ...u,
        loc: `${options.baseUri}${u.loc}`
    }));

    createSitemap({
        filePath: path.join(options.outputDir, 'sitemap.xml'),
        urls: urlItems
    });

    const collectorContent = await collector(apiConfigurations, options.baseUri)
    syncCollection(collectorContent)
    writeCollectorContent(collectorContent, options)
}

if (process.argv) {
    if (require.main === module) {
        const command = getCommand();
        command.parse(process.argv);
        execute(command.opts() as Options);
    }
}
