import { FunctionComponent } from 'react';
import { Label, LabelProps } from '@patternfly/react-core';
import { APILabel } from '@apidocs/common';
import assertNever from 'assert-never';

interface TagProps {
  value: Readonly<APILabel>;
}

const colorForLabelType = (type: APILabel['type']): LabelProps['color'] => {
  switch (type) {
    case 'platform':
      return 'green';
    case 'service':
      return `orange`;
    case 'use-case':
      return 'blue';
    default:
      assertNever(type);
  }
};

export const Tag: FunctionComponent<TagProps> = ({ value }) => {
  return (
    <Label color={colorForLabelType(value.type)} isCompact>
      {value.name}
    </Label>
  );
};
