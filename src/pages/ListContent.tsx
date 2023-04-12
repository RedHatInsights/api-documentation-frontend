import {FunctionComponent} from 'react';
import {Flex, FlexItem} from "@patternfly/react-core";
import { TableComposable, Thead, Tr, Th, Tbody} from '@patternfly/react-table';
import { APIConfiguration } from '@apidocs/common';
import {NoMatchFound} from "../components/NoMatchFound/NoMatchFound";
import {ListView} from './ListView';

interface ListContentProps {
    items: ReadonlyArray<APIConfiguration>;
    clearFilters: () => void;
}

export const ListContent: FunctionComponent<ListContentProps> = ({items, clearFilters}) => {
  const columnNames = {
      name: 'Application name',
      description: 'Description',
      apiVersion: 'API version',
      tags: 'Tags',
    };

  return (
    <TableComposable aria-label="Misc table">
      <Thead noWrap>
        <Tr>
          <Th>
            <Flex>
              <FlexItem>
                {columnNames.name}
              </FlexItem>
            </Flex>
          </Th>
          <Th>{columnNames.description}</Th>
          <Th>{columnNames.tags}</Th>
        </Tr>
      </Thead>
      <Tbody>
      { items.length > 0 ?
          <ListView
            elements={items}
          /> : <NoMatchFound clearFilters={clearFilters} /> }
      </Tbody>
    </TableComposable>
  );
}
