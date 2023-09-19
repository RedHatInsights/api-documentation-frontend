import React, { ReactNode } from "react";
import {
  Text,
  TextContent,
  TextVariants,
  Flex,
  FlexItem,
  Label,
  LabelGroup,
  Level,
  TextInput,
  TreeViewDataItem,
  TreeView,
} from "@patternfly/react-core";
import { OpenAPIV3 } from "openapi-types";
import { ExpandableRowContent } from "@patternfly/react-table";
import { ExampleResponse } from "./ExampleResponse";

interface PropertyViewComponentProps {
  propSchema?: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
  propName: string;
  propertyType: ReactNode;
  required: boolean | undefined;
}

export const PropertyView: React.FunctionComponent<
  PropertyViewComponentProps
> = ({ propSchema, propName, propertyType, required }) => {
  let extraProps;
  if (propSchema && !("$ref" in propSchema)) {
    extraProps = <ExtraPropertyView propSchema={propSchema} />;
  }
  return (
    <Flex>
      <FlexItem>
        <TextContent>
          <Flex>
            <FlexItem className="pf-u-mr-xs">
              <Text component={TextVariants.h6}>{propName}</Text>
            </FlexItem>
            <FlexItem>
              <Text
                component={TextVariants.p}
                className="pf-u-danger-color-100"
              >
                {required && "*"}
              </Text>
            </FlexItem>
          </Flex>
        </TextContent>
      </FlexItem>
      <FlexItem>
        <TextContent>
          <Text component={TextVariants.p}>{propertyType}</Text>
        </TextContent>
      </FlexItem>
      <FlexItem>{extraProps}</FlexItem>
    </Flex>
  );
};

interface ExtraPropertyViewProps {
  propSchema: OpenAPIV3.SchemaObject;
}
export const ExtraPropertyView: React.FunctionComponent<
  ExtraPropertyViewProps
> = ({ propSchema }) => {
  console.log(propSchema);
  let maxMin: string | undefined;
  if (propSchema.maximum && propSchema.minimum) {
    maxMin =
      (propSchema.exclusiveMinimum ? ">" : "≥") + ` ${propSchema.minimum} and `;
    maxMin +=
      (propSchema.exclusiveMaximum ? "<" : "≤") + ` ${propSchema.maximum}`;
  } else if (propSchema.maximum) {
    maxMin =
      (propSchema.exclusiveMaximum ? "<" : "≤") + ` ${propSchema.maximum}`;
  } else if (propSchema.minimum) {
    maxMin =
      (propSchema.exclusiveMinimum ? ">" : "≥") + ` ${propSchema.minimum}`;
  }

  let maxMinChar: string | undefined;
  if (propSchema.maxLength && propSchema.minLength) {
    maxMinChar = `${propSchema.minLength} to ${propSchema.maxLength} chars`;
  } else if (propSchema.maxLength) {
    maxMinChar = `max ${propSchema.maxLength} chars`;
  } else if (propSchema.minLength) {
    maxMinChar = `min ${propSchema.minLength} chars`;
  }

  let maxMinItems: string | undefined;
  if (propSchema.maxItems && propSchema.minItems) {
    maxMinItems = `${propSchema.minItems} to ${propSchema.maxItems} items`;
  } else if (propSchema.maxItems) {
    maxMinItems = `max ${propSchema.maxItems} items`;
  } else if (propSchema.minItems) {
    maxMinItems = `min ${propSchema.minItems} items`;
  }

  let maxMinProps: string | undefined;
  if (propSchema.maxProperties && propSchema.minProperties) {
    maxMinProps = `${propSchema.minProperties} to ${propSchema.maxProperties} properties`;
  } else if (propSchema.maxProperties) {
    maxMinProps = `max ${propSchema.maxProperties} properties`;
  } else if (propSchema.minItems) {
    maxMinProps = `min ${propSchema.minProperties} properties`;
  }

  const GuidesTreeView: React.FunctionComponent = () => {
    const options: TreeViewDataItem[] = [
      {
        name: 'Application launcher',
        id: 'AppLaunch',
        children: [
          {
            name: 'Application 1',
            id: 'App1',
            children: [
              { name: 'Settings', id: 'App1Settings' },
              { name: 'Current', id: 'App1Current' }
            ]
          },
          {
            name: 'Application 2',
            id: 'App2',
            children: [
              { name: 'Settings', id: 'App2Settings' },
              {
                name: 'Loader',
                id: 'App2Loader',
                children: [
                  { name: 'Loading App 1', id: 'LoadApp1' },
                  { name: 'Loading App 2', id: 'LoadApp2' },
                  { name: 'Loading App 3', id: 'LoadApp3' }
                ]
              }
            ]
          }
        ],
        defaultExpanded: true
      },
      {
        name: 'Cost management',
        id: 'Cost',
        children: [
          {
            name: 'Application 3',
            id: 'App3',
            children: [
              { name: 'Settings', id: 'App3Settings' },
              { name: 'Current', id: 'App3Current' }
            ]
          }
        ]
      },
      {
        name: 'Sources',
        id: 'Sources',
        children: [{ name: 'Application 4', id: 'App4', children: [{ name: 'Settings', id: 'App4Settings' }] }]
      },
      {
        name: 'Really really really long folder name that overflows the container it is in',
        id: 'Long',
        children: [{ name: 'Application 5', id: 'App5' }]
      }
    ];
    return <TreeView data={options} hasGuides={true} />;
  }

  return (
    <LabelGroup>
      {propSchema.format && <Label isCompact>{propSchema.format}</Label>}
      {propSchema.description && (
        <Level>
          <Text>{propSchema.description}</Text>
        </Level>
      )}
      {propSchema.example && (
        <TextInput
          value={propSchema.example}
          type="text"
          readOnly
          aria-label="schema example"
        />
      )}
      {propSchema.default && (
        <Label isCompact>default: {propSchema.default}</Label>
      )}
      {propSchema.enum && (
        <LabelGroup categoryName="Enums">
          {propSchema.enum.map((e) => (
            <Label key={e} isCompact>
              {e}
            </Label>
          ))}
        </LabelGroup>
      )}
      {propSchema.pattern && (
        <Label isCompact>pattern: {propSchema.pattern}</Label>
      )}
      {propSchema.multipleOf && (
        <Label isCompact>multipleOf: {propSchema.multipleOf}</Label>
      )}
      {maxMin && <Label isCompact>{maxMin}</Label>}
      {maxMinChar && <Label isCompact>{maxMinChar}</Label>}
      {maxMinItems && <Label isCompact>{maxMinItems}</Label>}
      {maxMinProps && <Label isCompact>{maxMinProps}</Label>}
      {propSchema.uniqueItems && <Label isCompact>unique</Label>}
      {propSchema.nullable && <Label isCompact>nullable</Label>}
      {propSchema.readOnly && <Label isCompact>read only</Label>}
      {propSchema.writeOnly && <Label isCompact>write only</Label>}
      {propSchema.deprecated && <Label isCompact>deprecated</Label>}
    </LabelGroup>
  );
};
