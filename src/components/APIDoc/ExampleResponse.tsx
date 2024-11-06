import React from 'react';
import { CodeBlock, CodeBlockCode, ExpandableSection, ExpandableSectionToggle } from '@patternfly/react-core';
import { stringHash } from '../../utils/Hash';

export interface ExampleResponseProps {
  response: string;
}

export const ExampleResponse: React.FunctionComponent<ExampleResponseProps> = ({ response }) => {
  const codeByLines = response.split('\n');
  const showMore = codeByLines.length > 8;
  const id = `example-response-${stringHash(response)}`;

  const [isExpanded, setExpanded] = React.useState(false);
  const onToggle = (expand: boolean) => setExpanded(expand);

  return (
    <>
      <CodeBlock>
        <CodeBlockCode>
          {showMore ? (
            <>
              {codeByLines.slice(0, 5).join('\n')}
              <ExpandableSection isExpanded={isExpanded} isDetached contentId={id}>
                {codeByLines.slice(5).join('\n')}
              </ExpandableSection>
            </>
          ) : (
            <>{codeByLines.join('\n')}</>
          )}
        </CodeBlockCode>
        {showMore && (
          <ExpandableSectionToggle isExpanded={isExpanded} onToggle={onToggle} contentId="code-block-expand" direction="up">
            {isExpanded ? 'Show Less' : 'Show More'}
          </ExpandableSectionToggle>
        )}
      </CodeBlock>
    </>
  );
};
