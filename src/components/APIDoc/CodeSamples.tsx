import React from 'react';
import { CodeEditor } from '@patternfly/react-code-editor';

import { CodeBlockDropdown } from './CodeBlockDropdown';
import { useLanguage } from '../../utils/LanguageContext';

interface CodeSampleProps {
  codesnippet: string;
}

export const CodeSamples: React.FunctionComponent<CodeSampleProps> = ({ codesnippet }) => {
  const language = useLanguage();

  if (!codesnippet) {
    return null;
  }

  return (
    <CodeEditor
      isDarkTheme={true}
      isLineNumbersVisible={false}
      isReadOnly={true}
      isCopyEnabled={true}
      code={codesnippet}
      language={language.highlighter}
      height="400px"
      customControls={<CodeBlockDropdown />}
    />
  );
};
