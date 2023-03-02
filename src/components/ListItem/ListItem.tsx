import {FunctionComponent} from 'react';
import {Card as PFCard, CardBody, Split, SplitItem, Text, TextContent, TextVariants} from '@patternfly/react-core';

import {apiConfigurations, apiLabels, APIConfigurationIcons, pages} from "@apidocs/common";

export interface CardProps {
  displayName: string;
  icon?: keyof typeof APIConfigurationIcons;
  description: string;
  onClick: () => void;
}

export const ListItem: FunctionComponent<CardProps> = ({displayName, icon, description, onClick}) => {
    const TitleIcon = icon ? APIConfigurationIcons[icon] : APIConfigurationIcons.GenericIcon;
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
