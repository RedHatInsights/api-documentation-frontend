import {FunctionComponent, useMemo, useState} from 'react';
import {
  Button,
  Form,
  Page,
  PageSection,
  PageSectionVariants, Pagination,
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
import {Helmet} from 'react-helmet';

import {SidebarTags} from "../components/SideBar/SidebarTags";
import {NoMatchFound} from "../components/NoMatchFound/NoMatchFound";
import {usePaginatedGallery} from "../components/Card/usePaginatedGallery";
import {GalleryTemplate} from "./GalleryTemplate";

export const LandingPage: FunctionComponent = () => {
  const [searchInput, setSearchInput] = useState('');

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
  const paginatedGalleryInfo = usePaginatedGallery(galleryId, filteredDocs);

  const clearFilters = () => {
    setSearchInput('');
    setSelectedTags([]);
    paginatedGalleryInfo.onSetPage(1);
  };

    return <>
      <Helmet>
        <title>API Docs</title>
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
                <Button variant="link" icon={<ThIcon />} className="pf-u-mr-sm" isInline isLarge/>
                <Button variant="link" icon={<ThListIcon />} isInline isLarge isDisabled/>
              </div>
            </PageSection>

            <PageSection style={paginatedGalleryInfo.height ? {minHeight: paginatedGalleryInfo.height} : undefined} padding={{ default: 'noPadding' }} isFilled={true}>
              <GalleryTemplate
                  id={galleryId}
                  elements={filteredDocs}
                  isHidden
              />
              { paginatedGalleryInfo.paginatedElements.length > 0 ?
                  <GalleryTemplate
                      elements={paginatedGalleryInfo.paginatedElements}
                  /> :
              <NoMatchFound clearFilters={clearFilters} /> }
            </PageSection>

            <PageSection className="pf-u-pl-md" padding={{ md: 'noPadding' }} variant={PageSectionVariants.light} isFilled={false}>
              <Pagination
                  itemCount={paginatedGalleryInfo.count}
                  perPage={paginatedGalleryInfo.perPage}
                  page={paginatedGalleryInfo.page}
                  onSetPage={(_event, page) => paginatedGalleryInfo.onSetPage(page)}
                  perPageOptions={[{
                    title: paginatedGalleryInfo.perPage+'',
                    value: paginatedGalleryInfo.perPage
                  }]}
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
