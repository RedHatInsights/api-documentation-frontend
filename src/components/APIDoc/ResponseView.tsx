'use client';
import React, { Fragment, useState } from 'react';
import { OpenAPIV3 } from 'openapi-types';

import { buildExample, deRef, DeRefResponse } from '../../utils/Openapi';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import { Table, ExpandableRowContent, Tbody, Td, Th, Thead, Tr, TdProps } from '@patternfly/react-table';
import { ExampleResponse } from './ExampleResponse';
import { SchemaType } from './SchemaType';

interface ResponseViewProps {
  responses: OpenAPIV3.ResponsesObject;
  document: OpenAPIV3.Document;
}

const getResponseSchema = (response: OpenAPIV3.ResponseObject, document: OpenAPIV3.Document) => {
  const contents = response.content ? Object.values(response.content).filter((c) => c.schema !== undefined) : [];
  if (contents.length === 0) {
    return 'None';
  }

  // Todo we should try to display all available types
  return <SchemaType document={document} schema={contents[0].schema!} />;
};

const ApiResponse = ({
  expandInfo,
  code,
  dResponse,
  isExpanded,
  exampleResponse,
  responseSchema,
}: {
  dResponse: DeRefResponse<OpenAPIV3.ResponseObject>;
  code: string;
  expandInfo?: TdProps['expand'];
  isExpanded: boolean;
  exampleResponse?: string;
  responseSchema: ReturnType<typeof getResponseSchema>;
}) => {
  return (
    <>
      <Tr>
        <Td expand={expandInfo} />
        <Td>{code}</Td>
        <Td>{dResponse.description}</Td>
        <Td>{responseSchema}</Td>
      </Tr>
      {expandInfo && exampleResponse && (
        <Tr isExpanded={isExpanded}>
          <Td noPadding colSpan={4}>
            <ExpandableRowContent>{<ExampleResponse response={exampleResponse} />}</ExpandableRowContent>
          </Td>
        </Tr>
      )}
    </>
  );
};

export const ResponseView: React.FunctionComponent<ResponseViewProps> = ({ responses, document }) => {
  const [expandedCodes, setExpandedCodes] = useState<string[]>([]);
  const setCodeExpanded = (code: string, isExpanding = true) =>
    setExpandedCodes((prevExpanded) => {
      const otherExpandedRowNames = prevExpanded.filter((r) => r !== code);
      return isExpanding ? [...otherExpandedRowNames, code] : otherExpandedRowNames;
    });
  const isCodeExpanded = (code: string) => expandedCodes.includes(code);

  const responseMap = Object.entries(responses ?? {});

  const responseExamples = React.useMemo(() => {
    if (responses) {
      return buildExample(responses, document);
    }

    return undefined;
  }, [responses, document]);

  return responseMap.length > 0 ? (
    <>
      <TextContent className="pf-v5-u-py-lg">
        <Text component={TextVariants.h3}>Responses</Text>
      </TextContent>
      <Table variant="compact">
        <Thead>
          <Tr>
            <Th screenReaderText="empty" />
            <Td>Status</Td>
            <Td>Description</Td>
            <Td>Schema</Td>
          </Tr>
        </Thead>
        <Tbody>
          {responseMap.map(([code, response], rowIndex) => {
            const dResponse = deRef(response, document);
            const isExpanded = isCodeExpanded(code);

            let expandInfo;
            const responseSchema = getResponseSchema(dResponse, document);
            if (responseExamples && responseExamples[code]?.length > 0) {
              expandInfo = {
                rowIndex,
                isExpanded: isExpanded,
                onToggle: () => setCodeExpanded(code, !isExpanded),
                expandId: 'response-code-expanded',
              };
            }

            return (
              <ApiResponse
                key={code}
                code={code}
                dResponse={dResponse}
                expandInfo={expandInfo}
                isExpanded={isExpanded}
                responseSchema={responseSchema}
                exampleResponse={responseExamples?.[code]}
              />
            );
          })}
        </Tbody>
      </Table>
    </>
  ) : null;
};
