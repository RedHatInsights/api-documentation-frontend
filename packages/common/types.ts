import {OpenAPIV3} from "openapi-types";
import {APIConfigurationIcons} from "./config/APIConfigurationIcons";

export interface APIContent {
    openapi: OpenAPIV3.Document;
    extras: Record<string, string>;
}

export const ExtraAPIContent = {
    GETTING_STARTED: 'getting_started'
} as const;

export interface APIConfiguration {
    id: string;
    displayName: string;
    icon:  keyof typeof APIConfigurationIcons;
    description: string;
    apiContentPath: string;
    serverUrl: string;
    getApiContent: () => Promise<APIContent>;
    tags: ReadonlyArray<Readonly<APILabel>>;
}

export interface DevRedHatTaxonomy {
    topic?: string;
    product?: string;
}

export interface APILabel {
    id: string;
    name: string;
    type: 'use-case' | 'service' | 'platform';
    devRedHatTaxonomy: DevRedHatTaxonomy;
}
