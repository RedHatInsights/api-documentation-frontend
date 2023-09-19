import {GroupedOperations} from "../hooks/useGroupedOperations";
import {Operation} from "../Operation";
import {StackItem, Text, TextContent, TextVariants} from "@patternfly/react-core";
import {OpenAPIV3} from "openapi-types";
import {Operations} from "../Operations";
import {getOperationGroupId, getUngroupedOperationsId} from "../../../utils/OpenapiHtmlIds";

interface GroupedOperationsProps {
    groupedOperations: GroupedOperations;
    openapi: OpenAPIV3.Document;
}

const mapToOperation = (operationId: string, operations: GroupedOperations['operations'], openapi: OpenAPIV3.Document) => {
    const operation = operations[operationId];
    return <Operation
        key={operation.id}
        verb={operation.verb}
        baseUrl={operation.baseUrl}
        path={operation.path}
        operation={operation.rawOperation}
        document={openapi}
    />;
}

export const renderGroupOperations = ({groupedOperations, openapi}: GroupedOperationsProps) => {
    const result = [
        ...(groupedOperations.groups.map(group => <StackItem key={`group-${group.id}`} id={getOperationGroupId(group.id)}>
            <TextContent className="pf-u-pb-lg">
                <Text component={TextVariants.h3}>
                    { group.description || group.name }
                </Text>
            </TextContent>
            <Operations>{group
                .operationIds
                .map(id => mapToOperation(id, groupedOperations.operations, openapi))}
            </Operations>
            <br />
        </StackItem>))
    ];

    if (groupedOperations.others.length > 0) {
        const title = result.length > 0 ? 'Other operations' : undefined;
        result.push(<StackItem key={`other-operations`} id={getUngroupedOperationsId()}>
            { title && <TextContent className="pf-u-pb-lg">
                <Text component={TextVariants.h3}>
                    {title}
                </Text>
            </TextContent> }
            <Operations>{groupedOperations
                .others
                .map(id => mapToOperation(id, groupedOperations.operations, openapi))}</Operations>
        </StackItem>);
    }

    return result;
}
