import {FunctionComponent, useEffect, useMemo } from 'react';
import {
  Button,
  Flex,
  Form,
  Page,
  PageSection,
  PageSectionVariants,
  Pagination,
  PaginationProps,
  Sidebar,
  SidebarContent,
  SidebarPanel, Split, SplitItem,
  Text,
  TextContent,
  TextVariants,
  ToggleGroup,
  ToggleGroupItem, Tooltip
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
import { useLandingConfigStore, usePaginationStore, defaultAvailablePerPage } from '../hooks/useStore';
import {Config} from "../config";

export const LandingPage: FunctionComponent = () => {
  const searchInput = useLandingConfigStore((state) => state.searchInput)
  const setSearchInput = useLandingConfigStore((state) => state.updateInput)

  const selectedTags = useLandingConfigStore((state) => state.selectedTags)
  const setSelectedTags = useLandingConfigStore((state) => state.updateSelectedTags)

  const view = useLandingConfigStore((state) => state.view)
  const setView = useLandingConfigStore((state) => state.updateView)

  const onChange = (searchInput: string) => {
    setSearchInput(searchInput);
  };

  const filteredDocs = useMemo(() => apiConfigurations
      .filter((apiConfig) => apiConfig.displayName.toLowerCase().includes(searchInput.toLowerCase()))
      .filter(apiConfig => selectedTags.length === 0 || apiConfig.tags.some(tag => selectedTags.includes(tag.id))),
  [searchInput, selectedTags]
  );

  const galleryId = 'apid-c-api-gallery';

  const pagination = usePaginationStore();

  usePaginatedGallery(galleryId, view === 'grid', {
    setPage: pagination.setPage,
    page: pagination.page,
    perPage: pagination.perPage,
    setPerPage: pagination.setPerPage,
    setAvailablePerPage: pagination.setAvailablePerPage,
    defaultAvailablePerPage: defaultAvailablePerPage,
    elements: filteredDocs,
    setItems: pagination.setItems,
  });

  const changeView = (toView: 'grid' | 'list') => {
    setView(toView);
    pagination.setPage(1);
    if (toView === 'list') {
      pagination.setAvailablePerPage(defaultAvailablePerPage);
      pagination.setPerPage(10);
    }
  }

  const clearFilters = () => {
    setSearchInput('');
    setSelectedTags([]);
    pagination.setPage(1);
  };

  // For some reason the type doesn't like 'ref'.
  const basePaginationProps: Omit<PaginationProps, 'ref'> = {
    itemCount: filteredDocs.length,
    perPage: pagination.perPage,
    page: pagination.page,
    onSetPage: (_event, page) => pagination.setPage(page),
    onPerPageSelect: (_event, perPage, newPage) => {
      pagination.setPerPage(perPage);
      pagination.setPage(newPage);
    },
    perPageOptions: pagination.availablePerPage.map(a => ({
      title: a.toString(),
      value: a
    })),
    dropDirection: "up",
    variant: "bottom",
    className: "pf-u-py-sm"
  }

  return <>
    <Helmet>
      <title>Home | {Config.title}</title>
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
              <Text component={TextVariants.h1}>{Config.title}</Text>
            </TextContent>
          </PageSection>

          <PageSection variant={PageSectionVariants.light} className="pf-u-p-md">
            <Flex direction={{ default: "rowReverse" }}>
              <Split className="apid-split-l-pagination">
                <SplitItem className="pf-u-pb-md pf-u-pt-md-on-md pf-u-pl-sm-on-md" isFilled>
                  <Button component="a" target="_blank" href="https://console.redhat.com/docs/api" variant="secondary" className="apid-legacy-button">
                    Use the legacy API documentation site
                  </Button>
                </SplitItem>    
                <SplitItem>
                  <Pagination
                      { ...basePaginationProps }
                      isCompact
                  />
                </SplitItem>
                <SplitItem className="apid-landing-layout-toggle-group">
                  <ToggleGroup aria-label="API content type toggle group">
                    <Tooltip content="Show card view">
                      <ToggleGroupItem buttonId="display-cards" icon={<ThIcon />} aria-label="Cards display" isSelected={view === 'grid'} onChange={() => changeView('grid')} />
                    </Tooltip>
                    <Tooltip content="Show table view">
                      <ToggleGroupItem buttonId="display-list" icon={<ThListIcon />} aria-label="Table display" isSelected={view === 'list'} onChange={() => changeView('list')} />
                    </Tooltip>
                  </ToggleGroup>
                </SplitItem>
              </Split>
            </Flex>
          </PageSection>

          <PageSection className="apid-c-page__main-section-gallery" isFilled={true}>
          { view === 'grid'
            ? <GridContent galleryId={galleryId} allItems={filteredDocs} items={pagination.items} clearFilters={clearFilters}/>
            : <ListContent items={pagination.items} clearFilters={clearFilters}/>
          }
          </PageSection>

          <PageSection className="pf-u-pl-md" padding={{ md: 'noPadding' }} variant={PageSectionVariants.light} isFilled={false}>
            <Pagination { ...basePaginationProps} />
          </PageSection>
        </SidebarContent>
      </Sidebar>
    </Page>
  </>;
};
