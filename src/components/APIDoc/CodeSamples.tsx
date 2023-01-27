import React, { useState } from 'react';
import {CodeBlock, CodeBlockAction, CodeBlockCode, ClipboardCopyButton } from "@patternfly/react-core";
import Dot from 'dot';

import { CodeBlockDropdown } from './CodeBlockDropdown';


export interface CodeSampleProps {
    response: string;
}

export const CodeSamples: React.FunctionComponent<CodeSampleProps> = ({response}) => {
    const [template, setTemplate] = useState<string>("")

    Dot.templateSettings.varname = 'data'
    Dot.templateSettings.strip = false

    const data = {
        allHeaders: [],
        bodyParameter: [],
        methodUpper: "get",
        url: "example.com",
        method: {verb: "get"},
        requiredParameters: [{name: "param", exampleValues: {json: "string"}}],
        requiredQueryString: "/test",
    }

    const tempFn = Dot.template(template)
    const code = tempFn(data)

    const actions = (
        <CodeBlockAction>
            <CodeBlockDropdown setTemplate={setTemplate}/>
            <ClipboardCopyButton
                id="basic-copy-button"
                textId="code-content"
                aria-label="Copy to clipboard"
                onClick={e => console.log(e)}
                maxWidth="110px"
                variant="plain"
            >
            </ClipboardCopyButton>
        </CodeBlockAction>
    )
    return <>
        <CodeBlock actions={actions}>
            <CodeBlockCode>
                {`${code}`}
            </CodeBlockCode>
        </CodeBlock>
    </>;
};
