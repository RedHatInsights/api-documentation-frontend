import {OpenAPIV3} from "openapi-types";
import { DeRefResponse, deRef } from './Openapi';
import {Request as RequestFormat, Header} from 'har-format'


const getHeaders = (params: DeRefResponse<OpenAPIV3.ParameterObject>[], document: OpenAPIV3.Document): Header[] => {
    const headers: Header[] = []
    // headers.push({name: "Accept", value: "application/json"})
    if (document.components?.securitySchemes) {
        Object.values(document.components?.securitySchemes).forEach(s => {
            const scheme = deRef(s, document)
            if ("in" in scheme && scheme.in == "header") {
                headers.push({name: scheme.name, value: scheme.type})
            }
        });
    }
    params.forEach(param => {
        if (param.in == "header" && param.required) {
            let val = param.name
            if (param.schema && "type" in param.schema) {
                val = param.schema.type as string
            }
            headers.push({name: param.name, value: val})
        }
    })

    // setting 'Content-Type' 'application/json' as a default header
    const hasContentType = headers.some(header => header.name === 'Content-Type');
    if (!hasContentType) {
    headers.push({ name: 'Content-Type', value: 'application/json' });
    }

    return headers
  }
  
export const buildCodeSampleData = (verb: string, path: string, params: DeRefResponse<OpenAPIV3.ParameterObject>[], document: OpenAPIV3.Document): RequestFormat => {
    return ({
        method: verb.toUpperCase(),
        url: "http://example.com"+path,
        httpVersion: "HTTP/1.1",
        cookies: [],
        headers: getHeaders(params, document),
        queryString: [], //TODO path params?
        postData: undefined, //TODO body params
        headersSize: -1,
        bodySize: -1,
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })
}
