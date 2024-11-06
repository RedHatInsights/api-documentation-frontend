import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import ReactMarkdown from 'react-markdown';

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
    case 'openIdConnect':
      throw new Error('Unimplemented scheme');
    default:
      throw new Error(`Unknown security scheme found: ${JSON.stringify(props.securityScheme)}`);
  }
};

const SecuritySchemeHttp: React.FunctionComponent<OpenAPIV3.HttpSecurityScheme> = (http) => {
  return (
    <>
      <span>HTTP Authentication, scheme: {http.scheme}</span>
      <br />
      {http.description && (
        <span>
          <ReactMarkdown>{http.description}</ReactMarkdown>
        </span>
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
        <span className="apid-m-text-break-all">
          <ReactMarkdown>{api.description}</ReactMarkdown>
        </span>
      )}
    </>
  );
};
