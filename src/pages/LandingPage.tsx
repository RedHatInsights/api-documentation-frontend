import {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {
  Flex, FlexItem,
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
  ToggleGroupItem
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

  usePaginatedGallery(galleryId, view === 'grid', {
    setPage: pagination.onSetPage,
    perPage: pagination.perPage,
    setPerPage: pagination.onSetPerPage,
    setAvailablePerPage: pagination.setAvailablePerPage,
    defaultAvailablePerPage: usePagination.defaultAvailablePerPage
  });

  const changeView = (toView: 'grid' | 'list') => {
    setView(toView);
    pagination.onSetPage(1);
    if (toView === 'list') {
      pagination.setAvailablePerPage();
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

  // For some reason the type doesn't like 'ref'.
  const basePaginationProps: Omit<PaginationProps, 'ref'> = {
    itemCount: filteredDocs.length,
    perPage: pagination.perPage,
    page: pagination.page,
    onSetPage: (_event, page) => pagination.onSetPage(page),
    onPerPageSelect: (_event, perPage, newPage) => {
      pagination.onSetPerPage(perPage);
      pagination.onSetPage(newPage);
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
              <Text component={TextVariants.h1}>API Catalog and Documentation</Text>
            </TextContent>
          </PageSection>

          <PageSection variant={PageSectionVariants.light} className="pf-u-p-md">
            <Flex direction={{ default: "rowReverse" }}>
              <FlexItem>
                <Split>
                  <SplitItem>
                    <Pagination
                        { ...basePaginationProps }
                        isCompact
                    />
                  </SplitItem>
                  <SplitItem className="apid-landing-layout-toggle-group">
                    <ToggleGroup aria-label="API content type toggle group">
                      <ToggleGroupItem buttonId="display-cards" icon={<ThIcon />} aria-label="Cards display" isSelected={view === 'grid'} onChange={() => changeView('grid')} />
                      <ToggleGroupItem buttonId="display-list" icon={<ThListIcon />} aria-label="Table display" isSelected={view === 'list'} onChange={() => changeView('list')} />
                    </ToggleGroup>
                  </SplitItem>
                </Split>
              </FlexItem>
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
