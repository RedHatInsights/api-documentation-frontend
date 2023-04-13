import React, {ReactNode, useEffect, useState} from 'react';
import { TreeView, TreeViewDataItem, Text, TextContent, TextVariants, Flex, FlexItem, AccordionItem, AccordionToggle, AccordionContent, Card, CardBody } from '@patternfly/react-core';
import { OpenAPIV3 } from 'openapi-types';

import { deRef, DeRefResponse } from '../../utils/Openapi';

import { PropertyView } from './SchemaPropertyView';
import {getSchemaId} from "../../utils/OpenapiHtmlIds";
import {useLocation} from "react-use";
import {SchemaType} from "./SchemaType";

export interface SchemaDataViewProps {
  schemaName: string;
  schema: DeRefResponse<OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject>;
  document: OpenAPIV3.Document;
}

export const SchemaDataView: React.FunctionComponent<SchemaDataViewProps> = ({ schemaName, schema, document }) => {
  const schemaData = getTreeViewData(schemaName, schema, document);
  const {hash: locationHash} = useLocation();

  const id = getSchemaId(schemaName);
  const idWithHash = `#${id}`;
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    if (locationHash === idWithHash) {
      setExpanded(true);
    }
  }, [locationHash, idWithHash]);

  const switchExpanded = () => {
    setExpanded(prev => {
      // Reset the hash if we collapse it
      if (prev && locationHash === idWithHash) {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        window.location.hash = '';
        window.scrollTo({
          left: scrollX,
          top: scrollY
        });
      }

      return !prev;
    });
  };

  return <AccordionItem>
      <AccordionToggle
          id={id}
          isExpanded={isExpanded}
          onClick={switchExpanded}
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
  let singleSchemas: ReactNode[] = []

  const schemasData = schemas.map((schema) => {
    if ('$ref' in schema) {
      singleSchemas.push(<SchemaType schema={schema} document={document}/>);
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
    return [{ name: <PropertyView
          propSchema={schema}
          propName={schema.deRefData ? schema.deRefData.name : ""}
          propertyType={<SchemaType schema={schema} document={document}/>}
          required={false}/>
    }] as TreeViewDataItem[]
  }

  const conditionalSchema = findConditionKey(schema)
  if (conditionalSchema) {
    const {schemaKey, schemaVal} = conditionalSchema
    return [{name: <ConditionSchema condition={schemaKey} schemas={schemaVal} document={document}/>}] as TreeViewDataItem[]
  }

  if (!schema.properties) {
    return [{name: "schema undefined"}] as TreeViewDataItem[]
  }

  const schemaKeyValArray = Object.entries(schema.properties)
  if (schemaKeyValArray.length < 1) {
    return [{name: "Any data"}] as TreeViewDataItem[]
  }

  const schemaData = schemaKeyValArray.map(([key, value]) => {
    let propertyType: string | ReactNode = "object"
    let children: TreeViewDataItem[] | undefined = undefined;

    const conditionalSchema = findConditionKey(value);
    if (conditionalSchema) {
      const {schemaKey, schemaVal} = conditionalSchema
      children = [{name: <ConditionSchema condition={schemaKey} schemas={schemaVal} document={document}/>}] as TreeViewDataItem[]
    } else if ('$ref' in value ) {
      propertyType = <SchemaType schema={value} document={document}/>;
    }  else {
      propertyType = 'type' in value ? value.type as string : 'any type'

      if ('items' in value) {
        const itemConditionalSchema = findConditionKey(value.items)
        if (itemConditionalSchema) {
          const {schemaKey, schemaVal} = itemConditionalSchema
          children = [{name: <ConditionSchema condition={schemaKey} schemas={schemaVal} document={document}/>}] as TreeViewDataItem[]
        } else if ('type' in value.items) {
          propertyType = <SchemaType schema={value} document={document}/>;
        }
        if ('$ref' in value.items) {
          propertyType = <SchemaType schema={value} document={document}/>;
        }
        if ('properties' in value.items) {
          const items = deRef(value.items, document)
          children = getTreeViewData(schemaName, items, document)
        }
      } else if ('properties' in value) {
        const items = deRef(value, document)
        children = getTreeViewData(schemaName, items, document)
      }
    }

    return {
      name: <PropertyView propSchema={value} propName={key} propertyType={propertyType} required={schema.required?.includes(key)}/>,
      id: key,
      children: children,
    }
  }) as TreeViewDataItem[]

  return schemaData
}
