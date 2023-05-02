import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';

import { SnippetInfoItem, SnippetItemsArray } from '../../hooks/useSnippets';
import { useSetLanguage, useLanguage } from '../../utils/LanguageContext';


export const CodeBlockDropdown: React.FunctionComponent = () => {
  const language = useLanguage();
  const setLanguage = useSetLanguage();

  const [isOpen, setIsOpen] = React.useState(false);

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onFocus = () => {
    const element = document.getElementById('toggle-basic');
    element?.focus();
  };

  const onSelect = (event: any) => {
    setIsOpen(false);
    onFocus();
  };

  const onDropdownSelect = (event: any, item: SnippetInfoItem) => {
    setLanguage(item);
  }

  return (
    <Dropdown
      onSelect={onSelect}
      toggle={
        <DropdownToggle id="toggle-basic" onToggle={onToggle}>
          {language.text}
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={SnippetItemsArray.map((item)=> <DropdownItem key={item.text} value={item.text} onClick={(e)=>onDropdownSelect(e, item)}>{item.text}</DropdownItem>)}
      isPlain
    />
  );
};
