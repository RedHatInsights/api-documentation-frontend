'use client';
import { useEffect, useState } from 'react';
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
} from '@patternfly/react-core';
import Head from 'next/head';
import { apiConfigurations, APIContent } from '@apidocs/common';
import { ApiDoc } from '@/components/APIDoc/ApiDoc';
import { usePromise } from 'react-use';
import { useTags } from '../components/APIDoc/hooks/useTags';
import { useGroupedOperations } from '../components/APIDoc/hooks/useGroupedOperations';
import { SidebarApiSections } from '../components/SideBar/SidebarApiSections';
import { fromApiLabels } from '../utils/DevelopersRedHatTaxonomy';
import { LanguageProvider } from '../utils/LanguageContext';
import { Config } from '@/config';
import { useRouter } from 'next/navigation';

type ApiState =
  | {
      isLoading: true;
    }
  | {
      isLoading: false;
      api: APIContent | undefined;
    };

export const APIPage = ({ apiId }: { apiId: string }) => {
  const router = useRouter();
  const promiseOnMounted = usePromise();
  const [apiState, setApiState] = useState<ApiState>({
    isLoading: true,
  });

  const selectedApi = apiConfigurations.find((api) => api.id === apiId);

  useEffect(() => {
    (async () => {
      if (selectedApi) {
        await promiseOnMounted;
        const resolved = await selectedApi.getApiContent();
        setApiState({
          isLoading: false,
          api: resolved,
        });
      }
    })();
  }, [promiseOnMounted, selectedApi]);

  const openapi = 'api' in apiState ? apiState.api?.openapi : undefined;
  const tags = useTags(openapi);
  const groupedOperations = useGroupedOperations(openapi, tags, selectedApi?.serverUrl);

  if (!selectedApi) {
    return <div>Foobar</div>;
  }

  const taxonomyData = fromApiLabels(selectedApi.tags);
  return (
    <>
      <LanguageProvider>
        <Head>
          <title>
            {selectedApi.displayName} | {Config.title}{' '}
          </title>
          <meta name="rhd:node-type" content="api_catalog" />
          <meta name="description" content={selectedApi.description} />
          {taxonomyData.map((t) => (
            <meta key={t.type} name={`rhd:taxonomy-${t.type}`} content={t.value} />
          ))}
        </Head>
        <Page className="apid-c-page-apipage pf-v5-u-background-color-100">
          <PageSection variant={PageSectionVariants.light}>
            <Breadcrumb>
              <BreadcrumbItem
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push('/');
                }}
              >
                {Config.title}
              </BreadcrumbItem>
              <BreadcrumbItem isActive>{selectedApi.displayName}</BreadcrumbItem>
            </Breadcrumb>
          </PageSection>
          <Sidebar>
            <SidebarPanel className="pf-v5-u-p-lg">
              <SidebarApiSections openapi={openapi} groupedOperations={groupedOperations} />
            </SidebarPanel>
            <SidebarContent>
              {apiState.isLoading || !apiState.api || groupedOperations.loading ? (
                <Bullseye>
                  <Spinner />
                </Bullseye>
              ) : (
                <ApiDoc apiContent={apiState.api} groupedOperations={groupedOperations.value} />
              )}
            </SidebarContent>
          </Sidebar>
          <BackToTop />
        </Page>
      </LanguageProvider>
    </>
  );
};
