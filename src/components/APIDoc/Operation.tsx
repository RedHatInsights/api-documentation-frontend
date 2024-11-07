import React, { useState, useMemo } from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { deRef } from '../../utils/Openapi';
import { buildCodeSampleData, BuildCodeSampleDataParams } from '../../utils/Snippets';
import { Grid, GridItem, TextContent, AccordionItem, AccordionToggle, AccordionContent, Label } from '@patternfly/react-core';
import ReactMarkdown from 'react-markdown';

import { ParameterView } from './ParameterView';
import { CodeSamples } from './CodeSamples';
import { RequestBodyView } from './RequestBodyView';
import { ResponseView } from './ResponseView';

import { Request as RequestFormat } from 'har-format';

import { useSnippets } from '../../hooks/useSnippets';
import { useLanguage } from '../../utils/LanguageContext';
import InfoCircleIcon from '@patternfly/react-icons/dist/esm/icons/info-circle-icon';

export interface OperationProps {
  verb: string;
  baseUrl: string;
  path: string;
  operation: OpenAPIV3.OperationObject;
  document: OpenAPIV3.Document;
}

export const Operation: React.FunctionComponent<OperationProps> = (props) => {
  const id = `operation-${props.verb}-${props.path}`;
  const [isExpanded, setExpanded] = useState(false);
  const { operation, verb, path } = props;

  return (
    <AccordionItem>
      <AccordionToggle id={id} isExpanded={isExpanded} onClick={() => setExpanded((prev) => !prev)} className="pf-v5-u-py-sm">
        {operation.summary && (
          <span className="pf-v5-u-font-weight-normal pf-v5-u-color-100 pf-v5-u-mr-lg">
            {operation.summary}
            {operation.deprecated && (
              <Label color="orange" icon={<InfoCircleIcon />} className="pf-v5-u-ml-lg">
                Deprecated
              </Label>
            )}
            <br />
          </span>
        )}

        <span className="pf-v5-u-font-size-sm pf-v5-u-font-weight-normal pf-v5-u-color-200">
          {verb.toUpperCase()} {path}
        </span>
      </AccordionToggle>
      {isExpanded && (
        <AccordionContent>
          <OperationContent {...props} />
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

const OperationContent: React.FunctionComponent<OperationProps> = ({ verb, baseUrl, path, operation, document }) => {
  const parameters = (operation.parameters || []).map((p) => deRef(p, document));
  const queryParameters = parameters.filter((p) => p.in === 'query');
  const pathParameters = parameters.filter((p) => p.in === 'path');

  const codeSampleLanguage = useLanguage();

  const codeSampleBuildParams: BuildCodeSampleDataParams = {
    verb: verb,
    baseUrl: baseUrl,
    path: path,
    params: parameters,
    requestBody: operation.requestBody,
    responses: operation.responses,
    document: document,
  };

  const reqData: RequestFormat = useMemo(() => buildCodeSampleData(codeSampleBuildParams), [verb, path, codeSampleLanguage]);

  const snippets = useSnippets(codeSampleLanguage, reqData);

  return (
    <Grid className="pf-v5-u-mt-sm" hasGutter>
      <GridItem md={12}>
        <TextContent>{operation.description && <ReactMarkdown>{operation.description}</ReactMarkdown>}</TextContent>
      </GridItem>
      <GridItem md={12} xl={7}>
        <Grid hasGutter>
          {pathParameters.length > 0 && (
            <GridItem md={12} className="pf-v5-m-12-col">
              <ParameterView title="Path Parameters" parameters={pathParameters} document={document} />
            </GridItem>
          )}
          {queryParameters.length > 0 && (
            <GridItem md={12}>
              <ParameterView title="Query Parameters" parameters={queryParameters} document={document} />
            </GridItem>
          )}
        </Grid>
        {operation.requestBody && <RequestBodyView requestBody={operation.requestBody} document={document} />}
        <ResponseView responses={operation.responses} document={document} />
      </GridItem>
      <GridItem md={12} xl={5} className="pf-v5-u-mt-md-on-xl pf-v5-u-ml-sm-on-xl">
        <CodeSamples codesnippet={snippets} />
      </GridItem>
    </Grid>
  );
};
