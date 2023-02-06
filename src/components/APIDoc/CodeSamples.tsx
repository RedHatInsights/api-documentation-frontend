import React, { useState } from 'react';
import {OpenAPIV3} from "openapi-types";
import {DeRefResponse} from "../../utils/Openapi";
import {CodeBlock, CodeBlockAction, ClipboardCopyButton } from "@patternfly/react-core";
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

    const actions = (
        <CodeBlockAction>
            <CodeBlockDropdown setTemplate={setTemplate}/>
            <ClipboardCopyButton
                id="basic-copy-button"
                textId="code-content"
                aria-label="Copy to clipboard"
                onClick={e => onCopyClick(e, code.toString())}
                exitDelay={copied ? 1500 : 600}
                maxWidth="110px"
                variant="plain"
                onTooltipHidden={() => setCopied(false)}
            >
                {copied ? 'Copied!' : 'Copy code to clipboard'}
            </ClipboardCopyButton>
        </CodeBlockAction>
    )

    const codeBlockStyles = {
        width: '100%',
    }
    return <>
        <CodeBlock actions={actions} className='.pf-c-code-block' style={codeBlockStyles}>
            <CodeEditor
                isDarkTheme={false}
                isLineNumbersVisible={false}
                isReadOnly={true}
                isMinimapVisible={false}
                isLanguageLabelVisible={false}
                code={code.toString()}
                language={Language.c}
                height="400px"
            />
        </CodeBlock>
    </>;
};
