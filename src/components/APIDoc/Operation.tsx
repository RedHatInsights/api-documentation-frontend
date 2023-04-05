import React, { useState, useMemo } from 'react';
import {OpenAPIV3} from "openapi-types";
import {deRef} from "../../utils/Openapi";
import { buildCodeSampleData, BuildCodeSampleDataParams } from '../../utils/Snippets';
import {
    Grid,
    GridItem,
    Text,
    TextContent,
    TextVariants,
    AccordionItem,
    AccordionToggle, AccordionContent
} from "@patternfly/react-core";
import {TableComposable, Tbody, Td, Thead, Tr} from "@patternfly/react-table";
import {CodeSamples} from "./CodeSamples";
import { RequestBodyView } from './RequestBodyView';
import { ResponseView } from './ResponseView';

import {Request as RequestFormat} from 'har-format'

import { SnippetInfoItem, SnippetItemsArray, useSnippets } from '../../hooks/useSnippets';

export interface OperationProps {
  verb: string;
  path: string;
  operation: OpenAPIV3.OperationObject;
  document: OpenAPIV3.Document;
}

export const Operation: React.FunctionComponent<OperationProps> = props => {
  const id = `operation-${props.verb}-${props.path}`;
  const [isExpanded, setExpanded] = useState(false);
  const {operation, verb, path} = props;

  return <AccordionItem>
    <AccordionToggle
      id={id}
      isExpanded={isExpanded}
      onClick={() => setExpanded(prev => !prev)}
      className="pf-u-py-sm"
      >
        {operation.summary && <span className="pf-u-font-weight-normal pf-u-color-100 pf-u-mr-lg">{operation.summary}<br /></span>}
         <span className="pf-u-font-size-sm pf-u-font-weight-normal pf-u-color-200">{verb.toUpperCase()} {path}</span>
      </AccordionToggle>
      { isExpanded && <AccordionContent>
        <OperationContent {...props} />
      </AccordionContent>}
  </AccordionItem>;
};


const OperationContent: React.FunctionComponent<OperationProps> = ({verb, path, operation, document}) => {
  const parameters = (operation.parameters || []).map(p => deRef(p, document));

  const [codeSampleLanguage, setCodeSampleLanguage] = useState<SnippetInfoItem>(SnippetItemsArray[0]);
  const codeSampleBuildParams: BuildCodeSampleDataParams = {
    verb: verb,
    path: path,
    params: parameters,
    requestBody: operation.requestBody,
    responses:  operation.responses,
    document: document,
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reqData: RequestFormat = useMemo(() => buildCodeSampleData(codeSampleBuildParams), [verb, path, codeSampleLanguage]);

  const snippets = useSnippets(codeSampleLanguage, reqData);

  return (
    <Grid className="pf-u-mt-sm" hasGutter>
      <GridItem className="pf-m-12-col">
        <TextContent>
          <Text component={TextVariants.p}>{operation.description}</Text>
        </TextContent>
      </GridItem>
      <GridItem className="pf-m-12-col pf-m-7-col-on-xl">
      { parameters.length > 0 && <>
        <TextContent>
          <Text component={TextVariants.h3} className="pf-u-pb-lg">Parameters</Text>
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
        </> }
        { operation.requestBody && <RequestBodyView requestBody={operation.requestBody} document={document} /> }
        <ResponseView responses={operation.responses} document={document} />
      </GridItem>
      <GridItem className="pf-m-12-col pf-m-5-col-on-xl pf-u-mt-md-on-xl pf-u-ml-sm-on-xl">
        <CodeSamples codesnippet={snippets} language={codeSampleLanguage} setLanguage={setCodeSampleLanguage}/>
      </GridItem>
    </Grid>
  );
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
