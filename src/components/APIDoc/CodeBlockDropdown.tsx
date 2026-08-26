import React from 'react';
import { Dropdown, DropdownList, DropdownItem, MenuToggle } from '@patternfly/react-core';

import { SnippetInfoItem, SnippetItemsArray } from '../../hooks/useSnippets';
import { useSetLanguage, useLanguage } from '../../utils/LanguageContext';

export const CodeBlockDropdown: React.FunctionComponent = () => {
  const language = useLanguage();
  const setLanguage = useSetLanguage();

  const [isOpen, setIsOpen] = React.useState(false);

  const onDropdownSelect = (item: SnippetInfoItem) => {
    setLanguage(item);
    setIsOpen(false);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      toggle={(toggleRef) => (
        <MenuToggle ref={toggleRef} onClick={() => setIsOpen(!isOpen)} isExpanded={isOpen} variant="plainText">
          {language.text}
        </MenuToggle>
      )}
    >
      <DropdownList>
        {SnippetItemsArray.map((item) => (
          <DropdownItem key={item.text} onClick={() => onDropdownSelect(item)}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownList>
    </Dropdown>
  );
};
