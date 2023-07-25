import React from 'react';
import {OpenAPIV3} from "openapi-types";
import {Text, TextContent, TextList, TextListItem, TextVariants} from "@patternfly/react-core";

export interface ServerListProps {
    servers: Array<OpenAPIV3.ServerObject>;
}

export const ServerList: React.FunctionComponent<ServerListProps> = ({servers}) =>
    <TextContent>
        <Text component={TextVariants.p} className="pf-u-my-sm">Base URLs:</Text>
        <TextList isPlain>
            {servers.map((server, index) => <TextListItem key={index}>
                {getServerURL(server)}
            </TextListItem>)}
        </TextList>
    </TextContent>;


const getServerURL = (server: OpenAPIV3.ServerObject): string => {
    let serverURL = server.url
    if (server.description) {
        serverURL = `${server.description}: ${server.url}`
    }

    if (!server.variables) {
        return serverURL
    }

    for (const variable in server.variables) {
        serverURL = serverURL.replace(`{${variable}}`, server.variables[variable].default)
    }

    return serverURL
}
