import React, { useEffect, useState } from 'react';
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { CodeBlockDropdown } from './CodeBlockDropdown';

interface CodeEditorLocalProps {
  codesnippet: string;
  highlighter: Language;
}

const CodeEditorLocal: React.FC<CodeEditorLocalProps> = ({ codesnippet, highlighter }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Load Monaco asynchronously and configure the loader to use the
    // webpack-bundled package instead of cdn.jsdelivr.net (blocked by CSP).
    Promise.all([import('@monaco-editor/react'), import('monaco-editor')]).then(([{ loader }, monaco]) => {
      loader.config({ monaco });
      setReady(true);
    });
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <CodeEditor
      isDarkTheme
      isLineNumbersVisible={false}
      isReadOnly
      isCopyEnabled
      code={codesnippet}
      language={highlighter}
      height="400px"
      customControls={<CodeBlockDropdown />}
    />
  );
};

export default CodeEditorLocal;
