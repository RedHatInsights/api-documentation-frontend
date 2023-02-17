import React, {useState} from 'react';
import { SearchInput } from '@patternfly/react-core';

export interface SearchValueProp {
  searchInput: string;
}

export const SearchInputBasic: React.FunctionComponent<SearchValueProp> = () => {
  const [value, setValue] = useState('');

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <div>
      <SearchInput
        placeholder="Find by product or service name"
        value={value}
        onChange={(_event, value) => onChange(value)}
        onClear={() => onChange('')}
      />
    </div>
  );
};
