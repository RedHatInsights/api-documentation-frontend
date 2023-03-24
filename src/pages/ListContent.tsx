import {Fragment, FunctionComponent} from 'react';
import {Flex, FlexItem} from "@patternfly/react-core";
import { TableComposable, Thead, Tr, Th, Tbody} from '@patternfly/react-table';
import { APIConfiguration } from '@apidocs/common';
import { PaginationInfo } from '../components/Card/usePaginatedGallery';
import {NoMatchFound} from "../components/NoMatchFound/NoMatchFound";
import {ListView} from './ListView';

interface ListContentProps {
    galleryId: string;
    filteredDocs: Readonly<APIConfiguration>[];
    paginatedGalleryInfo: PaginationInfo<Readonly<APIConfiguration>>;
    clearFilters: () => void;
}

export const ListContent: FunctionComponent<ListContentProps> = ({galleryId, filteredDocs, paginatedGalleryInfo, clearFilters}) => {
    const columnNames = {
        name: 'Application name',
        description: 'Description',
        apiVersion: 'API version',
        tags: 'Tags',
      };

    return <Fragment>
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
    { paginatedGalleryInfo.paginatedElements.length > 0 ?
          <ListView
              id={galleryId}
              elements={paginatedGalleryInfo.paginatedElements}
          /> : <NoMatchFound clearFilters={clearFilters} /> }
    </Tbody>
    </TableComposable>
  </Fragment>
}