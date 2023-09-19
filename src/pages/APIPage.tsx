import {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {
    BackToTop,
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
import {apiConfigurations, APIContent} from "@apidocs/common";
import {useNavigate, useParams} from "react-router";
import {ApiDoc} from "../components/APIDoc/ApiDoc";
import {usePromise} from "react-use";
import {Helmet} from "react-helmet-async";
import {useTags} from "../components/APIDoc/hooks/useTags";
import {useGroupedOperations} from "../components/APIDoc/hooks/useGroupedOperations";
import {SidebarApiSections} from "../components/SideBar/SidebarApiSections";
import {fromApiLabels} from "../utils/DevelopersRedHatTaxonomy";
import {Config} from "../config";
import { LanguageProvider } from '../utils/LanguageContext';

type ApiState = {
    isLoading: true;
} | {
    isLoading: false;
    api: APIContent | undefined;
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
                const resolved = await selectedApi.getApiContent();
                setApiState({
                    isLoading: false,
                    api: resolved
                });
            }
        })();
    }, [promiseOnMounted, selectedApi]);

    const openapi = 'api' in apiState ? apiState.api?.openapi : undefined;
    const tags = useTags(openapi);
    const groupedOperations = useGroupedOperations(openapi, tags);

    if (!selectedApi || (!apiState.isLoading && apiState.api === undefined)) {
        navigate('/');
        return null;
    }

    const taxonomyData = fromApiLabels(selectedApi.tags);

    return <>
        <LanguageProvider>
        <Helmet>
            <title>{selectedApi.displayName} | {Config.title} </title>
            <meta name="rhd:node-type" content="api_catalog" />
            <meta name="description" content={selectedApi.description} />
            { taxonomyData.map(t => (
                <meta name={`rhd:taxonomy-${t.type}`} content={t.value} />
            )) }
        </Helmet>
        <Page className="apid-c-page-apipage pf-u-background-color-100">
          <PageSection variant={PageSectionVariants.light}>
            <Breadcrumb>
              <BreadcrumbItem to='#' onClick={(event) => {
                    event.preventDefault();
                    navigate('/');
                }} >{Config.title}</BreadcrumbItem>
              <BreadcrumbItem isActive>{selectedApi.displayName}</BreadcrumbItem>
            </Breadcrumb>
          </PageSection>
          <Sidebar>
            <SidebarPanel className="pf-u-p-lg">
                <SidebarApiSections openapi={openapi} groupedOperations={groupedOperations} />
            </SidebarPanel>
            <SidebarContent>
              { (apiState.isLoading || !apiState.api || groupedOperations.loading) ?
                  <Bullseye><Spinner /></Bullseye> :
                  <ApiDoc apiContent={apiState.api} groupedOperations={groupedOperations.value} /> }
            </SidebarContent>
          </Sidebar>
          <BackToTop/>
        </Page>
        </LanguageProvider>
    </>;
};
