import React from 'react';
import {OpenAPIV3} from "openapi-types";
import {deRef} from "../../utils/Openapi";
import {Operation} from "./Operation";
import {TextContent, Text, TextVariants, Stack, StackItem, Bullseye, Spinner} from "@patternfly/react-core";
import {ServerList} from "./ServerList";
import {SecuritySchemeList} from "./SecuritySchemeList";
import {useBackgroundTask} from "../../hooks/useBackgroundTask";
import { SchemaViewer } from './SchemaViewer';
import {Operations} from "./Operations";

interface ApiDocProps {
    openapi: OpenAPIV3.Document;
}

const operationVerbs: string[] = ["get", "post", "patch", "put", "delete", "options", "head", "trace"]

export const ApiDoc: React.FunctionComponent<ApiDocProps> = props => {
    const { openapi } = props;

    const paths = useBackgroundTask(() => {
        return Object.entries(openapi.paths).map(([path, pathObject]) => {
            return Object.entries(
                // Looks like openapi v3.1 supports components here as well
                pathObject as Record<OpenAPIV3.HttpMethods, OpenAPIV3.OperationObject>
            ).map(([verb, operation]) => operationVerbs.includes(verb) &&
                <Operation key={`${verb} ${path}`} verb={ verb } path={ path } operation={ operation } document={ openapi }/>
            );
        });
    }, [openapi]);

    return <Stack hasGutter>
        <StackItem>
            <TextContent>
                <Text component={TextVariants.h1}>
                    { openapi.info.title } v{ openapi.info.version}
                </Text>
                <Text component={TextVariants.p}>
                    { openapi.info.description }
                </Text>
            </TextContent>
        </StackItem>
        { openapi.servers && (
            <StackItem>
                <ServerList servers={openapi.servers}/>
            </StackItem>
        )}
        { openapi.components?.securitySchemes && (
            <StackItem>
                <SecuritySchemeList schemes={Object.values(openapi.components.securitySchemes).map(s => deRef(s, openapi))} />
            </StackItem>
        )}
        { paths.loading ? <Bullseye><Spinner /></Bullseye> : <Operations>{paths.value}</Operations> }
        <StackItem>
            <SchemaViewer document={ openapi }/>
        </StackItem>
    </Stack>;
}
