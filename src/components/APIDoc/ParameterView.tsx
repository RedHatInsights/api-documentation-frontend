import React from "react"
import { OpenAPIV3 } from 'openapi-types';
import {Flex, FlexItem, Text, TextContent, TextVariants} from '@patternfly/react-core';
import { TableComposable, Tbody, Td, Thead, Tr } from "@patternfly/react-table";
import { deRef } from "../../utils/Openapi";


interface ParameterViewProps {
    title: string;
    parameters: OpenAPIV3.ParameterObject[];
    document: OpenAPIV3.Document;
}
export const ParameterView: React.FunctionComponent<ParameterViewProps> = ({title, parameters, document}) => {
    return (
        <>
            <TextContent>
            <Text component={TextVariants.h3} className="pf-u-pb-lg">{title}</Text>
            </TextContent>
            <TableComposable variant="compact">
            <Thead>
                <Tr>
                <Td>Name</Td>
                <Td>Type</Td>
                <Td>Description</Td>
                </Tr>
            </Thead>
            <Tbody>
                {parameters.map(((p, index) => (
                <Tr key={index}>
                    <Td>{p.name}</Td>
                    <Td>
                        <Flex>
                            <FlexItem className="pf-u-mr-xs">
                                <Text component={TextVariants.p}>{getType(p.schema, document)}</Text>
                            </FlexItem>
                            <FlexItem>
                                <Text component={TextVariants.p} className="pf-u-danger-color-100">{p.required && "*"}</Text>
                            </FlexItem>
                        </Flex>
                    </Td>
                    <Td>{p.description}</Td>
                </Tr>
                )))}
            </Tbody>
            </TableComposable>
        </>
    )
}


const getType = (schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined, document: OpenAPIV3.Document) => {
    if (schema === undefined) {
        return 'Unknown';
    }

    const dSchema = deRef(schema, document);

    if (dSchema.enum) {
        return dSchema.enum.join(' | ');
    }

    return dSchema.type;
}
