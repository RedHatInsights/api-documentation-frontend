import { FunctionComponent, PropsWithChildren } from 'react';
import { Card as PFCard, CardBody, CardHeader, CardTitle, Divider, Split, SplitItem, Text, TextContent, TextVariants } from '@patternfly/react-core';
import Link from 'next/link';
import { APIConfigurationIcons } from '@apidocs/common';

export interface CardProps {
  apiId: string;
  displayName: string;
  icon?: keyof typeof APIConfigurationIcons;
  description: string;
  to: string;
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> = ({ apiId, displayName, icon, description, to, children }) => {
  const TitleIcon = icon ? APIConfigurationIcons[icon] : APIConfigurationIcons.GenericIcon;

  // const onCardClick = (event: MouseEvent) => {
  //   // Allow default Link new tab on ctrl+click
  //   if (event.ctrlKey) {
  //     return;
  //   }

  //   event.preventDefault();

  //   // By-pass click if we actually clicked on a button (or it's children)
  //   const clickedAButton = event.target instanceof Element && event.target.closest('button');

  //   if (!clickedAButton) {
  //     Router.push(to)
  //   }
  // }

  return (
    <Link href={to} style={{ textDecoration: 'none' }} className="pf-v5-u-color-100">
      <PFCard role="link" isSelectableRaised isFullHeight ouiaId={apiId}>
        <CardHeader className="pf-v5-u-p-md pf-v5-u-pt-sm pf-v5-u-pb-0">
          <Split className="pf-v5-u-mb-0">
            <SplitItem>
              <TitleIcon />
            </SplitItem>
            <SplitItem>
              <CardTitle className="pf-v5-u-pl-sm pf-v5-u-pt-sm pf-v5-u-align-self-flex-start">
                {displayName}
              </CardTitle>
            </SplitItem>
          </Split>
        </CardHeader> 
        <Divider />  
        <CardBody className="pf-v5-u-p-md">
          <TextContent>
            <Text component={TextVariants.small}>{description}</Text>
          </TextContent>
          {children}
        </CardBody>
      </PFCard>
    </Link>
  );
};
