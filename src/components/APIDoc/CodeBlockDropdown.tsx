import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';

import { templates } from '../../resources/codesampletemplates/Templates';

interface Item {
    value: string;
    text: string;
}
const items: Item[] = [
    {value: "go", text: "go"},
    {value: "java", text: "java"},
    {value: "node", text: "node"},
    {value: "python", text: "python"},
    {value: "cURL", text: "cURL"},
]

export interface CodeBlockDropdownProps {
    setTemplate: React.Dispatch<React.SetStateAction<string>>
}

export const CodeBlockDropdown: React.FunctionComponent<CodeBlockDropdownProps> = ({setTemplate}) => {
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
