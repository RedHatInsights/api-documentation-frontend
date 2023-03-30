import React, { useState } from 'react';
import {OpenAPIV3} from "openapi-types";
import {DeRefResponse} from "../../utils/Openapi";
import { Card, CardBody, CardHeader, ClipboardCopyButton, FlexItem } from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import Dot from 'dot';

import { Snippets } from '../../hooks/useSnippets';
import { DropdownItemInfo, CodeBlockDropdown } from './CodeBlockDropdown';


interface CodeSampleProps {
    parameters: DeRefResponse<OpenAPIV3.ParameterObject>[];
    verb: string;
    path: string;
    snippets: Snippets;
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

interface samplesMap {
  [key: string]: string;
}

Dot.templateSettings.varname = 'data'
Dot.templateSettings.strip = false

export const DropdownItems: DropdownItemInfo[] = [
  {value: "go", text: "go", language: Language.go, langLibrary: undefined},
  {value: "java", text: "java", language: Language.java, langLibrary: "asynchttp"},
  {value: "node", text: "node", language: Language.javascript, langLibrary: "fetch"},
  {value: "python", text: "python", language: Language.python, langLibrary: "requests"},
  {value: "cURL", text: "cURL", language: Language.shell, langLibrary: "curl"},
]

export const CodeSamples: React.FunctionComponent<CodeSampleProps> = ({parameters, verb, path, snippets}) => {
    const [language, setLanguage] = useState<DropdownItemInfo>(DropdownItems[0]);
    const [copied, setCopied] = useState<boolean>(false);  
    if (Object.keys(snippets).length === 0) {
      return null; // Return null if there are no code samples
    }

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

    // const sampleCollection: samplesMap = {};
    // Object.entries(templates).forEach(([lang, temp]) => {
    //   const testFn = Dot.template(temp)
    //   sampleCollection[lang] = testFn(data).toString()
    // });
    const sampleCollection: samplesMap = {...snippets};
    // console.log("collection...", sampleCollection)
    const code = snippets[language.text]

    const clipboardCopyFunc = (event: any, text: string) => {
        navigator.clipboard.writeText(text);
    };

    const onCopyClick = (event: any, text: string) => {
        clipboardCopyFunc(event, text);
        setCopied(true);
    };

    return <>
      <Card className="apid-c-card-codeblock" isPlain>
        <CardHeader className="pf-u-p-0 pf-u-pr-md pf-u-color-light-100 pf-u-background-color-dark-200">
          <FlexItem className="pf-u-flex-grow-1 pf-u-pl-lg">
          </FlexItem>
          <FlexItem align={{ default: 'alignRight' }}>
            <CodeBlockDropdown dropdownItems={DropdownItems} setLanguage={setLanguage}/>
            <ClipboardCopyButton
              id="basic-copy-button"
              textId="code-content"
              aria-label="Copy to clipboard"
              onClick={e => onCopyClick(e, code)}
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
            code={code}
            language={language.language}
            height="400px"
          />
      </CardBody>
    </Card>
  </>;
};
