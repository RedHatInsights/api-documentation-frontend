import {FunctionComponent} from 'react';
import {
  Button,
  Gallery, 
  GalleryItem,
  Page,
  PageGroup,
  PageSection,
  PageSectionVariants,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextVariants
} from "@patternfly/react-core";
import {apiConfigurations} from "../config/apis";
import {Card} from "../components/Card/Card";
import {useNavigate} from "react-router";

import ThIcon from '@patternfly/react-icons/dist/js/icons/th-icon';
import ThListIcon from '@patternfly/react-icons/dist/js/icons/th-list-icon';

export const LandingPage: FunctionComponent = () => {
  const navigate = useNavigate();

    return <Page className="pf-u-background-color-200 pf-m-full-height">
      <PageGroup stickyOnBreakpoint={{ default: 'top' }}>
        <PageSection variant={PageSectionVariants.darker} className="pf-u-px-2xl-on-md pf-u-pb-2xl pf-u-background-color-dark-100">
          <TextContent>
            <Text component={TextVariants.h1}>The Red Hat API Documentation and Guides</Text>
            <Text component={TextVariants.p}>
              Here you'll find APIs for many Red Hat products and services.
              Check back regularly as we're adding new ones all the time.
            </Text>
          </TextContent>
        </PageSection>
        <PageSection variant={PageSectionVariants.light} className="pf-u-px-2xl-on-md">
          <Split>
            <SplitItem>
              <div className="pf-c-dropdown isDisabled">
                <button
                  className="pf-c-dropdown__toggle"
                  id="dropdown-collapsed-button"
                  aria-expanded="false"
                  type="button"
                  disabled
                >
                  <span className="pf-c-dropdown__toggle-text">Sort by name (alphabetically)</span>
                  <span className="pf-c-dropdown__toggle-icon">
                    <i className="fas fa-caret-down" aria-hidden="true"></i>
                  </span>
                </button>
                <ul
                  className="pf-c-dropdown__menu"
                  aria-labelledby="dropdown-collapsed-button"
                  hidden
                >
                </ul>
              </div>
            </SplitItem>
            <SplitItem isFilled></SplitItem>
            <SplitItem className="pf-u-pt-sm">
              <Button variant="link" icon={<ThIcon />} className="pf-u-mr-sm" isInline isLarge/>
              <Button variant="link" icon={<ThListIcon />} isInline isLarge isDisabled/>
            </SplitItem>
          </Split>
        </PageSection>
      </PageGroup>
      <PageSection className="pf-u-px-2xl-on-md">
        <Gallery hasGutter>
          { apiConfigurations.map(apiConfig => (
            <GalleryItem key={apiConfig.displayName}>
              <Card displayName={apiConfig.displayName} description={apiConfig.description} onClick={() => navigate(`/api/${apiConfig.displayName}`)} />
            </GalleryItem>
          ))}
          </Gallery>
      </PageSection>
    </Page>;
};
