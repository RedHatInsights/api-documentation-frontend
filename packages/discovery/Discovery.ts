export interface Discovery {
    apis: Array<Group>;
    tags: Array<Tag>;
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
    icon: 'ansible' | 'edge' | 'insights' | 'openshift' | 'services' | 'subscriptions';
    tags?: Array<Tag['id']>;
    serverUrl?: string; 
    url?: string;
    useLocalFile?: boolean;
    skip?: boolean;
} & AppWithSkipReason & OneOfUrlUseLocalOrSkip;

export type Tag = {
    id: string;
    name: string;
}

export const getPath = (app: App, groupId: string): string => {
    if (app.useLocalFile) {
        return `${__dirname}/resources/api/${groupId}/${app.id}/openapi.json`;
    }

    if (app.url) {
        return app.url;
    }

    throw new Error('App does not use local file or url');
}
