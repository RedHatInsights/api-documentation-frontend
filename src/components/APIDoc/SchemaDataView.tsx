import React, { useState} from 'react';
import { TreeView, TreeViewDataItem, Text, TextContent, TextVariants, Flex, FlexItem, AccordionItem, AccordionToggle, AccordionContent } from '@patternfly/react-core';
import { OpenAPIV3 } from 'openapi-types';

import { deRef, DeRefResponse } from '../../utils/Openapi';

export interface SchemaDataViewProps {
  schemaName: string;
  schema: DeRefResponse<OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject>;
  document: OpenAPIV3.Document;
}

export const SchemaDataView: React.FunctionComponent<SchemaDataViewProps> = ({ schemaName, schema, document }) => {
  const schemaData = getTreeViewData(schemaName, schema, document)

  const id = `schema-${schemaName}`;
  const [isExpanded, setExpanded] = useState(false);

  return <AccordionItem>
      <AccordionToggle
          id={id}
          isExpanded={isExpanded}
          onClick={() => setExpanded(prev => !prev)}
      >
          <span className="schema-name">{schemaName}</span>
          <span className="schema-type">{schema.type ? schema.type : 'object'} </span>
      </AccordionToggle>
      { isExpanded && <AccordionContent>
        <TreeView data={schemaData} variant="compactNoBackground" />
      </AccordionContent>}
  </AccordionItem>;
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

const getTreeViewData = (schemaName: string, schema: DeRefResponse<OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject>, document: OpenAPIV3.Document) => {
  if (schema.type && !schema.properties) {
    return [{ name: <PropertyView propName={schema.deRefData ? schema.deRefData.name : ""} propertyType={schema.type} required={false}/>}]
  }

  if (!schema.properties) {
    return [{name: "schema undefined"}] as TreeViewDataItem[]
  }
  const schemaData = Object.entries(schema.properties).map(([key, value]) => {
    let propertyType = "object"
    let children: TreeViewDataItem[] | undefined = undefined

    if ('type' in value) {
      propertyType = value.type as string

      if ('items' in value) {
        if ('type' in value.items) {
          propertyType = `${propertyType} of ${value.items.type}`
        }
        if ('$ref' in value.items) {
          propertyType = `${propertyType} of ${value.items.$ref.split('/').at(-1) as string}`
        }
        if ('properties' in value.items) {
          const items = deRef(value.items, document)
          children = getTreeViewData(schemaName, items, document)
        }
      } else if ('properties' in value) {
        const items = deRef(value, document)
        children = getTreeViewData(schemaName, items, document)
      }
    } else if ('$ref' in value ) {
      propertyType = value.$ref.split('/').at(-1) as string
    } else {
      propertyType = "schema undefined/oneOf/anyOf/etc"
    }

    return {
      name: <PropertyView propName={key as string} propertyType={propertyType} required={schema.required?.includes(key)}/>,
      id: `${key}-${propertyType}`,
      children: children,
    }
  }) as TreeViewDataItem[]

  return schemaData
}
