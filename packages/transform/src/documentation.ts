import {Group, App} from "@apidocs/discovery"
import {existsSync, readdirSync, readFileSync} from "fs";
import path from "path";
import snakeCase from 'lodash.snakecase';

export type DocumentationMap = {
    [documentationType: string]: string;
}

const documentationTypes: ReadonlyArray<string>
    = [
    'getting_started'
];

const acceptedExtensions: ReadonlyArray<string> = [ '.md' ];

const CONTENT_DIR = 'content';


const isDocumentation = (maybeDocumentation: string): boolean => {
    return (documentationTypes as ReadonlyArray<string>).includes(maybeDocumentation);
}

export const getDocumentationContents = (group: Group, app: App, baseDir: string): DocumentationMap => {
    const pathToContent = path.resolve(
        baseDir,
        CONTENT_DIR,
        group.id,
        app.id
    );

    const results: DocumentationMap = {};

    if (!existsSync(pathToContent)) {
        return results;
    }

    const contents = readdirSync(pathToContent, {
        withFileTypes: true
    });

    for (const content of contents) {
        let processed: boolean = false;
        if (content.isFile()) {
            const pathFile = path.parse(content.name);
            if (acceptedExtensions.includes(pathFile.ext.toLowerCase())) {
                const contentType = snakeCase(pathFile.name);
                if (isDocumentation(contentType)) {
                    processed = true;
                    results[contentType] = readFileSync(path.resolve(
                        pathToContent,
                        content.name
                    )).toString();
                }
            }
        }

        if (!processed) {
            console.warn(`Ignoring unknown ${content.isFile() ? 'file' : 'directory'}: ${content.name}`);
        }
    }

    return results;
}
