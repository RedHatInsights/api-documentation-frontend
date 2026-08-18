import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import ReactMarkdown from 'react-markdown';
import { rehypePlugins } from '../../utils/markdownPlugins';

export interface SecuritySchemesProps {
  securityScheme: OpenAPIV3.SecuritySchemeObject;
}

export const SecurityScheme: React.FunctionComponent<SecuritySchemesProps> = (props) => {
  switch (props.securityScheme.type) {
    case 'apiKey':
      return <SecuritySchemeApiKey {...props.securityScheme} />;
    case 'http':
      return <SecuritySchemeHttp {...props.securityScheme} />;
    case 'oauth2':
      return <SecuritySchemeOauth {...props.securityScheme} />;
    case 'openIdConnect':
      return <SecuritySchemeOpenId {...props.securityScheme} />;
    default:
      throw new Error(`Unknown security scheme found: ${JSON.stringify(props.securityScheme)}`);
  }
};

const SecuritySchemeOpenId: React.FunctionComponent<OpenAPIV3.OpenIdSecurityScheme> = (openid) => {
  return (
    <>
      <span>OpenId Authentication, connect url: {openid.openIdConnectUrl}</span>
      <br />
      {openid.description && (
        <div>
          <ReactMarkdown rehypePlugins={rehypePlugins}>{openid.description}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

const SecuritySchemeOauth: React.FunctionComponent<OpenAPIV3.OAuth2SecurityScheme> = (oauth) => {
  return (
    <>
      <span>OAuth2</span>
      {oauth.flows && Object.keys(oauth.flows).length > 0 && (
        <>
          <span>Supported flows</span>
          <br />
          <ul>
            {oauth.flows.authorizationCode && <li>Authorization code</li>}
            {oauth.flows.clientCredentials && <li>Client credentials</li>}
            {oauth.flows.implicit && <li>Implicit</li>}
            {oauth.flows.password && <li>Password</li>}
          </ul>
        </>
      )}
      <br />
      {oauth.description && (
        <div>
          <ReactMarkdown rehypePlugins={rehypePlugins}>{oauth.description}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

const SecuritySchemeHttp: React.FunctionComponent<OpenAPIV3.HttpSecurityScheme> = (http) => {
  return (
    <>
      <span>HTTP Authentication, scheme: {http.scheme}</span>
      <br />
      {http.description && (
        <div>
          <ReactMarkdown rehypePlugins={rehypePlugins}>{http.description}</ReactMarkdown>
        </div>
      )}
    </>
  );
};

const SecuritySchemeApiKey: React.FunctionComponent<OpenAPIV3.ApiKeySecurityScheme> = (api) => {
  return (
    <>
      <span>API Key (Access Token)</span>
      <br />
      <ul>
        <li>Parameter name: {api.name}</li>
        <li>In: {api.in}</li>
      </ul>
      {api.description && (
        <div className="apid-m-text-break-all">
          <ReactMarkdown rehypePlugins={rehypePlugins}>{api.description}</ReactMarkdown>
        </div>
      )}
    </>
  );
};
