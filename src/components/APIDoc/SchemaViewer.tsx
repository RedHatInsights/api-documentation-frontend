import React from "react"
import { OpenAPIV3 } from 'openapi-types';
import { SchemaDataView } from './SchemaDataView';
import { deRef } from '../../utils/Openapi';
import { Accordion, Text, TextContent, TextVariants } from '@patternfly/react-core';

interface SchemaViewerProps {
    document: OpenAPIV3.Document
}

export const SchemaViewer: React.FunctionComponent<SchemaViewerProps> = ({ document }) => {
    const schemas = document.components?.schemas;

    return(
        <>
            <TextContent className="pf-u-pb-lg">
                <Text component={TextVariants.h2}>
                    Schemas
                </Text>
            </TextContent>
            <Accordion className="apid-c-accordion-schemas" isBordered>
            {   schemas && Object.entries(schemas).map(([schemaName, schemaObject]) => {
                    return <SchemaDataView key={schemaName} schemaName={schemaName} schema={deRef(schemaObject, document)} document={document}/>
                })
            }
            </Accordion>
        </>
    )
}
