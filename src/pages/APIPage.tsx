import {FunctionComponent} from 'react';
import {
    Breadcrumb, BreadcrumbItem,
    Page,
    PageSection,
    PageSectionVariants,
} from "@patternfly/react-core";
import {apiConfigurations} from "../config/apis";
import {useNavigate, useParams} from "react-router";
import {ApiDoc} from "../components/APIDoc/ApiDoc";

export const APIPage: FunctionComponent = () => {

    const navigate = useNavigate();
    const { api } = useParams();
    const selectedApi = apiConfigurations.find(a => a.displayName === api);

    if (!selectedApi) {
        navigate('/');
        return null;
    }

    return <Page>
        <PageSection variant={PageSectionVariants.light}>
            <Breadcrumb>
                <BreadcrumbItem to='#' onClick={(event) => {
                    event.preventDefault();
                    navigate('/');
                }} >API Catalog</BreadcrumbItem>
                <BreadcrumbItem isActive>{api}</BreadcrumbItem>
            </Breadcrumb>
        </PageSection>
        <PageSection variant={PageSectionVariants.light}>
            <ApiDoc openapi={selectedApi.api} />
        </PageSection>
    </Page>;
};
