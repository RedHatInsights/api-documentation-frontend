import {FunctionComponent} from 'react';
import {Card as PFCard, CardBody, Text, TextContent, TextVariants} from '@patternfly/react-core';

export interface CardProps {
  displayName: string;
  description: string;
  onClick: () => void;
}

export const Card: FunctionComponent<CardProps> = ({displayName, description, onClick}) => {
  return <PFCard
    onClick={ onClick }
    isSelectableRaised
    isFullHeight
     >
      <CardBody>
        <TextContent>
          <Text component="p" className="pf-u-font-size-md pf-u-mb-md">
            {displayName}
          </Text>
          <Text component={TextVariants.small}>
            {description}
          </Text>
        </TextContent>
      </CardBody>
    </PFCard>
};
