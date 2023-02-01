import {FunctionComponent} from 'react';
import {Card as PFCard, CardBody, Split, SplitItem, Text, TextContent, TextVariants} from '@patternfly/react-core';

import APIConfigurationIcons from '../../config/APIConfigurationIcons';

export interface CardProps {
  displayName: string;
  icon: keyof typeof APIConfigurationIcons;
  description: string;
  onClick: () => void;
}

export const Card: FunctionComponent<CardProps> = ({displayName, icon, description, onClick}) => {
  const TitleIcon = APIConfigurationIcons[icon];
  return <PFCard
    onClick={ onClick }
    isSelectableRaised
    isFullHeight
     >
      <CardBody>
        <Split className="pf-u-mb-sm">
          <SplitItem>
            <TitleIcon />
          </SplitItem>
          <SplitItem>
            <Text component="p" className="pf-u-font-size-md pf-u-m-sm pf-u-ml-md">
              {displayName} 
            </Text>
          </SplitItem>
          </Split>
        <TextContent>

          <Text component={TextVariants.small}>
            {description}
          </Text>
        </TextContent>
      </CardBody>
    </PFCard>
};
