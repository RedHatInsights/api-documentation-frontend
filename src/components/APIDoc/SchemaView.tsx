import React from 'react';
import { TreeView, TreeViewDataItem } from '@patternfly/react-core';
import { OpenAPIV3 } from 'openapi-types';

import { deRef, DeRefResponse } from '../../utils/Openapi';


export interface SchemaViewProps {
  schema: DeRefResponse<OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject>;
  document: OpenAPIV3.Document
}


export const SchemaView: React.FunctionComponent<SchemaViewProps> = ({ schema, document }) => {
  const schemaData = getTreeViewData(schema, document)

  const options: TreeViewDataItem[] = [
    {
      name: 'Application launcher',
      id: 'example8-AppLaunch',
      children: [
        {
          name: 'Application 1',
          id: 'example8-App1',
          children: [
            { name: 'Settings', id: 'example8-App1Settings' },
            { name: 'Current', id: 'example8-App1Current' }
          ]
        },
        {
          name: 'Application 2',
          id: 'example8-App2',
          children: [
            { name: 'Settings', id: 'example8-App2Settings' },
            {
              name: 'Loader',
              id: 'example8-App2Loader',
              children: [
                { name: 'Loading App 1', id: 'example8-LoadApp1' },
                { name: 'Loading App 2', id: 'example8-LoadApp2' },
                { name: 'Loading App 3', id: 'example8-LoadApp3' }
              ]
            }
          ]
        }
      ],
      defaultExpanded: false
    },
    {
      name: 'Cost management',
      id: 'example8-Cost',
      children: [
        {
          name: 'Application 3',
          id: 'example8-App3',
          children: [
            { name: 'Settings', id: 'example8-App3Settings' },
            { name: 'Current', id: 'example8-App3Current' }
          ]
        }
      ]
    },
    {
      name: 'Sources',
      id: 'example8-Sources',
      children: [
        { name: 'Application 4', id: 'example8-App4', children: [{ name: 'Settings', id: 'example8-App4Settings' }] }
      ]
    },
    {
      title: "ReallyCool",
      name: 'Really really really long folder name that overflows the container it is in',
      id: 'example8-Long',
      children: [{ name: 'Application 5', id: 'example8-App5' }]
    },
    {
      title: "SomethingCool",
      name: 'Really really really long folder name that overflows the container it is in',
      id: 'example8-Long'
    }
  ];
  return <TreeView data={schemaData} variant="compactNoBackground" />;
};


const getTreeViewData = (schema: DeRefResponse<OpenAPIV3.ArraySchemaObject | OpenAPIV3.NonArraySchemaObject>, document: OpenAPIV3.Document) => {
  if (!schema || !schema.properties) {
    return [{title: "None", name: "schema undefined"}] as TreeViewDataItem[]
  }

  const schemaData = Object.entries(schema.properties).map(([key, value]) => {
    let name: string

    if ('type' in value) {
      name = value.type as string
    } else if ('$ref' in value ) {
      name = value.$ref.split('/').at(-1) as string
    } else {
      name = "schema undefined/oneOf/anyOf/etc"
      console.log("undefined...", value)
    }
    let children: TreeViewDataItem[] | undefined = undefined
    if ('properties' in value) {
      children = getTreeViewData(value, document)
    } else if ('items' in value) {
      const items = deRef(value.items, document)
      children = getTreeViewData(items, document)
    }
    return {
      title: key as string,
      name: name,
      id: `${key}-${name}`,
      children: children,
    }
  }) as TreeViewDataItem[]

  return schemaData
}