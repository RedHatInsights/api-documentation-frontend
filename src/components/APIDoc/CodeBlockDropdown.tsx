import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';
import { Language } from '@patternfly/react-code-editor';

export interface DropdownItemInfo {
  value: string;
  text: string;
  language: Language;
}

export interface CodeBlockDropdownProps {
  dropdownItems: DropdownItemInfo[];
  setLanguage: React.Dispatch<React.SetStateAction<DropdownItemInfo>>;
}

export const CodeBlockDropdown: React.FunctionComponent<CodeBlockDropdownProps> = ({dropdownItems, setLanguage}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(dropdownItems[0].value);

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

  const onDropdownSelect = (event: any, item: DropdownItemInfo) => {
    setSelected(item.value);
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
      dropdownItems={dropdownItems.map((item, index)=> <DropdownItem key={item.value} value={item.value} onClick={(e)=>onDropdownSelect(e, item)}>{item.text}</DropdownItem>)}
      isPlain
    />
  );
};
