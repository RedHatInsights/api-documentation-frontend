import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';
import { Language } from '@patternfly/react-code-editor';

import { templates } from '../../resources/codesampletemplates/Templates';

interface Item {
  value: string;
  text: string;
  language: Language;
}

const items: Item[] = [
  {value: "go", text: "go", language: Language.go},
  {value: "java", text: "java", language: Language.java},
  {value: "node", text: "node", language: Language.javascript},
  {value: "python", text: "python", language: Language.python},
  {value: "cURL", text: "cURL", language: Language.shell},
]

export interface CodeBlockDropdownProps {
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

export const CodeBlockDropdown: React.FunctionComponent<CodeBlockDropdownProps> = ({setTemplate, setLanguage}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState("go");

  setTemplate(templates[selected])

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

  const onDropdownSelect = (event: any, item: Item) => {
    setSelected(item.value);
    setLanguage(item.language)
    setTemplate(templates[item.value]);
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
      dropdownItems={items.map((item, index)=> <DropdownItem key={item.value} value={item.value} onClick={(e)=>onDropdownSelect(e, item)}>{item.text}</DropdownItem>)}
    />
  );
};
