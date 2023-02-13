import React, { useState } from 'react';
import {OpenAPIV3} from "openapi-types";
import {DeRefResponse} from "../../utils/Openapi";
import { Card, CardBody, CardFooter, CardHeader, ClipboardCopyButton, FlexItem } from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import Dot from 'dot';

import { CodeBlockDropdown } from './CodeBlockDropdown';


interface CodeSampleProps {
    parameters: DeRefResponse<OpenAPIV3.ParameterObject>[];
    verb: string;
    path: string;
}

type paramInfo = {
    name : string;
    exampleValues : object;
}
type templateData = {
    allHeaders: paramInfo[];
    bodyParameter: paramInfo[];
    methodUpper: string;
    url: string;
    method: object;
    requiredParameters: paramInfo[];
    requiredQueryString: string;
}

export const CodeSamples: React.FunctionComponent<CodeSampleProps> = ({parameters, verb, path}) => {
    const [template, setTemplate] = useState<string>("")
    const [language, setLanguage] = useState<Language>(Language.go)
    const [copied, setCopied] = useState<boolean>(false);

    Dot.templateSettings.varname = 'data'
    Dot.templateSettings.strip = false

    const data: templateData = {
        allHeaders: [{name: "Accept", exampleValues: {json: "application/json"}}],
        bodyParameter: [], //TODO
        methodUpper: verb.toUpperCase(),
        url: path,
        method: {verb: verb},
        requiredParameters: [{name: "param", exampleValues: {json: "string"}}], //TODO
        requiredQueryString: "", //TODO
    }

    verb !== "get" && data.allHeaders.push({name: "Content-Type", exampleValues: {json: "application/json"}})

    const tempFn = Dot.template(template)
    const code = tempFn(data)

    const clipboardCopyFunc = (event: any, text: string) => {
        navigator.clipboard.writeText(text);
    };

    const onCopyClick = (event: any, text: string) => {
        clipboardCopyFunc(event, text);
        setCopied(true);
    };

    return <>
      <Card className="apid-c-card-codeblock pf-u-my-xl" isPlain>
        <CardHeader className="pf-u-p-0 pf-u-pr-md pf-u-color-light-100">
          <FlexItem className="pf-u-flex-grow-1 pf-u-pl-lg">
            {verb} {path}
          </FlexItem>
          <FlexItem align={{ default: 'alignRight' }}>
            <CodeBlockDropdown setTemplate={setTemplate} setLanguage={setLanguage}/>
            <ClipboardCopyButton
              id="basic-copy-button"
              textId="code-content"
              aria-label="Copy to clipboard"
              onClick={e => onCopyClick(e, code.toString())}
              exitDelay={copied ? 1500 : 600}
              variant="plain"
              onTooltipHidden={() => setCopied(false)}
            >
            {copied ? 'Copied!' : 'Copy code to clipboard'}
            </ClipboardCopyButton>
          </FlexItem>
        </CardHeader>
        <CardBody className="pf-u-p-0">
          <CodeEditor
            isDarkTheme={true}
            isLineNumbersVisible={false}
            isReadOnly={true}
            code={code.toString()}
            language={language}
            height="400px"
          />
      </CardBody>
      <CardFooter />
    </Card>
  </>;
};
