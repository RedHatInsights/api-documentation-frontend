import { FunctionComponent, PropsWithChildren } from 'react';
import { Card as PFCard, CardBody, CardHeader, CardTitle, Divider, Split, SplitItem, Content, ContentVariants } from '@patternfly/react-core';
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
    <Link href={to} style={{ textDecoration: 'none' }} className="pf-v6-u-text-color-regular">
      <PFCard role="link" isFullHeight ouiaId={apiId}>
        <CardHeader className="pf-v6-u-p-md pf-v6-u-pt-sm pf-v6-u-pb-0">
          <Split className="pf-v6-u-mb-0">
            <SplitItem>
              <TitleIcon />
            </SplitItem>
            <SplitItem>
              <CardTitle className="pf-v6-u-pl-sm pf-v6-u-pt-sm pf-v6-u-align-self-flex-start">{displayName}</CardTitle>
            </SplitItem>
          </Split>
        </CardHeader>
        <Divider />
        <CardBody className="pf-v6-u-p-md">
          <Content>
            <Content component={ContentVariants.small}>{description}</Content>
          </Content>
          {children}
        </CardBody>
      </PFCard>
    </Link>
  );
};
