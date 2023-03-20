/**
 * Set of OpenAPI tools to work with the OpenAPI
 */
import { OpenAPIV3 } from "openapi-types";
import { mock } from 'mock-json-schema';

type Referenceable = OpenAPIV3.SchemaObject | OpenAPIV3.ResponseObject | OpenAPIV3.ParameterObject
    | OpenAPIV3.ExampleObject | OpenAPIV3.RequestBodyObject | OpenAPIV3.HeaderObject
    | OpenAPIV3.SecuritySchemeObject | OpenAPIV3.LinkObject | OpenAPIV3.CallbackObject;

type StringMap = {
    [key: string]: object;
}

export type DeRefResponse<T> = {
    deRefData?: {
        name: string;
        path: string;
    }
} & T;

const isAReference = <T extends Referenceable>(refOrObject: OpenAPIV3.ReferenceObject | T): refOrObject is OpenAPIV3.ReferenceObject => {
    // Editor might complain because of:
    // Redundant 'typeof' check: '$ref' always has type 'string'
    // This is wrong, as CallbackObject might also have $ref as a PathItemObject
    return refOrObject && '$ref' in refOrObject && typeof refOrObject.$ref === 'string';
}

export const deRef = <T extends Referenceable>(refOrObject: OpenAPIV3.ReferenceObject | T, base: OpenAPIV3.Document): DeRefResponse<T> => {
    if (isAReference(refOrObject)) {
        return deRefTransverse(refOrObject.$ref, base);
    }

    return refOrObject;
};

const deRefTransverse = <T extends Referenceable>(reference: string, base: OpenAPIV3.Document): DeRefResponse<T> => {
    let current: object = {};

    const path = reference.split('/');

    const startAt = path.shift();
    if (startAt === '#') {
        // Assume we don't refer documents outside - i.e. it starts with '#'
        current = base;
    } else {
        throw new Error(`External reference found: ${reference}`);
    }

    for (const step of path) {
        if (step in current) {
            current = (current as StringMap)[step];
        } else {
            throw new Error(`Path not found for ref ${reference}`);
        }
    }

    return {
        deRefData: {
            name: path.at(-1)!,
            path: reference
        },
        ...current as T
    };
}

// Todo: This probably needs more work
export const recursiveDeRef = <T extends Referenceable>(refOrObject: OpenAPIV3.ReferenceObject | T, base: OpenAPIV3.Document): DeRefResponse<T> => {
    return recursiveDeRefInternal(refOrObject, {
        document: base,
        entities: {}
    }) as DeRefResponse<T>;
}

interface RecursiveDeRefContext {
    document: OpenAPIV3.Document;
    entities: Record<string, object>;
}

/*
Prevents infinite recursion, as ref "a" could be part of "b" and "b" contain "a"
Think of Node of a Tree on which each node has a ref to the tree itself
lib to create the example does not handle recursion - we need to keep track of recursive ref
A simpler approach is to have a context per path and when found ignore the content
 */
const recursiveDeRefInternal = (refOrObject: object, context: RecursiveDeRefContext): object => {
    let deRefObj: object;
    if (isAReference(refOrObject)) {
        if (context.entities[refOrObject.$ref]) {
            return {};
        } else {
            deRefObj = deRef(refOrObject, context.document);
            context.entities[(deRefObj as DeRefResponse<unknown>).deRefData?.path!] = deRefObj;
        }
    } else {
        deRefObj = {
            ...refOrObject
        };
    }

    const recursiveDeRefArrayMap = (element: unknown): unknown => {
        if (!element) {
            return element;
        }

        if (Array.isArray(element)) {
            return element.map(recursiveDeRefArrayMap);
        } else if (typeof element === 'object') {
            return recursiveDeRefInternal(element, {
                ...context,
                entities: {...context.entities}
            });
        }

        return element;
    }

    for (const [prop, value] of Object.entries(deRefObj)) {
        if (Array.isArray(value)) {
            (deRefObj as any)[prop] = value.map(recursiveDeRefArrayMap);
        } else if (typeof value === 'object') {
            // Todo: Minor typesafety - there must be a way to patch the Referenceable to convert all ReferenceObject to accept a DeRefResponse
            (deRefObj as any)[prop] = recursiveDeRefInternal(value, {
                ...context,
                entities: {...context.entities}
            });
        }
    }

    return deRefObj;
}

type ExamplesObj = {
    [key: string]: string;
}
export const buildExample = (responses: OpenAPIV3.ResponsesObject, document: OpenAPIV3.Document): ExamplesObj=> {
    let examples: ExamplesObj = {}
    Object.entries(responses).forEach(([code, response])=> {
        const deRefResponse = deRef(response, document);
        if (deRefResponse.content && deRefResponse.content['application/json']?.schema) {
            // We need to deRef everything recursive to make the mock work
            const jsonSchema = recursiveDeRef(deRefResponse.content['application/json'].schema, document);
            examples[code] = JSON.stringify(mock(jsonSchema), undefined, 2);
        }
    })

    return examples;
}
