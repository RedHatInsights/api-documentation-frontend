import React from 'react';
import { Form } from '@patternfly/react-core';
import { SearchInputBasic } from './SearchBar';
import { CheckboxControlled } from './CheckBox';

export const SidebarBasic: React.FunctionComponent = () => (
  <Form>
    <SearchInputBasic/>
    <CheckboxControlled/>
  </Form>
);
