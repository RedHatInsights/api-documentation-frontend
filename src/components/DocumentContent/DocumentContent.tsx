import { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';
import { rehypePlugins } from '../../utils/markdownPlugins';
import { PageSection, Content, ContentVariants } from '@patternfly/react-core';

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
    <PageSection hasBodyWrapper={false} className="pf-v6-u-px-xl-on-md">
      <Content>
        {title && <Content component={ContentVariants.h1}>{title}</Content>}
        <ReactMarkdown rehypePlugins={rehypePlugins}>{from[name]}</ReactMarkdown>
      </Content>
    </PageSection>
  );
};
