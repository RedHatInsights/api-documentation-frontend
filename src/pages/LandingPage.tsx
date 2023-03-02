import {FunctionComponent, useState} from 'react';
import {
  Button,
  Form,
  Page,
  PageGroup,
  PageSection,
  PageSectionVariants,
  Sidebar,
  SidebarContent,
  SidebarPanel,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextVariants
} from "@patternfly/react-core";
import {apiConfigurations, apiLabels, APIConfigurationIcons, pages} from "@apidocs/common";
import {Card} from "../components/Card/Card";
import { SearchInput } from '@patternfly/react-core';
import ThIcon from '@patternfly/react-icons/dist/js/icons/th-icon';
import ThListIcon from '@patternfly/react-icons/dist/js/icons/th-list-icon';
import {Helmet} from 'react-helmet';

import {SidebarTags} from "../components/SideBar/SidebarTags";
import { GridView } from '../components/CardDisplay/GridView';
import { ListView } from '../components/CardDisplay/ListView';

export const LandingPage: FunctionComponent = () => {
  const [searchInput, setSearchInput] = useState('');

  const onChange = (searchInput: string) => {
    setSearchInput(searchInput);
  };
  
  const [apiDisplay, setapiDisplay] = useState('grid');

  const handleListView = () => {
    setapiDisplay('list')
  }

  const handleGridView = () => {
    setapiDisplay('grid')
  }

  const [selectedTags, setSelectedTags] = useState<ReadonlyArray<string>>([]);

  const filteredDocs = apiConfigurations.filter(
    (apiConfig) => apiConfig.displayName.toLowerCase().includes(searchInput.toLowerCase())
  ).filter(apiConfig => selectedTags.length === 0 || apiConfig.tags.some(tag => selectedTags.includes(tag.id)));

  const clearFilters = () => {
    setSearchInput('');
    setSelectedTags([]);
  };

  return <>
    <Helmet>
      <title>API Docs</title>
    </Helmet>
    <Page className="apid-c-page-landingpage pf-u-background-color-100 pf-m-full-height">
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
        <SidebarContent>
          <PageGroup stickyOnBreakpoint={{ md: 'top' }} >
            <PageSection variant={PageSectionVariants.darker} className="pf-u-px-2xl-on-md pf-u-pb-2xl pf-u-background-color-dark-100">
              <TextContent>
                <Text component={TextVariants.h1}>The Red Hat API Documentation and Guides</Text>
                <Text component={TextVariants.p}>
                  Here you'll find APIs for many Red Hat products and services.
                  Check back regularly as we're adding new ones all the time.
                </Text>
              </TextContent>
            </PageSection>
            <PageSection variant={PageSectionVariants.light} className="pf-u-px-lg-on-md">
              <Split>
                <SplitItem isFilled></SplitItem>
                <SplitItem className="pf-u-pt-sm">
                  <Button variant="link" icon={<ThIcon />} onClick={handleGridView} className="pf-u-mr-sm" isInline isLarge/>
                  <Button variant="link" icon={<ThListIcon />} onClick={handleListView} isInline isLarge/>
                </SplitItem>
              </Split>
            </PageSection>
          </PageGroup>
          <PageSection className="pf-c-page__main-section-gallery pf-u-px-lg-on-md pf-u-pb-3xl">
            { apiDisplay === 'grid'
              ? <GridView filteredDocs={filteredDocs} clearFilters={clearFilters} /> 
              : <ListView filteredDocs={filteredDocs} clearFilters={clearFilters}/> }
          </PageSection>
        </SidebarContent>
      </Sidebar>
    </Page>
  </>;
};
