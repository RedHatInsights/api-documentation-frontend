import {CSSProperties, FunctionComponent, useEffect, useMemo, useState} from 'react';
import {
  Button,
  Form,
  Page,
  PageSection,
  PageSectionVariants, 
  Pagination,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Text,
  TextContent,
  TextVariants
} from "@patternfly/react-core";
import {apiConfigurations, apiLabels} from "@apidocs/common";
import { SearchInput } from '@patternfly/react-core';
import ThIcon from '@patternfly/react-icons/dist/js/icons/th-icon';
import ThListIcon from '@patternfly/react-icons/dist/js/icons/th-list-icon';
import {Helmet} from 'react-helmet-async';


import {SidebarTags} from "../components/SideBar/SidebarTags";
import {usePaginatedGallery} from "../components/Card/usePaginatedGallery";

import { GridContent } from './GridContent';
import { ListContent } from './ListContent';
import {usePagination} from "../hooks/usePagination";

export const LandingPage: FunctionComponent = () => {
  const [searchInput, setSearchInput] = useState('');
  const [view, setView] = useState<'grid'|'list'>('grid');

  const onChange = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  const [selectedTags, setSelectedTags] = useState<ReadonlyArray<string>>([]);

  const filteredDocs = useMemo(() => apiConfigurations
      .filter((apiConfig) => apiConfig.displayName.toLowerCase().includes(searchInput.toLowerCase()))
      .filter(apiConfig => selectedTags.length === 0 || apiConfig.tags.some(tag => selectedTags.includes(tag.id))),
  [searchInput, selectedTags]
  );

  const galleryId = 'apid-c-api-gallery';
  const pagination = usePagination(filteredDocs, 10);
  const galleryHeight = usePaginatedGallery(galleryId, view === 'grid', pagination.onSetPage, pagination.onSetPerPage);

  const changeView = (toView: 'grid' | 'list') => {
    setView(toView);
    pagination.onSetPage(1);
    if (toView === 'list') {
      pagination.onSetPerPage(10);
    }
  }

  const clearFilters = () => {
    setSearchInput('');
    setSelectedTags([]);
    pagination.onSetPage(1);
  };

  useEffect(() => {
    const onSetPage = pagination.onSetPage;
    onSetPage(1);
  }, [filteredDocs, pagination.onSetPage]);

  const galleryPageStyle: CSSProperties = {
    minHeight: Math.max(galleryHeight ?? 0, 500)
  };

  return <>
    <Helmet>
      <title>API Docs</title>
      <meta name="description" content="Displays API Documentation in a single page" />
    </Helmet>
    <Page className="apid-c-page-landingpage pf-u-background-color-100">
      <Sidebar>
        <SidebarPanel className="pf-u-p-lg">
          <Form>
            <SearchInput
              placeholder="Find by product or service name"
              value={searchInput}
              onChange={(_event, searchInput) => onChange(searchInput)}
              onClear={() => onChange('')}
            />
            <SidebarTags tags={apiLabels} selected={selectedTags} setSelected={setSelectedTags} />
          </Form>
        </SidebarPanel>
        <SidebarContent className="pf-u-display-flex pf-u-flex-direction-column">
          <PageSection variant={PageSectionVariants.darker} className="pf-u-px-2xl-on-md pf-u-pb-2xl pf-u-background-color-dark-100">
            <TextContent>
              <Text component={TextVariants.h1}>The Red Hat API Documentation and Guides</Text>
              <Text component={TextVariants.p}>
                Here you'll find APIs for many Red Hat products and services.
                Check back regularly as we're adding new ones all the time.
              </Text>
            </TextContent>
          </PageSection>

          <PageSection variant={PageSectionVariants.light} className="pf-u-p-md">
            <div className="pf-u-text-align-right">
              <Button isDisabled={view === 'grid'} variant="link" icon={<ThIcon />} onClick={() => changeView('grid')} className="pf-u-mr-sm apid-landing-layout-button" isInline isLarge/>
              <Button isDisabled={view === 'list'} variant="link" icon={<ThListIcon />} onClick={() => changeView('list')} className="apid-landing-layout-button" isInline isLarge/>
            </div>
          </PageSection>

          <PageSection className="apid-c-page__main-section-gallery" style={galleryPageStyle} isFilled={true}>
          { view === 'grid'
            ? <GridContent galleryId={galleryId} allItems={filteredDocs} items={pagination.items} clearFilters={clearFilters}/>
            : <ListContent galleryId={galleryId} items={pagination.items} clearFilters={clearFilters}/>
          }
          </PageSection>

          <PageSection className="pf-u-pl-md" padding={{ md: 'noPadding' }} variant={PageSectionVariants.light} isFilled={false}>
            <Pagination
                itemCount={filteredDocs.length}
                perPage={pagination.perPage}
                page={pagination.page}
                onSetPage={(_event, page) => pagination.onSetPage(page)}
                onPerPageSelect={(_event, perPage, newPage) => {
                  pagination.onSetPerPage(perPage);
                  pagination.onSetPage(newPage);
                }}
                perPageOptions={view === 'grid' ? [{
                  title: pagination.perPage.toString(),
                  value: pagination.perPage
                }] : undefined}
                dropDirection="up"
                variant="bottom"
                className="pf-u-py-sm"
            />
          </PageSection>
        </SidebarContent>
      </Sidebar>
    </Page>
  </>;
};
