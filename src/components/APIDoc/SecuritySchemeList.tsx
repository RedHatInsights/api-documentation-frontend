import React from 'react';
import {OpenAPIV3} from "openapi-types";
import {Text, TextContent, TextList, TextListItem, TextVariants} from "@patternfly/react-core";
import {SecurityScheme} from "./SecurityScheme";

export interface SecuritySchemeListProps {
    schemes: Array<OpenAPIV3.SecuritySchemeObject>;
}

export const SecuritySchemeList: React.FunctionComponent<SecuritySchemeListProps> = ({schemes}) =>
    <TextContent>
        <Text component={TextVariants.h2}>Authentication</Text>
        <TextList isPlain>
            {schemes.map((s, index) => <TextListItem key={index}>
                <SecurityScheme key={index} securityScheme={s} />
            </TextListItem>)}
        </TextList>
    </TextContent>;
