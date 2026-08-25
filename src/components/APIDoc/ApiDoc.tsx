import { FunctionComponent } from 'react';
import { deRef } from '../../utils/Openapi';
import { PageSection, Content, ContentVariants } from '@patternfly/react-core';
import { ServerList } from './ServerList';
import { SecuritySchemeList } from './SecuritySchemeList';
import { SchemaViewer } from './SchemaViewer';
import { GroupedOperations } from './hooks/useGroupedOperations';
import { renderGroupOperations } from './Operations/renderGroupedOperations';
import { getAuthenticationId, getOperationId, getSchemasId } from '../../utils/OpenapiHtmlIds';
import { getTitleWithVersion } from '../../utils/OpenapiSelectors';
import { APIContent, ExtraAPIContent } from '@apidocs/common';
import { DocumentContent } from '@/components/DocumentContent/DocumentContent';
import ReactMarkdown from 'react-markdown';
import { rehypePlugins } from '../../utils/markdownPlugins';

interface ApiDocProps {
  apiContent: APIContent;
  groupedOperations: GroupedOperations;
}

export const ApiDoc: FunctionComponent<ApiDocProps> = (props) => {
  const { apiContent, groupedOperations } = props;

  const openapi = apiContent.openapi;

  return (
    <>
      <PageSection hasBodyWrapper={false} className="pf-v6-u-px-xl-on-md">
        <Content>
          <Content component={ContentVariants.h1}>{getTitleWithVersion(openapi)}</Content>
          {openapi.info.description && (
            <div className="pf-v6-u-pb-md">
              <ReactMarkdown rehypePlugins={rehypePlugins}>{openapi.info.description}</ReactMarkdown>
            </div>
          )}
        </Content>

        {openapi.servers && <ServerList servers={openapi.servers} />}
      </PageSection>
      <DocumentContent from={apiContent.extras} name={ExtraAPIContent.GETTING_STARTED} title="Getting started" />
      {openapi.components?.securitySchemes && (
        <PageSection hasBodyWrapper={false} className="pf-v6-u-px-xl-on-md">
          <div className="pf-v6-u-pb-lg" id={getAuthenticationId()}>
            <SecuritySchemeList schemes={Object.values(openapi.components.securitySchemes).map((s) => deRef(s, openapi))} />
          </div>
        </PageSection>
      )}
      <PageSection hasBodyWrapper={false} id={getOperationId()} className="pf-v6-u-px-xl-on-md">
        <Content className="pf-v6-u-pb-lg">
          <Content component={ContentVariants.h2}>Operations</Content>
        </Content>
        {renderGroupOperations({
          openapi,
          groupedOperations: groupedOperations,
        })}
      </PageSection>
      <PageSection hasBodyWrapper={false} id={getSchemasId()} className="pf-v6-u-px-xl-on-md">
        <SchemaViewer document={openapi} />
      </PageSection>
    </>
  );
};
