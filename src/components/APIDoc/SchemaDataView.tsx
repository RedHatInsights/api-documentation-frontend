import React, { useState} from 'react';
import { TreeView, TreeViewDataItem, Text, TextContent, TextVariants, Flex, FlexItem, AccordionItem, AccordionToggle, AccordionContent, Card, CardBody } from '@patternfly/react-core';
import { OpenAPIV3 } from 'openapi-types';

import { deRef, DeRefResponse } from '../../utils/Openapi';

import { PropertyView } from './SchemaPropertyView';

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
          className="pf-u-flex-direction-row-reverse pf-u-py-md"
      >
          <span className="pf-u-font-weight-normal pf-u-color-100 pf-u-mr-lg">{schemaName}</span>
          <span className="pf-u-font-size-sm pf-u-font-weight-normal pf-u-color-200">{schema.type ? schema.type : 'object'} </span>
      </AccordionToggle>
      { isExpanded && <AccordionContent>
        <TreeView data={schemaData} variant="compactNoBackground" />
      </AccordionContent>}
  </AccordionItem>;
};

interface SchemasDataOut {
  type: string;
  treeData: TreeViewDataItem[];
}
interface ConditionSchemaProps {
  condition: string;
  schemas: (OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject)[];
  document: OpenAPIV3.Document;
}
const ConditionSchema:React.FunctionComponent<ConditionSchemaProps> = ({condition, schemas, document}) => {
  let singleSchemas: string[] = []

  const schemasData = schemas.map((schema) => {
    if ('$ref' in schema) {
      const refSchemaName = schema.$ref.split('/').at(-1) as string
      singleSchemas.push(refSchemaName)
      return undefined
    }
    if ('type' in schema) {
      if (schema.type !== 'object') {
        singleSchemas.push(schema.type as string)
        return undefined
      }
    }
    const treeData = getTreeViewData('', deRef(schema,document), document)

    return {type: schema.type as string, treeData: treeData} as SchemasDataOut
  })

  return (
    <>
      <TextContent className="pf-u-pb-md">
        <Text component={TextVariants.h4}>{condition}</Text>
      </TextContent>
      <Flex direction={{ default: 'column' }}>
        {
          singleSchemas.map((singleSchema) => {
            return (
              <FlexItem>
                <Card isFlat isCompact>
                  <CardBody className="pf-u-font-size-md">{singleSchema}</CardBody>
                </Card>
              </FlexItem>)
        })
        }
        {
          schemasData.map((schemaData) => {
            if (!schemaData){
              return undefined
            }
            return (
              <FlexItem>
                <Card isFlat isCompact>
                  <CardBody className="pf-u-font-size-md">{schemaData.type}</CardBody>
                  <CardBody className="pf-u-p-0 pf-u-font-size-md"><TreeView data={schemaData.treeData} variant="compactNoBackground" /></CardBody>
                </Card>
              </FlexItem>
            )
          })
        }
      </Flex>
    </>
  )
}

interface ConditionalKeyVal {
  schemaKey: string;
  schemaVal: (OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject)[]
}
const findConditionKey = (value: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject) => {
  if ('oneOf' in value) {
    return {schemaKey: 'One of', schemaVal: value.oneOf} as ConditionalKeyVal
  } else if ('anyOf' in value) {
    return {schemaKey: 'Any of', schemaVal: value.anyOf} as ConditionalKeyVal
  } else if ('allOf' in value) {
    return {schemaKey: 'All of', schemaVal: value.allOf} as ConditionalKeyVal
  }
  return undefined
}

const getTreeViewData = (schemaName: string, schema: DeRefResponse<OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject>, document: OpenAPIV3.Document) => {
  if (schema.type && !schema.properties) {
    return [{ name: <PropertyView propSchema={schema} propName={schema.deRefData ? schema.deRefData.name : ""} propertyType={schema.type} required={false}/>}] as TreeViewDataItem[]
  }

  const conditionalSchema = findConditionKey(schema)
  if (conditionalSchema) {
    const {schemaKey, schemaVal} = conditionalSchema
    return [{name: <ConditionSchema condition={schemaKey} schemas={schemaVal} document={document}/>}] as TreeViewDataItem[]
  }

  if (!schema.properties) {
    return [{name: "schema undefined"}] as TreeViewDataItem[]
  }
  const schemaData = Object.entries(schema.properties).map(([key, value]) => {
    let propertyType = "object"
    let children: TreeViewDataItem[] | undefined = undefined

    const conditionalSchema = findConditionKey(value);
    if (conditionalSchema) {
      const {schemaKey, schemaVal} = conditionalSchema
      children = [{name: <ConditionSchema condition={schemaKey} schemas={schemaVal} document={document}/>}] as TreeViewDataItem[]
    } else if ('type' in value) {
      propertyType = value.type as string

      if ('items' in value) {
        const itemConditionalSchema = findConditionKey(value.items)
        if (itemConditionalSchema) {
          const {schemaKey, schemaVal} = itemConditionalSchema
          children = [{name: <ConditionSchema condition={schemaKey} schemas={schemaVal} document={document}/>}] as TreeViewDataItem[]
        } else if ('type' in value.items) {
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
      propertyType = "schema undefined"
    }

    return {
      name: <PropertyView propSchema={value} propName={key as string} propertyType={propertyType} required={schema.required?.includes(key)}/>,
      id: `${key}-${propertyType}`,
      children: children,
    }
  }) as TreeViewDataItem[]

  return schemaData
}
