import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { Flex, FlexItem, Text, TextContent, TextVariants } from '@patternfly/react-core';
import { Tbody, Td, Thead, Tr } from '@patternfly/react-table';
import { Table } from '@patternfly/react-table/deprecated';
import { SchemaType } from './SchemaType';

interface ParameterViewProps {
  title: string;
  parameters: OpenAPIV3.ParameterObject[];
  document: OpenAPIV3.Document;
}
export const ParameterView: React.FunctionComponent<ParameterViewProps> = ({ title, parameters, document }) => {
  return (
    <>
      <TextContent>
        <Text component={TextVariants.h3} className="pf-v5-u-pb-lg">
          {title}
        </Text>
      </TextContent>
      <Table variant="compact">
        <Thead>
          <Tr>
            <Td>Name</Td>
            <Td>Type</Td>
            <Td>Description</Td>
          </Tr>
        </Thead>
        <Tbody>
          {parameters.map((p, index) => (
            <Tr key={index}>
              <Td>
                <Flex>
                  <FlexItem className="pf-v5-u-mr-xs">
                    <Text component={TextVariants.p}>{p.name}</Text>
                  </FlexItem>
                  <FlexItem>
                    <Text component={TextVariants.p} className="pf-v5-u-danger-color-100">
                      {p.required && '*'}
                    </Text>
                  </FlexItem>
                </Flex>
              </Td>
              <Td>
                <SchemaType schema={p.schema} document={document} writeEnums />
              </Td>
              <Td>{p.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
