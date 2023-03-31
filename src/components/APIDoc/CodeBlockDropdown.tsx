import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';

import { SnippetInfoItem, SnippetItemsArray } from '../../hooks/useSnippets';


export interface CodeBlockDropdownProps {
  language: SnippetInfoItem;
  setLanguage: React.Dispatch<React.SetStateAction<SnippetInfoItem>>;
}

export const CodeBlockDropdown: React.FunctionComponent<CodeBlockDropdownProps> = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(language.text);

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
    setSelected(item.text);
    setLanguage(item);
  }

  return (
    <Dropdown
      onSelect={onSelect}
      toggle={
        <DropdownToggle id="toggle-basic" onToggle={onToggle}>
          {selected}
        </DropdownToggle>
      }
      isOpen={isOpen}
      dropdownItems={SnippetItemsArray.map((item)=> <DropdownItem key={item.text} value={item.text} onClick={(e)=>onDropdownSelect(e, item)}>{item.text}</DropdownItem>)}
      isPlain
    />
  );
};
