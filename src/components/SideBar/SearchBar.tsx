import React from 'react';
import { SearchInput } from '@patternfly/react-core';

export const SearchInputBasic: React.FunctionComponent = () => {
  const [value, setValue] = React.useState('');

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
