import React from 'react';
import { OpenAPIV3 } from 'openapi-types';
import { DeRefResponse } from '../../utils/Openapi';
import { Flex, FlexItem, Content, ContentVariants } from '@patternfly/react-core';
import { SchemaType } from './SchemaType';

interface BodySchemaInfo {
  schemaType: string;
  schema?: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
}

export interface RequestBodyViewProps {
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject;
  document: OpenAPIV3.Document;
}
export const RequestBodyView: React.FunctionComponent<RequestBodyViewProps> = ({ requestBody, document }) => {
  let requestBodySchemas = [] as BodySchemaInfo[];
  let isEmptyContent = false;
  if (requestBody) {
    if ('content' in requestBody) {
      requestBodySchemas = Object.entries(requestBody.content).map(([mediatype, mediaObject]) => {
        if (mediaObject.schema !== undefined) {
          const schema = mediaObject.schema as OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
          return { schemaType: mediatype, schema: schema };
        }
        return {
          schemaType: mediatype,
          schema: {} as DeRefResponse<OpenAPIV3.NonArraySchemaObject>,
        };
      });
    } else {
      isEmptyContent = true;
    }
  }
  return (
    <>
      <Content>
        <Content component={ContentVariants.h3} className="pf-v6-u-pb-lg apid-reqbody-header">
          Request Body Schema
        </Content>
      </Content>
      {!isEmptyContent ? (
        requestBodySchemas.map((bodySchema) => {
          return bodySchema.schema && <RefSchemaView key={bodySchema.schemaType} schemaType={bodySchema.schemaType} schema={bodySchema.schema} document={document} />;
        })
      ) : (
        <RefSchemaView schemaType="schema" schema={requestBody as OpenAPIV3.ReferenceObject} document={document} />
      )}
    </>
  );
};

interface RefSchemaViewProps {
  schemaType: string;
  schema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
  document: OpenAPIV3.Document;
}
export const RefSchemaView: React.FunctionComponent<RefSchemaViewProps> = ({ schemaType, schema, document }) => {
  return (
    <Content>
      <Flex>
        <FlexItem>
          <Content component={ContentVariants.p}>{schemaType}</Content>
        </FlexItem>
        <FlexItem>
          <SchemaType document={document} schema={schema} />
        </FlexItem>
      </Flex>
    </Content>
  );
};
