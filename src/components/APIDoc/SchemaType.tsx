import {FunctionComponent} from "react";
import {OpenAPIV3} from "openapi-types";
import {deRef} from "../../utils/Openapi";
import {JumpLink} from "../JumpLink/JumpLink";
import {getSchemaId} from "../../utils/OpenapiHtmlIds";

export interface SchemaTypeProps {
    document: OpenAPIV3.Document;
    schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined;
    writeEnums?: boolean;
}

export const SchemaType: FunctionComponent<SchemaTypeProps> = ({schema, document, writeEnums}) => {
    if (!schema) {
        return <span>Unknown</span>;
    }

    const dSchema = deRef(schema, document);

    if (dSchema.deRefData?.name) {
        return <JumpLink id={getSchemaId(dSchema.deRefData.name)}>{dSchema.deRefData.name}</JumpLink>;
    }

    if (dSchema.type === undefined) {
        return <span>Unknown</span>;
    }


    // Enums are applied as modifiers else where - we need to make this behavior consistent
    if (writeEnums && dSchema.enum) {
        return <span>{dSchema.enum.join(' | ')}</span>;
    }

    if (dSchema.type === 'array') {

        // This will get "funny" (not really) If the type is inline - we should probably preprocess and create custom
        // types if that happens. or think of another way of display an Array of something that is not name
        return <span>Array&lt;<SchemaType schema={dSchema.items} document={document} />&gt;</span>;
    }

    return <span>{dSchema.type}</span>
}
