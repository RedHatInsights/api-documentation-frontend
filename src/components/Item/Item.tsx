import {Fragment, FunctionComponent } from 'react';
import { Checkbox, DataListCell, Divider } from '@patternfly/react-core';


export interface CardProps {
  displayName: string;
  description: string;
}

export const Item: FunctionComponent<CardProps> = ({displayName, description}) => {
  return <Fragment>
    <DataListCell width={2} key={displayName}>
      <Checkbox id="1"/>
      <span id="api-display-name">{displayName}</span>
    </DataListCell>,
    <DataListCell wrapModifier='truncate' width={2} key={description}>{description}</DataListCell>
    <DataListCell key={displayName}></DataListCell>
    <DataListCell key={displayName}></DataListCell>

    <Divider />
  </Fragment>
};
