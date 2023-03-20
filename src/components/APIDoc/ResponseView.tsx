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


interface ResponseViewProps {
  responses: OpenAPIV3.ResponsesObject;
  document: OpenAPIV3.Document;
}

export const ResponseView: React.FunctionComponent<ResponseViewProps> = ({responses, document}) => {
  const [expandedCodes, setExpandedCodes] = useState([] as string[])
  const setCodeExpanded = (code: string, isExpanding = true) => setExpandedCodes(prevExpanded => {
    const otherExpandedRowNames = prevExpanded.filter(r => r !== code);
    return isExpanding ? [...otherExpandedRowNames, code] : otherExpandedRowNames;
    });
  const isCodeExpanded = (code: string) => expandedCodes.includes(code);
  
  const responseMap = Object.entries(responses ?? {});

  const responseExamples = React.useMemo(() => {
    if (responses) {
      const examples = buildExample(responses, document);
      return examples
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
          return <>
            <Tr key={code} >
              <Td expand={{
                  rowIndex,
                  isExpanded: isCodeExpanded(code),
                  onToggle: () => setCodeExpanded(code, !isCodeExpanded(code)),
                  expandId: 'response-code-exanded'
              }}/>
              <Td>{code}</Td>
              <Td>{dResponse.description}</Td>
              <Td>{getResponseSchema(dResponse, document)}</Td>
            </Tr>
            <Tr isExpanded={isCodeExpanded(code)}>
              <Td noPadding={true} colSpan={4}>
                  <ExpandableRowContent>
                    {responseExamples && <ExampleResponse response={code in responseExamples ? responseExamples[code] : ""}/>}
                  </ExpandableRowContent>
              </Td>
            </Tr>
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

  // Previously filtered for undefined schemas
  return deRef(contents[0].schema!, document).deRefData?.name;
}
