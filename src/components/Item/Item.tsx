import {Fragment, FunctionComponent, useState } from 'react';
import { Checkbox, DataListCell, Divider } from '@patternfly/react-core';

import APIConfigurationIcons from '../../config/APIConfigurationIcons';

export interface CardProps {
  displayName: string;
  description: string;
}

export const Item: FunctionComponent<CardProps> = ({displayName, description}) => {
  return <Fragment>
    <DataListCell width={2} key={displayName}>
      <Checkbox id="uncontrolled-check-1"/>
      <span id="api-display-name">{displayName}</span>
    </DataListCell>,
    <DataListCell width={2} key={description}>{description}</DataListCell>
    <DataListCell key={displayName}>PLACEHOLDER</DataListCell>
    <DataListCell key={displayName}>PLACEHOLDER</DataListCell>
    <Divider />
  </Fragment>
};
