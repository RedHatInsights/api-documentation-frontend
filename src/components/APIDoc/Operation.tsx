/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo } from "react";
import { OpenAPIV3 } from "openapi-types";
import { deRef } from "../../utils/Openapi";
import {
  buildCodeSampleData,
  BuildCodeSampleDataParams,
} from "../../utils/Snippets";
import {
  Grid,
  GridItem,
  Text,
  TextContent,
  TextVariants,
  AccordionItem,
  AccordionToggle,
  AccordionContent,
  Label,
} from "@patternfly/react-core";
import ReactMarkdown from "react-markdown";

import { ParameterView } from "./ParameterView";
import { CodeSamples } from "./CodeSamples";
import { RequestBodyView } from "./RequestBodyView";
import { ResponseView } from "./ResponseView";

import { Request as RequestFormat } from "har-format";

import { useSnippets } from "../../hooks/useSnippets";
import { useLanguage } from "../../utils/LanguageContext";
import InfoCircleIcon from "@patternfly/react-icons/dist/esm/icons/info-circle-icon";

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
      <AccordionToggle
        id={id}
        isExpanded={isExpanded}
        onClick={() => setExpanded((prev) => !prev)}
        className="pf-u-py-sm"
      >
        {operation.summary && (
          <span className="pf-u-font-weight-normal pf-u-color-100 pf-u-mr-lg">
            {operation.summary}
            {operation.deprecated && (
              <Label
                color="orange"
                icon={<InfoCircleIcon />}
                className="pf-u-ml-lg"
              >
                Deprecated
              </Label>
            )}
            <br />
          </span>
        )}

        <span className="pf-u-font-size-sm pf-u-font-weight-normal pf-u-color-200">
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

const OperationContent: React.FunctionComponent<OperationProps> = ({
  verb,
  baseUrl,
  path,
  operation,
  document,
}) => {
  const parameters = (operation.parameters || []).map((p) =>
    deRef(p, document)
  );
  const queryParameters = parameters.filter((p) => p.in === "query");
  const pathParameters = parameters.filter((p) => p.in === "path");

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

  const reqData: RequestFormat = useMemo(
    () => buildCodeSampleData(codeSampleBuildParams),
    [verb, path, codeSampleLanguage]
  );

  const snippets = useSnippets(codeSampleLanguage, reqData);

  return (
    <Grid className="pf-u-mt-sm" hasGutter>
      <GridItem className="pf-m-12-col">
        <TextContent>
          {
            operation.description &&
            <Text component={TextVariants.p}>
              <ReactMarkdown>{operation.description}</ReactMarkdown>
            </Text>
          }
        </TextContent>
      </GridItem>
      <GridItem className="pf-m-12-col pf-m-7-col-on-xl">
        <Grid hasGutter>
          {pathParameters.length > 0 && (
            <GridItem className="pf-m-12-col">
              <ParameterView
                title="Path Parameters"
                parameters={pathParameters}
                document={document}
              />
            </GridItem>
          )}
          {queryParameters.length > 0 && (
            <GridItem className="pf-m-12-col">
              <ParameterView
                title="Query Parameters"
                parameters={queryParameters}
                document={document}
              />
            </GridItem>
          )}
        </Grid>
        {operation.requestBody && (
          <RequestBodyView
            requestBody={operation.requestBody}
            document={document}
          />
        )}
        <ResponseView responses={operation.responses} document={document} />
      </GridItem>
      <GridItem className="pf-m-12-col pf-m-5-col-on-xl pf-u-mt-md-on-xl pf-u-ml-sm-on-xl">
        <CodeSamples codesnippet={snippets} />
      </GridItem>
    </Grid>
  );
};
