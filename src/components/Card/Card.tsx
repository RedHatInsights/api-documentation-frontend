import { FunctionComponent, PropsWithChildren } from 'react';
import { Card as PFCard, CardBody, Split, SplitItem, Text, TextContent, TextVariants } from '@patternfly/react-core';
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
      <PFCard role="link" isSelectable isFullHeight ouiaId={apiId}>
        <CardBody>
          <Split className="pf-v5-u-mb-sm">
            <SplitItem>
              <TitleIcon />
            </SplitItem>
            <SplitItem>
              <Text component="p" className="pf-v5-u-font-size-md pf-v5-u-m-sm pf-v5-u-ml-md">
                {displayName}
              </Text>
            </SplitItem>
          </Split>
          <TextContent>
            <Text component={TextVariants.small}>{description}</Text>
          </TextContent>
          {children}
        </CardBody>
      </PFCard>
    </Link>
  );
};
