import React from 'react';
import { TreeView, TreeViewDataItem, Text, TextContent, TextVariants, Flex, FlexItem } from '@patternfly/react-core';
import { OpenAPIV3 } from 'openapi-types';

import { deRef, DeRefResponse } from '../../utils/Openapi';


export interface SchemaDataViewProps {
  schemaName: string;
  schema: DeRefResponse<OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject>;
  document: OpenAPIV3.Document;
  propDeRef: boolean;
}

export const SchemaDataView: React.FunctionComponent<SchemaDataViewProps> = ({ schemaName, schema, document, propDeRef }) => {
  const schemaData = getTreeViewData(schemaName, schema, document, propDeRef)

  const data = [{title: schemaName, children: schemaData, id: schemaName}] as TreeViewDataItem[]
  return <TreeView data={data} variant="compactNoBackground" />;
};


interface PropertyComponentProps {
  propName: string;
  propertyType: string;
  required: boolean | undefined;
}

const PropertyView:React.FunctionComponent<PropertyComponentProps> = ({propName, propertyType, required}) => {
  return (
    <Flex>
      <FlexItem>
        <TextContent>
          <Flex>
            <FlexItem>
              <Text component={TextVariants.h6}>{propName}</Text>
            </FlexItem>
            <FlexItem>
              <Text component={TextVariants.p} className="pf-u-danger-color-100">{required && "required"}</Text>
            </FlexItem>
          </Flex>
        </TextContent>
      </FlexItem>
      <FlexItem>
        <TextContent>
            <Text component={TextVariants.p}>
              {propertyType}
            </Text>
          </TextContent>
      </FlexItem>
    </Flex>
  )
}

const getTreeViewData = (schemaName: string, schema: DeRefResponse<OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject>, document: OpenAPIV3.Document, propDeRef: boolean) => {
  if (!schema) {
    return [{name: "schema undefined"}] as TreeViewDataItem[]
  }

  if (schema.type && !schema.properties) {
    return [{ name: <PropertyView propName={schemaName} propertyType={schema.type} required={false}/>}]
  }

  if (!schema.properties) {
    return [{name: "schema undefined"}] as TreeViewDataItem[]
  }
  const schemaData = Object.entries(schema.properties).map(([key, value]) => {
    let propertyType: string

    if ('type' in value) {
      propertyType = value.type as string
    } else if ('$ref' in value ) {
      propertyType = value.$ref.split('/').at(-1) as string
    } else {
      propertyType = "schema undefined/oneOf/anyOf/etc"
    }

    let children: TreeViewDataItem[] | undefined = undefined

    if (propDeRef) {
      if ('properties' in value) {
        children = getTreeViewData(schemaName, value, document, propDeRef)
      } else if ('items' in value) {
        const items = deRef(value.items, document)
        console.log("items...", items)
        children = getTreeViewData(schemaName, items, document, propDeRef)
      }  
    }

    return {
      name: <PropertyView propName={key as string} propertyType={propertyType} required={schema.required?.includes(key)}/>,
      id: `${key}-${propertyType}`,
      children: children,
    }
  }) as TreeViewDataItem[]

  return schemaData
}