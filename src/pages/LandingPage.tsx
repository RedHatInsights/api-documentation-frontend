import {FunctionComponent} from 'react';
import {
  Gallery, 
  GalleryItem,
  Page,
  PageGroup,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
  TextVariants
} from "@patternfly/react-core";
import {apiConfigurations} from "../config/apis";
import {Card} from "../components/Card/Card";
import {useNavigate} from "react-router";

export const LandingPage: FunctionComponent = () => {
  const navigate = useNavigate();

    return <Page className="pf-u-background-color-200 pf-m-full-height">
      <PageGroup stickyOnBreakpoint={{ default: 'top' }}>
        <PageSection variant={PageSectionVariants.darker} className="pf-u-px-2xl-on-md pf-u-pb-2xl pf-u-background-color-dark-100">
          <TextContent>
            <Text component={TextVariants.h1}>The Red Hat API Catalog</Text>
            <Text component={TextVariants.p}>
              Here you'll find APIs for many Red Hat products and services.
              Check back regularly as we're adding new ones all the time.
            </Text>
          </TextContent>
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
