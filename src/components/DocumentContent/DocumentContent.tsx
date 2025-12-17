import { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { PageSection, PageSectionVariants, Text, TextContent, TextVariants } from '@patternfly/react-core';

interface DocumentContentProps {
  from: Record<string, string>;
  name: string;
  title?: string;
}

export const DocumentContent: FunctionComponent<DocumentContentProps> = ({ from, name, title }) => {
  if (!Object.hasOwn(from, name)) {
    return null;
  }

  return (
    <PageSection variant={PageSectionVariants.light} className="pf-v5-u-px-xl-on-md">
      <TextContent>
        {title && <Text component={TextVariants.h1}>{title}</Text>}
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{from[name]}</ReactMarkdown>
      </TextContent>
    </PageSection>
  );
};
