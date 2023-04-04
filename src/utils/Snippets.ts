import {OpenAPIV3} from "openapi-types";
import { mock } from 'mock-json-schema';

import { DeRefResponse, deRef, recursiveDeRef } from './Openapi';
import {Request as RequestFormat, Header, QueryString, PostData} from 'har-format'


const getHeaders = (inferredContentType: string, params: DeRefResponse<OpenAPIV3.ParameterObject>[], document: OpenAPIV3.Document): Header[] => {
  const headers: Header[] = []

  if (document.components?.securitySchemes) {
    Object.values(document.components?.securitySchemes).forEach(s => {
      const scheme = deRef(s, document)
      if ("in" in scheme && scheme.in === "header") {
        headers.push({name: scheme.name, value: scheme.type})
      }
    });
  }
  params.forEach(param => {
    if (param.in === "header" && param.required) {
      let val = param.name
      if (param.schema && "type" in param.schema) {
        val = param.schema.type as string
      }
      headers.push({name: param.name, value: val})
    }
  })

  // setting 'Content-Type' as a default header
  const hasContentType = headers.some(header => header.name === 'Content-Type');
  if (!hasContentType) {
    headers.push({ name: 'Content-Type', value: inferredContentType });
  }

  return headers
}

const getQueryParams = (params: DeRefResponse<OpenAPIV3.ParameterObject>[], document: OpenAPIV3.Document): QueryString[] => {
  const queryParams = params.filter(param => param.in === 'query' && param.required)

  const paramsWithValue: QueryString[] = queryParams.map(param => {
    const paramName = param.name

    if (param.example) {
      return {name: paramName, value: param.example}
    }

    const paramSchema = param.schema ? deRef(param.schema, document) : undefined
    if (paramSchema && paramSchema.default) {
      return {name: paramName, value: paramSchema.default}
    }

    if (param.examples) {
      const example = Object.values(param.examples)[0]
      if ('value' in example) {
        return {name: paramName, value: example.value}
      }
    }

    if (paramSchema && paramSchema.enum) {
      const enums = paramSchema.enum
      if (enums.length > 0) {
        return {name: paramName, value: enums[0]}
      }
    }

    return {name: paramName, value: ''}
  })

  return paramsWithValue
}

const getPostData = (requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined, document: OpenAPIV3.Document): PostData | undefined => {
  if (!requestBody) {
    return undefined
  }

  const deRefResponse = deRef(requestBody, document);
  if (!deRefResponse.content || !(deRefResponse.content && deRefResponse.content['application/json']?.schema)) {
    return undefined
  }

  const jsonSchema = recursiveDeRef(deRefResponse.content['application/json'].schema, document);
  const requestBodyText = JSON.stringify(mock(jsonSchema), undefined, 2);

  return {mimeType: 'application/json', text: requestBodyText}
}

const inferContentType = (requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined, responses: OpenAPIV3.ResponsesObject): string => {
  let requestBodyContentTypes: string[] = [];

  if (requestBody && 'content' in requestBody) {
    requestBodyContentTypes = Object.keys(requestBody.content)
  }

  const responsesContentTypes = Object.values(responses).map((value) => {
    if ('content' in value && value.content !== undefined) {
      return Object.keys(value.content)[0]
    }
  }).filter(val => val !== undefined) as string[]

  // giving precedence to the content type mentioned in the requestBody first
  if (requestBodyContentTypes.length > 0) {
    return requestBodyContentTypes[0]
  } else if (responsesContentTypes.length > 0) {
    return responsesContentTypes[0]
  }

  // applicaton/json is the default content type if content type cannot be inferred
  return "application/json"
}

export interface BuildCodeSampleDataParams {
  verb: string;
  path: string;
  params: DeRefResponse<OpenAPIV3.ParameterObject>[];
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject | undefined;
  responses: OpenAPIV3.ResponsesObject;
  document: OpenAPIV3.Document;
}
export const buildCodeSampleData = ({verb, path, params, requestBody, responses, document}: BuildCodeSampleDataParams): RequestFormat => {
  const inferredContentType = inferContentType(requestBody, responses)
  return ({
    method: verb.toUpperCase(),
    url: "http://example.com"+path,
    httpVersion: "HTTP/1.1",
    cookies: [],
    headers: getHeaders(inferredContentType, params, document),
    queryString: getQueryParams(params, document),
    postData: getPostData(requestBody, document),
    headersSize: -1,
    bodySize: -1,
  })
}
