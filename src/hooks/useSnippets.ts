import { useEffect, useState } from 'react';

import { Language } from '@patternfly/react-code-editor';

import { Request as RequestFormat } from 'har-format';
import { HTTPSnippet, isValidTargetId } from 'httpsnippet-lite';

export interface SnippetInfoItem {
  text: string;
  language: string;
  highlighter: Language;
  langLibrary: string | undefined;
}

export const SnippetItemsArray = [
  { text: 'python', language: 'python', highlighter: Language.python, langLibrary: 'requests' },
  { text: 'go', language: 'go', highlighter: Language.go, langLibrary: undefined },
  { text: 'java', language: 'java', highlighter: Language.java, langLibrary: 'asynchttp' },
  { text: 'javascript', language: 'javascript', highlighter: Language.javascript, langLibrary: 'fetch' },
  { text: 'node', language: 'node', highlighter: Language.javascript, langLibrary: 'fetch' },
  { text: 'c', language: 'c', highlighter: Language.cpp, langLibrary: 'libcurl' },
  { text: 'ruby', language: 'ruby', highlighter: Language.ruby, langLibrary: 'native' },
  { text: 'cURL', language: 'shell', highlighter: Language.shell, langLibrary: 'curl' },
  { text: 'http', language: 'http', highlighter: Language.json, langLibrary: 'http1.1' },
] as SnippetInfoItem[];

const getCodeSample = async (language: string, langLibrary: string | undefined, requestData: RequestFormat) => {
  if (!isValidTargetId(language)) {
    return null;
  }

  try {
    const snippet = new HTTPSnippet(requestData);
    const sample = await snippet.convert(language, langLibrary);

    if (Array.isArray(sample)) {
      return sample[0];
    }

    return sample || null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const useSnippets = (languageInfo: SnippetInfoItem, reqData: RequestFormat): string => {
  const [snippet, setSnippet] = useState<string>('');

  useEffect(() => {
    if (languageInfo) {
      getCodeSample(languageInfo.language, languageInfo.langLibrary, reqData).then((sample) => {
        if (sample) {
          setSnippet(sample as string);
        }
      });
    }
  }, [languageInfo, reqData]);

  return snippet;
};
