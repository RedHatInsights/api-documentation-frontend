import React, { useState } from 'react';
import { Card, CardBody, CardHeader, ClipboardCopyButton, FlexItem } from '@patternfly/react-core';
import { CodeEditor } from '@patternfly/react-code-editor';

import { SnippetItemsArray, SnippetInfoItem, Snippets } from '../../hooks/useSnippets';
import { CodeBlockDropdown } from './CodeBlockDropdown';


interface CodeSampleProps {
    snippets: Snippets;
}

export const CodeSamples: React.FunctionComponent<CodeSampleProps> = ({snippets}) => {
    const [language, setLanguage] = useState<SnippetInfoItem>(SnippetItemsArray[0]);
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
            <CodeBlockDropdown dropdownItems={SnippetItemsArray} setLanguage={setLanguage}/>
            <ClipboardCopyButton
              id="basic-copy-button"
              textId="code-content"
              aria-label="Copy to clipboard"
              onClick={e => onCopyClick(e, snippets[language.language])}
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
            code={snippets[language.language]}
            language={language.highlighter}
            height="400px"
          />
      </CardBody>
    </Card>
  </>;
};
