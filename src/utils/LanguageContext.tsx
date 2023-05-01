import React, { createContext, useState, useContext, ReactNode } from 'react';

import { SnippetInfoItem, SnippetItemsArray } from '../hooks/useSnippets';


type LanguageContextType = {
  language: SnippetInfoItem;
  handleChangeLanguage: (newLanguage: SnippetInfoItem) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  language: SnippetItemsArray[0],
  handleChangeLanguage: () => {},
});

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<SnippetInfoItem>(SnippetItemsArray[0]);

  function handleChangeLanguage(newLanguage: SnippetInfoItem) {
    setLanguage(newLanguage);
  }

  return (
    <LanguageContext.Provider value={{ language, handleChangeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const { language } = useContext(LanguageContext);
  return language;
};

export const useSetLanguage = () => {
  const { handleChangeLanguage } = useContext(LanguageContext);
  return handleChangeLanguage;
};
