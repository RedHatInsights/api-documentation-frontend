import React, {useState} from 'react';
import {OpenAPIV3} from "openapi-types";

import {buildExample, deRef} from "../../utils/Openapi";
import {
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import {ExpandableRowContent, TableComposable, Tbody, Td, Th, Thead, Tr} from "@patternfly/react-table";
import {ExampleResponse} from "./ExampleResponse";
import {SchemaType} from "./SchemaType";

interface ResponseViewProps {
  responses: OpenAPIV3.ResponsesObject;
  document: OpenAPIV3.Document;
}

export const ResponseView: React.FunctionComponent<ResponseViewProps> = ({responses, document}) => {
  const [expandedCodes, setExpandedCodes] = useState<string[]>([])
  const setCodeExpanded = (code: string, isExpanding = true) => setExpandedCodes(prevExpanded => {
    const otherExpandedRowNames = prevExpanded.filter(r => r !== code);
    return isExpanding ? [...otherExpandedRowNames, code] : otherExpandedRowNames;
    });
  const isCodeExpanded = (code: string) => expandedCodes.includes(code);

  const responseMap = Object.entries(responses ?? {});

  const responseExamples = React.useMemo(() => {
    if (responses) {
     return buildExample(responses, document);
    }

    return undefined;
  }, [ responses, document]);

  return (
    <>
      { responseMap.length > 0 && <>
        <TextContent className="pf-u-py-lg">
        <Text component={TextVariants.h3} >Responses</Text>
        </TextContent>
        <TableComposable variant="compact">
        <Thead>
          <Tr>
          <Th/>
          <Td>Status</Td>
          <Td>Description</Td>
          <Td>Schema</Td>
          </Tr>
        </Thead>
        <Tbody>
        {responseMap.map(([code, response],rowIndex) => {
          const dResponse = deRef(response, document);

          let expandInfo;
          if (responseExamples && responseExamples[code]?.length > 0) {
            expandInfo = {
              rowIndex,
              isExpanded: isCodeExpanded(code),
              onToggle: () => setCodeExpanded(code, !isCodeExpanded(code)),
              expandId: 'response-code-expanded'
            }
          }

          return <>
            <Tr key={code} >
              <Td expand={expandInfo}/>
              <Td>{code}</Td>
              <Td>{dResponse.description}</Td>
              <Td>{getResponseSchema(dResponse, document)}</Td>
            </Tr>
            {
              expandInfo && <Tr isExpanded={isCodeExpanded(code)}>
              <Td noPadding={true} colSpan={4}>
                  <ExpandableRowContent>
                    {responseExamples && <ExampleResponse response={responseExamples[code]}/>}
                  </ExpandableRowContent>
              </Td>
            </Tr>
            }
          </>;
        })}
        </Tbody>
        </TableComposable>
      </> }
    </>
  )
}

const getResponseSchema = (response: OpenAPIV3.ResponseObject, document: OpenAPIV3.Document) => {
  const contents = response.content ? Object.values(response.content).filter(c => c.schema !== undefined) : [];
  if (contents.length === 0) {
      return 'None';
  }

  // Todo we should try to display all available types
  return <SchemaType document={document} schema={contents[0].schema!} />;
}
