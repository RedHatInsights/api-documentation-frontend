import {Fragment, FunctionComponent } from 'react';
import { Checkbox, DataListCell, Divider, Flex, FlexItem } from '@patternfly/react-core';


export interface CardProps {
  displayName: string;
  description: string;
}

export const Item: FunctionComponent<CardProps> = ({displayName, description}) => {
  return <Fragment>
    <DataListCell width={2} key={displayName}>
      <Flex>
        <FlexItem><Checkbox id="1"/></FlexItem>
        <FlexItem><span id="api-display-name">{displayName}</span></FlexItem>
      </Flex>
    </DataListCell>,
    <DataListCell wrapModifier='truncate' width={2} key={description}>{description}</DataListCell>
    <DataListCell key={displayName}></DataListCell>
    <DataListCell key={displayName}></DataListCell>

    <Divider />
  </Fragment>
};
