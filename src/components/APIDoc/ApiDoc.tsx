import {FunctionComponent} from 'react';
import {OpenAPIV3} from "openapi-types";
import {deRef} from "../../utils/Openapi";
import {PageSection, PageSectionVariants, TextContent, Text, TextVariants} from "@patternfly/react-core";
import {ServerList} from "./ServerList";
import {SecuritySchemeList} from "./SecuritySchemeList";
import { SchemaViewer } from './SchemaViewer';
import {GroupedOperations} from "./hooks/useGroupedOperations";
import {renderGroupOperations} from "./Operations/renderGroupedOperations";
import {getAuthenticationId, getOperationId, getSchemasId} from "../../utils/OpenapiHtmlIds";
import {getTitleWithVersion} from "../../utils/OpenapiSelectors";

interface ApiDocProps {
    openapi: OpenAPIV3.Document;
    groupedOperations: GroupedOperations;
}

export const ApiDoc: FunctionComponent<ApiDocProps> = props => {
    const { openapi, groupedOperations } = props;

    return (
      <>
      <PageSection variant={PageSectionVariants.light} className="pf-u-px-xl-on-md">
        <TextContent>
          <Text component={TextVariants.h1}>
            {getTitleWithVersion(openapi)}
          </Text>
          <Text component={TextVariants.p} className="pf-u-pb-md">
            { openapi.info.description }
          </Text>
        </TextContent>

        { openapi.servers && (
          <ServerList servers={openapi.servers}/>
        )}
      </PageSection>
      { openapi.components?.securitySchemes && (
        <PageSection variant={PageSectionVariants.light} className="pf-u-px-xl-on-md">
          <div className="pf-u-pb-lg" id={getAuthenticationId()}>
            <SecuritySchemeList schemes={Object.values(openapi.components.securitySchemes).map(s => deRef(s, openapi))} />
          </div>
        </PageSection>
      )}
      <PageSection id={getOperationId()} variant={PageSectionVariants.light} className="pf-u-px-xl-on-md">
        <TextContent className="pf-u-pb-lg">
          <Text component={TextVariants.h2}>
            Operations
          </Text>
        </TextContent>
        { renderGroupOperations({
          openapi,
          groupedOperations: groupedOperations
        }) }
      </PageSection>
      <PageSection id={getSchemasId()} variant={PageSectionVariants.light} className="pf-u-px-xl-on-md">
        <SchemaViewer document={ openapi }/>
      </PageSection>
    </>
  );
}
