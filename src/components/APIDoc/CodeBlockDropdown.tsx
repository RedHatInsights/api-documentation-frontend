import React from 'react';
import { Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core/deprecated';

import { SnippetInfoItem, SnippetItemsArray } from '../../hooks/useSnippets';
import { useSetLanguage, useLanguage } from '../../utils/LanguageContext';

export const CodeBlockDropdown: React.FunctionComponent = () => {
  const language = useLanguage();
  const setLanguage = useSetLanguage();

  const [isOpen, setIsOpen] = React.useState(false);

  const onToggle = (_e: unknown, isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onSelect = () => {
    setIsOpen(false);
  };

  const onDropdownSelect = (_event: unknown, item: SnippetInfoItem) => {
    setLanguage(item);
  };

  return (
    <Dropdown
      onSelect={onSelect}
      toggle={<DropdownToggle onToggle={(_e: unknown, isOpen: boolean) => onToggle(_e, isOpen)}>{language.text}</DropdownToggle>}
      isOpen={isOpen}
      dropdownItems={SnippetItemsArray.map((item) => (
        <DropdownItem key={item.text} value={item.text} onClick={(e) => onDropdownSelect(e, item)}>
          {item.text}
        </DropdownItem>
      ))}
      isPlain
    />
  );
};
