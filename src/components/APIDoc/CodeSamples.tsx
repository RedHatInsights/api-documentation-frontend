import React, { useState } from 'react';
import { Card, CardBody, CardHeader, ClipboardCopyButton } from '@patternfly/react-core';
import { CodeEditor } from '@patternfly/react-code-editor';

import { CodeBlockDropdown } from './CodeBlockDropdown';
import { useLanguage } from '../../utils/LanguageContext';

interface CodeSampleProps {
  codesnippet: string;
}

export const CodeSamples: React.FunctionComponent<CodeSampleProps> = ({ codesnippet }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const language = useLanguage();

  if (!codesnippet) {
    return null; // Return null if there are no code samples; Without this logic the code samples initially shows up as selected
  }

  const clipboardCopyFunc = (_event: unknown, text: string) => {
    navigator.clipboard.writeText(text);
  };

  const onCopyClick = (event: React.MouseEvent, text: string) => {
    clipboardCopyFunc(event, text);
    setCopied(true);
  };

  return (
    <>
      <Card className="apid-c-card-codeblock" isPlain>
        <CardHeader className="pf-v5-u-p-0 pf-v5-u-pr-md pf-v5-u-color-light-100 pf-v5-u-background-color-dark-200">
          <CodeBlockDropdown />
          <ClipboardCopyButton
            id="basic-copy-button"
            textId="code-content"
            aria-label="Copy to clipboard"
            onClick={(e) => onCopyClick(e, codesnippet)}
            exitDelay={copied ? 1500 : 600}
            variant="plain"
            onTooltipHidden={() => setCopied(false)}
          >
            {copied ? 'Copied!' : 'Copy code to clipboard'}
          </ClipboardCopyButton>
        </CardHeader>
        <CardBody className="pf-v5-u-p-0">
          <CodeEditor
            isDarkTheme={true}
            isLineNumbersVisible={false}
            isReadOnly={true}
            code={codesnippet}
            language={language.highlighter}
            height="400px"
          />
        </CardBody>
      </Card>
    </>
  );
};
