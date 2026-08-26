import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { Content, ContentVariants } from '@patternfly/react-core';
import { SecurityScheme } from './SecurityScheme';

export interface SecuritySchemeListProps {
  schemes: Array<OpenAPIV3.SecuritySchemeObject>;
}

export const SecuritySchemeList: React.FunctionComponent<SecuritySchemeListProps> = ({ schemes }) => (
  <Content>
    <Content component={ContentVariants.h2}>Authentication</Content>
    <Content component="ul" isPlainList>
      {schemes.map((s, index) => (
        <Content component="li" key={index}>
          <SecurityScheme key={index} securityScheme={s} />
        </Content>
      ))}
    </Content>
  </Content>
);
