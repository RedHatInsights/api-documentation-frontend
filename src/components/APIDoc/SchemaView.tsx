import { TableComposable, Tbody, Thead, Td, Tr } from '@patternfly/react-table';
import { OpenAPIV3 } from 'openapi-types';


export interface SchemaViewProps {
    schemas: OpenAPIV3.SchemaObject[];
}

export const SchemaView: React.FunctionComponent<SchemaViewProps> = ({ schemas }) => {

    return (
        <>
            <TableComposable>
                <Thead>
                    <Tr>
                        <Td>Name</Td>
                        <Td>Required</Td>
                        <Td>Type</Td>
                    </Tr>
                </Thead>
                <Tbody>

                </Tbody>
            </TableComposable>
        </>
    )
}
