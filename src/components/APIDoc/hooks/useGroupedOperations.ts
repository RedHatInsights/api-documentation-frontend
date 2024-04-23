import {OpenAPIV3} from "openapi-types";
import {Tag} from "./useTags";
import {BackgroundTaskState, useBackgroundTask} from "../../../hooks/useBackgroundTask";

interface Operation {
    id: string;
    rawOperation: OpenAPIV3.OperationObject;
    verb: string;
    baseUrl: string;
    path: string;
}

interface Group extends Tag {
    operationIds: Array<string>;
}

export interface GroupedOperations {
    groups: Array<Group>;
    others: Array<string>;
    operations: Record<string, Operation>;
}

const operationVerbs: string[] = ["get", "post", "patch", "put", "delete", "options", "head", "trace"]

const getServerURL = (server: OpenAPIV3.ServerObject): string => {
    let serverURL = server.url

    if (!server.variables) {
        return serverURL
    }

    for (const variable in server.variables) {
        serverURL = serverURL.replace(`{${variable}}`, server.variables[variable].default)
    }

    return serverURL
}

const loadGrouped = (openapi: OpenAPIV3.Document, grouped: GroupedOperations) => {
    const defaultUrl = "https://www.console.redhat.com"
    let baseUrl = getServerURL(openapi.servers?.[0] || {url: defaultUrl});
    
    // check to see if baseurl was loaded with a /, and try to append it to the defaultUrl
    if(baseUrl.startsWith("/")) {
        baseUrl = defaultUrl + baseUrl;
    }

    // check that baseUrl is a valid url
    try {
        new URL(baseUrl);
    } catch (e) {
        console.warn("Invalid baseUrl: ", baseUrl, e)
        baseUrl = defaultUrl;
    }
    // if baseUrl ends in a /, remove it
    if (baseUrl.endsWith("/")) {
        baseUrl = baseUrl.substring(0, baseUrl.length - 1);
    }

    Object.entries(openapi.paths)
        // Looks like openapi v3.1 supports components here as well
        .forEach(([path, pathObject]) =>
            Object.entries(pathObject as Record<OpenAPIV3.HttpMethods, OpenAPIV3.OperationObject>)
                .filter(([verb, _operation]) => operationVerbs.includes(verb))
                .forEach(([verb, operation]) => {
                    const operationId = operation.operationId || `${verb}-${path}`;
                    grouped.operations[operationId] = {
                        id: operationId,
                        rawOperation: operation,
                        verb,
                        baseUrl,
                        path
                    };

                    let found = false;

                    if (operation.tags) {
                        for (const group of grouped.groups) {
                            if (operation.tags.includes(group.id)) {
                                found = true;
                                group.operationIds.push(operationId);
                            }
                        }
                    }

                    if (!found) {
                        grouped.others.push(operationId);
                    }
                })
        );

    grouped.groups = grouped.groups.filter(g => g.operationIds.length > 0);
}

export const useGroupedOperations = (openapi: OpenAPIV3.Document | undefined, tags: Array<Tag>): BackgroundTaskState<GroupedOperations> => {
    return useBackgroundTask(() => {
        const grouped: GroupedOperations = {
            groups: tags.map(t => ({
                ...t,
                operationIds: []
            })),
            others: [],
            operations: {}
        };

        if (openapi) {
            loadGrouped(openapi, grouped);
        }

        return grouped;
    }, [openapi, tags]);
}
