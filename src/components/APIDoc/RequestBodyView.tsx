import React from "react";
import {OpenAPIV3} from "openapi-types";
import { deRef, DeRefResponse } from '../../utils/Openapi';
import { Flex, FlexItem, Text, TextContent, TextVariants } from "@patternfly/react-core";
import { SchemaDataView } from './SchemaDataView';


interface BodySchemaInfo {
    schemaType: string;
    schema?: DeRefResponse<OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject>;
    refSchema?: string;
}

export interface RequestBodyViewProps {
    requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject;
    document: OpenAPIV3.Document;
}
export const RequestBodyView: React.FunctionComponent<RequestBodyViewProps> = ({ requestBody, document }) => {
    let requestBodySchemas = [] as BodySchemaInfo[]
    let requestBodyRef = undefined

    if (requestBody && 'content' in requestBody) {
        requestBodySchemas = Object.entries(requestBody.content).map(([mediatype, mediaObject]) => {

        if (mediaObject.schema !== undefined) {
            const schema = mediaObject.schema as OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject
            if ('$ref' in schema) {
                return {schemaType: mediatype, refSchema: schema.$ref.split('/').at(-1) as string}
            }
            return {schemaType: mediatype, schema: deRef(schema, document)}
        }
        return {schemaType: mediatype, schema: {} as DeRefResponse<OpenAPIV3.NonArraySchemaObject> }
        })
    } else if (requestBody) {
        requestBodyRef = requestBody.$ref.split('/').at(-1) as string
    }

    return (
        <>
            <TextContent>
                <Text component={TextVariants.h3} className="pf-u-pb-lg apid-reqbody-header">Request Body Schema</Text>
            </TextContent>
            {
                requestBodySchemas.map((bodySchema) => {
                    if (bodySchema.schema) {
                        return <SchemaDataView schemaName={bodySchema.schemaType} schema={bodySchema.schema} document={document} />
                    }
                    return bodySchema.refSchema && <RefSchemaView schemaType={bodySchema.schemaType} refSchema={bodySchema.refSchema} />
                })
            }
            {requestBodyRef && <RefSchemaView schemaType="schema" refSchema={requestBodyRef}/>}
        </>
    )
}

interface RefSchemaViewProps {
    schemaType: string;
    refSchema: string;
}
export const RefSchemaView: React.FunctionComponent<RefSchemaViewProps> = ({ schemaType, refSchema }) => {
    return(
        <TextContent>
            <Flex>
                <FlexItem>
                    <Text component={TextVariants.p}>{schemaType}</Text>
                </FlexItem>
                <FlexItem>
                    <Text component={TextVariants.h6}>{refSchema}</Text>
                </FlexItem>
            </Flex>
        </TextContent>
    )
}
