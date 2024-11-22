import { Children, FunctionComponent, PropsWithChildren } from 'react';
import { LabelGroup } from '@patternfly/react-core';

export const Tags: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const numLabels = Children.toArray(children).length <= 4 ? 4 : 3;
  return <LabelGroup numLabels={numLabels} isCompact>{children}</LabelGroup>;
};
