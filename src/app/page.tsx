'use client';

import {
  Icon,
  Button,
  Flex,
  Form,
  Page,
  PageSection,
  PageSectionVariants,
  Pagination,
  Popover,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextVariants,
  ToggleGroup,
  Tooltip,
  SearchInput,
  PaginationProps,
  ToggleGroupItem,
} from '@patternfly/react-core';
import { useLandingConfigStore } from '@/store/useLandingConfigStore';
import { defaultAvailablePerPage, usePaginationStore } from '@/store/usePaginationStore';
import { SidebarTags } from '@/components/SideBar/SidebarTags';
import ThIcon from '@patternfly/react-icons/dist/js/icons/th-icon';
import ThListIcon from '@patternfly/react-icons/dist/js/icons/th-list-icon';

import { apiConfigurations, apiLabels } from '@apidocs/common/config/apis';
import { useMemo } from 'react';
import { Config } from '@/config';
import { GridContent } from '@/components/GridContent';
import { ListContent } from '@/components/ListContent';
import { usePaginatedGallery } from '@/components/Card/usePaginatedGallery';
import ExternalLinkAltIcon from '@patternfly/react-icons/dist/esm/icons/external-link-alt-icon';

const galleryId = 'apid-c-api-gallery';

export default function Home() {
  const landingStore = useLandingConfigStore();
  const pagination = usePaginationStore();

  const filteredDocs = useMemo(
    () =>
      apiConfigurations
        .filter((apiConfig) => apiConfig.displayName.toLowerCase().includes(landingStore.searchInput.toLowerCase()))
        .filter((apiConfig) => landingStore.selectedTags.length === 0 || apiConfig.tags.some((tag) => landingStore.selectedTags.includes(tag.id))),
    [landingStore.searchInput, landingStore.selectedTags],
  );

  usePaginatedGallery(galleryId, landingStore.view === 'grid', {
    setPage: pagination.setPage,
    page: pagination.page,
    perPage: pagination.perPage,
    setPerPage: pagination.setPerPage,
    setAvailablePerPage: pagination.setAvailablePerPage,
    defaultAvailablePerPage: defaultAvailablePerPage,
    elements: filteredDocs,
    setItems: pagination.setItems,
  });
  const onChange = (searchInput: string) => {
    landingStore.setSearchInput(searchInput);
    pagination.setPage(1);
  };

  const changeView = (toView: 'grid' | 'list') => {
    landingStore.setView(toView);
    pagination.setPage(1);
    if (toView === 'list') {
      pagination.setAvailablePerPage(defaultAvailablePerPage);
      pagination.setPerPage(10);
    }
  };

  const clearFilters = () => {
    landingStore.setSearchInput('');
    landingStore.setSelectedTags([]);
    pagination.setPage(1);
  };

  const onTagsChange = (tagId: string, isChecked: boolean) => {
    landingStore.updateSingleTag(tagId, isChecked);
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
    perPageOptions: pagination.availablePerPage.map((a) => ({
      title: a.toString(),
      value: a,
    })),
    dropDirection: 'up',
    variant: 'bottom',
    className: 'pf-v5-u-py-sm',
  };

  return (
    <Page className="apid-c-page-landingpage pf-v5-u-background-color-100">
      <Sidebar>
        <SidebarPanel className="pf-v5-u-p-lg">
          <Form>
            <SearchInput
              placeholder="Find by product or service name"
              value={landingStore.searchInput}
              onChange={(_event, searchInput) => onChange(searchInput)}
              onClear={() => onChange('')}
            />
            <SidebarTags tags={apiLabels} selected={landingStore.selectedTags} setSelected={onTagsChange} />
          </Form>
        </SidebarPanel>
        <SidebarContent className="pf-v5-u-display-flex pf-v5-u-flex-direction-column">
          <PageSection variant={PageSectionVariants.darker} className="pf-v5-u-px-2xl-on-md pf-v5-u-pb-2xl pf-v5-u-background-color-dark-100">
            <TextContent>
              <Text component={TextVariants.h1}>{Config.title}</Text>
            </TextContent>
          </PageSection>

          <PageSection variant={PageSectionVariants.light} className="pf-v5-u-p-md">
            <Flex direction={{ default: 'rowReverse' }}>
              <Split className="apid-split-l-pagination">
                <SplitItem className="pf-v5-u-pb-md pf-v5-u-pt-md-on-md pf-v5-u-pl-sm-on-md" isFilled>
                  <Button
                    className="pf-v5-u-mr-sm pf-v5-u-mb-sm"
                    component="a"
                    target="_blank"
                    href="https://developers.redhat.com/cheat-sheets/red-hat-insights-api-cheat-sheet"
                    variant="secondary"
                    size="sm"
                  >
                    API Cheat Sheet
                  </Button>
                  <Button
                    className="pf-v5-u-mr-sm pf-v5-u-mb-sm"
                    component="a"
                    target="_blank"
                    href="https://console.redhat.com/docs/api"
                    variant="secondary"
                    size="sm"
                  >
                    Legacy API documentation
                    <Icon size="sm" className="pf-v5-u-ml-xs" isInline>
                      <ExternalLinkAltIcon />
                    </Icon>
                  </Button>
                  <Popover
                    aria-label="Connect to APIs using Red Hat service accounts"
                    position="bottom"
                    bodyContent={
                      <>
                        <b>Important:</b> Starting Dec 2024, Red Hat will discontinue support for basic authorization to connect to services APIs. The
                        Red Hat Hybrid Cloud Console is integrating service accounts with User Access functionality to provide granular control over
                        access permissions and enhance security. Token-based authentication is recommended. More information about transitioning from
                        basic authentication to token-based authentication via service accounts is described on the{' '}
                        <a href="https://access.redhat.com/articles/7036194">Red Hat Customer Portal</a>.
                      </>
                    }
                  >
                    <Button component="a" target="_blank" variant="secondary" size="sm">
                      Connect to APIs using Red Hat service accounts
                    </Button>
                  </Popover>
                </SplitItem>
                <SplitItem>
                  <Pagination {...basePaginationProps} isCompact />
                </SplitItem>
                <SplitItem className="apid-landing-layout-toggle-group">
                  <ToggleGroup aria-label="API content type toggle group">
                    <Tooltip content="Show card view">
                      <ToggleGroupItem
                        buttonId="display-cards"
                        icon={<ThIcon />}
                        aria-label="Cards display"
                        isSelected={landingStore.view === 'grid'}
                        onChange={() => changeView('grid')}
                      />
                    </Tooltip>
                    <Tooltip content="Show table view">
                      <ToggleGroupItem
                        buttonId="display-list"
                        icon={<ThListIcon />}
                        aria-label="Table display"
                        isSelected={landingStore.view === 'list'}
                        onChange={() => changeView('list')}
                      />
                    </Tooltip>
                  </ToggleGroup>
                </SplitItem>
              </Split>
            </Flex>
          </PageSection>

          <PageSection className="apid-c-page__main-section-gallery" isFilled={true}>
            {landingStore.view === 'grid' ? (
              <GridContent galleryId={galleryId} allItems={filteredDocs} items={pagination.items} clearFilters={clearFilters} />
            ) : (
              <ListContent items={pagination.items} clearFilters={clearFilters} />
            )}
          </PageSection>

          <PageSection className="pf-v5-u-pl-md" padding={{ md: 'noPadding' }} variant={PageSectionVariants.light} isFilled={false}>
            <Pagination {...basePaginationProps} />
          </PageSection>
        </SidebarContent>
      </Sidebar>
    </Page>
  );
}
