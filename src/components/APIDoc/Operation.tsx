import React from 'react';
import {OpenAPIV3} from "openapi-types";
import {buildExample, deRef} from "../../utils/Openapi";
import {Stack, StackItem, Grid, GridItem, Text, TextContent, TextVariants} from "@patternfly/react-core";
import {TableComposable, Tbody, Td, Thead, Tr} from "@patternfly/react-table";
import {ExampleResponse} from "./ExampleResponse";
import {CodeSamples} from "./CodeSamples";

export interface OperationProps {
  verb: string;
  path: string;
  operation: OpenAPIV3.OperationObject;
  document: OpenAPIV3.Document;
}
export const Operation: React.FunctionComponent<OperationProps> = ({verb, path, operation, document}) => {
  const parameters = (operation.parameters || []).map(p => deRef(p, document));
  const responseMap = Object.entries(operation.responses ?? {});
  const responseExample = React.useMemo(() => {
    if (operation.responses) {
      const example = buildExample(operation.responses, document);
      if (example) {
          return JSON.stringify(example, undefined, 2);
      }
    }

      return undefined;
  }, [ operation.responses, document]);

    return <Grid className="pf-u-mt-sm" hasGutter>
            <GridItem className="pf-m-12-col pf-m-7-col-on-lg pf-m-8-col-on-xl">
              <Stack hasGutter>
                <StackItem>
                  <TextContent>
                    <Text component={TextVariants.h2}>{ operation.summary }</Text>
                    <Text component={TextVariants.p}>{verb.toUpperCase()} {path}</Text>
                    <Text component={TextVariants.p}>{operation.description}</Text>
                  </TextContent>
                </StackItem>
                { parameters.length > 0 && <StackItem>
                  <TextContent>
                    <Text component={TextVariants.h3}>Parameters</Text>
                  </TextContent>
                  <TableComposable variant="compact">
                    <Thead>
                      <Tr>
                        <Td>Name</Td>
                        <Td>In</Td>
                        <Td>Type</Td>
                        <Td>Required</Td>
                        <Td>Description</Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {parameters.map(((p, index) => (
                        <Tr key={index}>
                          <Td>{p.name}</Td>
                          <Td>{p.in}</Td>
                          <Td>{getType(p.schema, document)}</Td>
                          <Td>{p.required ? 'Yes' : 'No'}</Td>
                          <Td>{p.description}</Td>
                        </Tr>
                      )))}
                    </Tbody>
                  </TableComposable>
                  </StackItem> }
                  { responseMap.length > 0 && <StackItem>
                    <TextContent>
                      <Text component={TextVariants.h3}>Responses</Text>
                    </TextContent>
                    <TableComposable variant="compact">
                      <Thead>
                        <Tr>
                          <Td>Status</Td>
                          <Td>Description</Td>
                          <Td>Schema</Td>
                        </Tr>
                      </Thead>
                      <Tbody>
                      {responseMap.map(([code, response]) => {
                        const dResponse = deRef(response, document);
                        return <Tr key={code}>
                          <Td>{code}</Td>
                          <Td>{dResponse.description}</Td>
                          <Td>{getResponseSchema(dResponse, document)}</Td>
                        </Tr>;
                      })}
                      </Tbody>
                    </TableComposable>
                    {responseExample && <ExampleResponse response={responseExample} />}
                  </StackItem> }
                </Stack>
              </GridItem>
              <GridItem className="pf-m-12-col pf-m-5-col-on-lg pf-m-4-col-on-xl pf-u-my-2xl-on-lg pf-u-ml-md-on-lg">
                <CodeSamples parameters={parameters} verb={verb} path={path}/>
              </GridItem>
            </Grid>;
}

const getResponseSchema = (response: OpenAPIV3.ResponseObject, document: OpenAPIV3.Document) => {
    const contents = response.content ? Object.values(response.content).filter(c => c.schema !== undefined) : [];
    if (contents.length === 0) {
        return 'None';
    }

    // Previously filtered for undefined schemas
    return deRef(contents[0].schema!, document).deRefData?.name;
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
