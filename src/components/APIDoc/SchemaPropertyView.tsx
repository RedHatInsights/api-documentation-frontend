import React from 'react';
import { Text, TextContent, TextVariants, Flex, FlexItem, Label, LabelGroup } from '@patternfly/react-core';
import { OpenAPIV3 } from 'openapi-types';


interface PropertyViewComponentProps {
  propSchema?: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
  propName: string;
  propertyType: string;
  required: boolean | undefined;
}

export const PropertyView:React.FunctionComponent<PropertyViewComponentProps> = ({propSchema, propName, propertyType, required}) => {
  let extraProps;
  if (propSchema && !('$ref' in propSchema) ) {
    extraProps = <ExtraPropertyView propSchema={propSchema}/>
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
              <Text component={TextVariants.p} className="pf-u-danger-color-100">{required && "*"}</Text>
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
      <FlexItem>
        {extraProps}
      </FlexItem>
    </Flex>
  )
}


interface ExtraPropertyViewProps {
  propSchema: OpenAPIV3.SchemaObject;
}
export const ExtraPropertyView:React.FunctionComponent<ExtraPropertyViewProps> = ({propSchema}) => {
  let maxMin: string | undefined;
  if (propSchema.maximum && propSchema.minimum) {
    maxMin = (propSchema.exclusiveMinimum ? '>': '≥') + ` ${propSchema.minimum} and `
    maxMin += (propSchema.exclusiveMaximum ? '<' : '≤') + ` ${propSchema.maximum}`
  } else if (propSchema.maximum) {
    maxMin = (propSchema.exclusiveMaximum ? '<' : '≤') + ` ${propSchema.maximum}`
  } else if (propSchema.minimum) {
    maxMin = (propSchema.exclusiveMinimum ? '>' : '≥') + ` ${propSchema.minimum}`
  }

  let maxMinChar: string | undefined;
  if (propSchema.maxLength && propSchema.minLength) {
    maxMinChar = `${propSchema.minLength} to ${propSchema.maxLength} chars`
  } else if (propSchema.maxLength) {
    maxMinChar = `max ${propSchema.maxLength} chars`
  } else if (propSchema.minLength) {
    maxMinChar = `min ${propSchema.minLength} chars`
  }

  let maxMinItems: string | undefined;
  if (propSchema.maxItems && propSchema.minItems) {
    maxMinItems = `${propSchema.minItems} to ${propSchema.maxItems} items`
  } else if (propSchema.maxItems) {
    maxMinItems = `max ${propSchema.maxItems} items`
  } else if (propSchema.minItems) {
    maxMinItems = `min ${propSchema.minItems} items`
  }

  let maxMinProps: string | undefined;
  if (propSchema.maxProperties && propSchema.minProperties) {
    maxMinProps = `${propSchema.minProperties} to ${propSchema.maxProperties} properties`
  } else if (propSchema.maxProperties) {
    maxMinProps = `max ${propSchema.maxProperties} properties`
  } else if (propSchema.minItems) {
    maxMinProps = `min ${propSchema.minProperties} properties`
  }

  return(
    <LabelGroup>
      {propSchema.format && <Label isCompact>{propSchema.format}</Label>}
      {propSchema.default && <Label isCompact>default: {propSchema.default}</Label>}
      {propSchema.enum && <LabelGroup categoryName="Enums">{propSchema.enum.map(e => <Label key={e} isCompact>{e}</Label>)}</LabelGroup>}
      {propSchema.pattern && <Label isCompact>pattern: {propSchema.pattern}</Label>}
      {propSchema.multipleOf && <Label isCompact>multipleOf: {propSchema.multipleOf}</Label>}
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
  )
}
