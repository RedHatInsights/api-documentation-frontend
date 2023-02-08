export interface Discovery {
    apis: Array<Group>;
}

export interface Group {
    id: string;
    name: string;
    apps: Array<App>
}

type AppWithSkipReason = {
    skip?: false;
} |
{
    skip: true;
    skipReason: string;
}

type OneOfUrlUseLocalOrSkip = {
    url: string;
} | {
    useLocalFile: true;
} | {
    skip: true;
}

export type App = {
    id: string;
    name: string;
    description: string;
    apiType: 'openapi-v3' | 'openapi-v2' | 'graphql' | 'unknown';
    url?: string;
    useLocalFile?: boolean;
    skip?: boolean;
} & AppWithSkipReason & OneOfUrlUseLocalOrSkip;

export const getPath = (app: App): string => {
    if (app.useLocalFile) {
        return `./discovery/resources/api/${app.id}/openapi.json`;
    }

    if (app.url) {
        return app.url;
    }

    throw new Error('App does not use local file or url');
}
