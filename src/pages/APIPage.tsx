import {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Bullseye,
    Page,
    PageSection,
    PageSectionVariants,
    Sidebar,
    SidebarContent,
    SidebarPanel,
    Spinner,
} from "@patternfly/react-core";
import {apiConfigurations} from "@apidocs/common";
import {useNavigate, useParams} from "react-router";
import {ApiDoc} from "../components/APIDoc/ApiDoc";
import {usePromise} from "react-use";
import {OpenAPIV3} from "openapi-types";
import {Helmet} from "react-helmet-async";
import {useTags} from "../components/APIDoc/hooks/useTags";
import {useGroupedOperations} from "../components/APIDoc/hooks/useGroupedOperations";
import {SidebarApiSections} from "../components/SideBar/SidebarApiSections";

type ApiState = {
    isLoading: true;
} | {
    isLoading: false;
    api: OpenAPIV3.Document | undefined;
}

export const APIPage: FunctionComponent = () => {

    const navigate = useNavigate();
    const { api } = useParams();
    const promiseOnMounted = usePromise();
    const [apiState, setApiState] = useState<ApiState>({
        isLoading: true
    });

    const selectedApi = useMemo(() => apiConfigurations.find(a => a.id === api), [ api ]);

    useEffect(() => {
        (async () => {
            if (selectedApi) {
                await promiseOnMounted;
                const resolved = await selectedApi.getApi();
                setApiState({
                    isLoading: false,
                    api: resolved
                });
            }
        })();
    }, [promiseOnMounted, selectedApi]);

    const openapi = 'api' in apiState ? apiState.api : undefined;
    const tags = useTags(openapi);
    const groupedOperations = useGroupedOperations(openapi, tags);

    if (!selectedApi || (!apiState.isLoading && apiState.api === undefined)) {
        navigate('/');
        return null;
    }

    return <>
        <Helmet>
            <title>{selectedApi.displayName} - API Docs</title>
            <meta name="rhd:node-type" content="api_docs" />
            <meta name="description" content={selectedApi.description} />
        </Helmet>
        <Page className="apid-c-page-apipage pf-u-background-color-100">
          <PageSection variant={PageSectionVariants.light}>
            <Breadcrumb>
              <BreadcrumbItem to='#' onClick={(event) => {
                    event.preventDefault();
                    navigate('/');
                }} >API Documentation and Guides</BreadcrumbItem>
              <BreadcrumbItem isActive>{api}</BreadcrumbItem>
            </Breadcrumb>
          </PageSection>
          <Sidebar>
            <SidebarPanel className="pf-u-p-lg">
                <SidebarApiSections openapi={openapi} groupedOperations={groupedOperations} />
            </SidebarPanel>

            <SidebarContent>
              { (apiState.isLoading || !apiState.api || groupedOperations.loading) ?
                  <Bullseye><Spinner /></Bullseye> :
                  <ApiDoc openapi={apiState.api} groupedOperations={groupedOperations.value} /> }
            </SidebarContent>
          </Sidebar>
        </Page>
    </>;
};
