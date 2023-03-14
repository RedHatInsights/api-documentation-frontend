import {Fragment, FunctionComponent } from 'react';
import { Checkbox, DataListCell, Divider, Flex, FlexItem, Text, TextVariants } from '@patternfly/react-core';


export interface CardProps {
  displayName: string;
  description: string;
}

export const Item: FunctionComponent<CardProps> = ({displayName, description}) => {
  return <Fragment>
    <DataListCell width={3} key={displayName}>
      <Flex>
        <FlexItem><Checkbox id="1"/></FlexItem>
        <FlexItem>{displayName}</FlexItem>
      </Flex>
    </DataListCell>
    <DataListCell wrapModifier='truncate' width={3} key={description}>
      <Text component={TextVariants.small}>
        {description}
      </Text></DataListCell>
    <DataListCell key={displayName}></DataListCell>
    <DataListCell key={displayName}></DataListCell>

    <Divider />
  </Fragment>
};
