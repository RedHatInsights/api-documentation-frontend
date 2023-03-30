import {useEffect, useState} from "react";

import { Language } from '@patternfly/react-code-editor';

import {Request as RequestFormat} from 'har-format'
import { HTTPSnippet, isValidTargetId } from 'httpsnippet-lite';


export interface Snippets {
  [key: string]: string;
}

export const DropdownItems = [
  {value: "go", text: "go", language: Language.go, langLibrary: undefined},
  {value: "java", text: "java", language: Language.java, langLibrary: "asynchttp"},
  {value: "node", text: "node", language: Language.javascript, langLibrary: "fetch"},
  {value: "python", text: "python", language: Language.python, langLibrary: "requests"},
  {value: "cURL", text: "cURL", language: Language.shell, langLibrary: "curl"},
]

export const useSnippets = (reqData: RequestFormat): Snippets => {
  const [snippet, setSnippet] = useState<Snippets>({});

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

  useEffect(() => {
    DropdownItems.forEach(({ value, language, langLibrary }) => {
      getCodeSample(language, langLibrary, reqData).then((sample) => {
        if (sample) {
          setSnippet((prevSnippet) => ({
            ...prevSnippet,
            [value]: sample as string,
          }));
        }
      });
    });
  }, []);
  

  return snippet;
};
