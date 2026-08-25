import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { Flex, FlexItem, Content, ContentVariants } from '@patternfly/react-core';
import { Table, Tbody, Td, Thead, Tr } from '@patternfly/react-table';
import { SchemaType } from './SchemaType';
import ReactMarkdown from 'react-markdown';
import { rehypePlugins } from '../../utils/markdownPlugins';

interface ParameterViewProps {
  title: string;
  parameters: OpenAPIV3.ParameterObject[];
  document: OpenAPIV3.Document;
}
export const ParameterView: React.FunctionComponent<ParameterViewProps> = ({ title, parameters, document }) => {
  return (
    <>
      <Content>
        <Content component={ContentVariants.h3} className="pf-v6-u-pb-lg">
          {title}
        </Content>
      </Content>
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
                  <FlexItem className="pf-v6-u-mr-xs">
                    <Content component={ContentVariants.p}>{p.name}</Content>
                  </FlexItem>
                  <FlexItem>
                    <Content component={ContentVariants.p} className="pf-v6-u-danger-color-100">
                      {p.required && '*'}
                    </Content>
                  </FlexItem>
                </Flex>
              </Td>
              <Td>
                <SchemaType schema={p.schema} document={document} writeEnums />
              </Td>
              <Td>{p.description && <ReactMarkdown rehypePlugins={rehypePlugins}>{p.description}</ReactMarkdown>}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
