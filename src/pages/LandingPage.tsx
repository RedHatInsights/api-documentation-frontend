import {CSSProperties, FunctionComponent} from 'react';
import {
    Gallery, GalleryItem,
    Page,
    PageSection,
    PageSectionVariants,
    Text,
    TextContent,
    TextVariants
} from "@patternfly/react-core";
import {apiConfigurations} from "../config/apis";
import {Card} from "../components/Card/Card";
import {useNavigate} from "react-router";

const pageHeaderSectionStyle: CSSProperties = {
    backgroundColor: '#000'
}

export const LandingPage: FunctionComponent = () => {

    const navigate = useNavigate();

    return <Page>
        <PageSection variant={PageSectionVariants.darker} style={pageHeaderSectionStyle}>
            <TextContent>
                <Text component={TextVariants.h1}>The Red Hat API Catalog</Text>
                <Text>
                    Here you'll find APIs for many Red Hat products and services.
                    Check back regularly as we're adding new ones all the time.
                </Text>
            </TextContent>
        </PageSection>
        <PageSection variant={PageSectionVariants.light}>
            <Gallery hasGutter>
            { apiConfigurations.map(apiConfig => (
                <GalleryItem key={apiConfig.displayName}>
                    <Card displayName={apiConfig.displayName} onClick={() => navigate(`/api/${apiConfig.displayName}`)} />
                </GalleryItem>
                ))}
            </Gallery>
        </PageSection>
    </Page>;
};
