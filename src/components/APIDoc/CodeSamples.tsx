import React, { useState } from 'react';
import { Card, CardBody, CardHeader, ClipboardCopyButton, FlexItem } from '@patternfly/react-core';
import { CodeEditor, Language } from '@patternfly/react-code-editor';

import { Snippets } from '../../hooks/useSnippets';
import { DropdownItemInfo, CodeBlockDropdown } from './CodeBlockDropdown';


interface CodeSampleProps {
    snippets: Snippets;
}

export const DropdownItems: DropdownItemInfo[] = [
  {value: "go", text: "go", language: Language.go, langLibrary: undefined},
  {value: "java", text: "java", language: Language.java, langLibrary: "asynchttp"},
  {value: "node", text: "node", language: Language.javascript, langLibrary: "fetch"},
  {value: "python", text: "python", language: Language.python, langLibrary: "requests"},
  {value: "cURL", text: "cURL", language: Language.shell, langLibrary: "curl"},
]

export const CodeSamples: React.FunctionComponent<CodeSampleProps> = ({snippets}) => {
    const [language, setLanguage] = useState<DropdownItemInfo>(DropdownItems[0]);
    const [copied, setCopied] = useState<boolean>(false);

    if (Object.keys(snippets).length === 0) {
      return null; // Return null if there are no code samples; Without this logic the code samples initially shows up as selected
    }

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
              onClick={e => onCopyClick(e, snippets[language.text])}
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
            code={snippets[language.text]}
            language={language.language}
            height="400px"
          />
      </CardBody>
    </Card>
  </>;
};
