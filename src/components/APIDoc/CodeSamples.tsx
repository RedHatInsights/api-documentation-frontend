import React from 'react';
import dynamic from 'next/dynamic';

import { useLanguage } from '../../utils/LanguageContext';

const CodeEditorLocal = dynamic(() => import('./CodeEditorLocal'), { ssr: false });

interface CodeSampleProps {
  codesnippet: string;
}

export const CodeSamples: React.FunctionComponent<CodeSampleProps> = ({ codesnippet }) => {
  const language = useLanguage();

  if (!codesnippet) {
    return null;
  }

  return <CodeEditorLocal codesnippet={codesnippet} highlighter={language.highlighter} />;
};
