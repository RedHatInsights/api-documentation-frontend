import axios from 'axios';
import {APIConfiguration} from "@apidocs/common";
import path from "path";
import {statSync} from 'fs';

type Document = {
    solr_command: string;
    contentType: string;
    id: string;
    uri: string;
    name: string;
    description: string;
    product: Array<string>;
    topic: Array<string>;
    last_modified_date_dt: string;
    entity_id: string;
    api_id: string;
}

type CanonicalFormat = {
    dataSource: string;
    documents: Array<Document>;
}

const getDocuments = (config: ReadonlyArray<Readonly<APIConfiguration>>, baseurl: string): Promise<Array<Document>> => Promise.all(config.map(
    async (api) => {
        const contentSummaries = await api.getApiContent().then((content) => {
            const paths = content.openapi.paths
            if (paths) {
                const pathSummaries = Object.entries(paths)
                .map(([path, pathObject]) => {
                    return Object.entries(pathObject)
                    .map(([method, methodInfo]) => {
                        return methodInfo.summary
                    })
                })
                return pathSummaries.flatMap(summaryArray => summaryArray.filter(summary => summary !== undefined))
            }
        })

        const products = new Set<string>();
        const topics = new Set<string>();

        api.tags.forEach((tag) => {
            tag.devRedHatTaxonomy.product && products.add(tag.devRedHatTaxonomy.product);
            tag.devRedHatTaxonomy.topic && topics.add(tag.devRedHatTaxonomy.topic);
        })

        return {
            solr_command: "index",
            contentType: "documentation",
            id: api.id,
            uri: `${baseurl}/api/${api.id}`,
            name: `${api.displayName} | API Catalog and Documentation`,
            description: api.description,
            content_summaries: contentSummaries,
            product: Array.from(products),
            topic: Array.from(topics),
            last_modified_date_dt: statSync(path.join('..', 'common', 'config', api.apiContentPath)).mtime.toISOString(),
            entity_id: "api_catalog",
            api_id: api.id,
        }}
    )
)

export const collector = async (config: ReadonlyArray<Readonly<APIConfiguration>>, baseurl: string): Promise<string> => {
    const documents = await getDocuments(config, baseurl)

    const collection: CanonicalFormat = {
        dataSource: "dev_api_catalog",
        documents: documents
    }

    return JSON.stringify(collection)
}

export const syncCollection = async (content: string): Promise<void> => {
    const syncActive = process.env.HYDRA_SYNC_ACTIVE;

    if (syncActive == "true") {
        const jwtFetchUrl = process.env.JWT_FETCH_URL as string;
        const clientId = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET;

        const authHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
        const jwtRequestBody = 'grant_type=client_credentials';

        return axios.post(jwtFetchUrl, jwtRequestBody, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': authHeader
                }
            })
            .then(response => {
                const jwtToken = response.data;
                const accessToken = jwtToken.access_token;

                const indexUrl = process.env.INDEX_URL as string;

                axios.post(indexUrl, content, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                .then(response => {
                    console.log("Request to Hydra syccessful:", response.data);
                })
                .catch(error => {
                    console.error("Error sending request to Hydra:", error);
                });
            })
            .catch(error => {
                console.log("Error fetching JWT token:", error);
            })
    } else {
        console.log("ACTIVE_SYNC is set to false. Skipping Search Service data sync.")
    }
}
