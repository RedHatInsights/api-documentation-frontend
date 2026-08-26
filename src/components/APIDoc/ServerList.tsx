import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { Content, ContentVariants } from '@patternfly/react-core';

export interface ServerListProps {
  servers: Array<OpenAPIV3.ServerObject>;
}

export const ServerList: React.FunctionComponent<ServerListProps> = ({ servers }) => (
  <Content>
    <Content component={ContentVariants.p} className="pf-v6-u-my-sm">
      Base URLs:
    </Content>
    <Content component="ul" isPlainList>
      {servers.map((server, index) => (
        <Content component="li" key={index}>
          {getServerURL(server)}
        </Content>
      ))}
    </Content>
  </Content>
);

const getServerURL = (server: OpenAPIV3.ServerObject): string => {
  let serverURL = server.url;
  if (server.description) {
    serverURL = `${server.description}: ${server.url}`;
  }

  if (!server.variables) {
    return serverURL;
  }

  for (const variable in server.variables) {
    serverURL = serverURL.replace(`{${variable}}`, server.variables[variable].default);
  }

  return serverURL;
};
