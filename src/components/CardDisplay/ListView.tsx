import {Fragment, FunctionComponent, useState} from 'react';
import { 
  Checkbox,
  DataList, 
  DataListItem, 
  DataListItemRow, 
  DataListItemCells,
  Flex,
  FlexItem,
  Pagination,
} from '@patternfly/react-core';
import { TableComposable, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

import {Item} from '../ListItem/Item'
import {apiConfigurations, APIConfiguration, apiLabels, APILabel, APIConfigurationIcons, pages} from "@apidocs/common";
import {NoMatchFound} from "../../components/NoMatchFound/NoMatchFound";

export interface ListViewProps {
  filteredDocs: ReadonlyArray<Readonly<APIConfiguration>>;
  apiLabels?: ReadonlyArray<Readonly<APILabel>>;
  clearFilters: any;
}

const columnNames = {
  appName: 'Application name',
  description: 'Description',
  apiVersion: 'API versions',
  tags: 'Tags',
};

export const ListView: FunctionComponent<ListViewProps> = ({filteredDocs, clearFilters}) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const apiDocsCount = filteredDocs.length

  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    setPage(newPage);
  };

  const onPerPageSelect = (
    _event: React.MouseEvent | React.KeyboardEvent | MouseEvent,
    newPerPage: number,
    newPage: number
  ) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  const buildCards = (apiDocs: readonly Readonly<APIConfiguration>[]) => {
    const numberOfCards = (page - 1) * perPage + perPage - 1 >= apiDocsCount ? apiDocsCount - (page - 1) * perPage : perPage;

    return Array.apply(0, Array(numberOfCards)).map((x, i) => (
        <Fragment key={apiDocs[i].displayName}>
          <Item displayName={apiDocs[i].displayName} description={apiDocs[i].description} />
        </Fragment>
    ));
  };

  return <Fragment>
      <Pagination
        perPageComponent="button"
        itemCount={apiDocsCount}
        perPage={perPage}
        page={page}
        onSetPage={onSetPage}
        widgetId="compact-example"
        onPerPageSelect={onPerPageSelect}
        isSticky
        isCompact
      />

      <TableComposable>
        <Thead>
          <Tr>
            <Th width={15}>
              <Flex>
                <FlexItem><Checkbox id="1"/></FlexItem>
                <FlexItem>{columnNames.appName}</FlexItem>
              </Flex>
            </Th>
            <Th width={15}>{columnNames.description}</Th>
            <Th width={10}>{columnNames.apiVersion}</Th>
            <Th width={10}>{columnNames.tags}</Th>
          </Tr>
        </Thead>
      </TableComposable>

      { filteredDocs.length > 0 ?
      <DataList aria-label="List of API docs">
        <DataListItem aria-labelledby="simple-item1">
          <DataListItemRow>
            <DataListItemCells
              dataListCells={[
                <Fragment>{buildCards(filteredDocs)}</Fragment>
              ]}
            /> 
          </DataListItemRow>
        
          <Pagination
            perPageComponent="button"
            itemCount={filteredDocs.length}
            perPage={perPage}
            page={page}
            onSetPage={onSetPage}
            widgetId="top-example"
            onPerPageSelect={onPerPageSelect}
          />
        </DataListItem>
      </DataList> : <NoMatchFound clearFilters={clearFilters} /> }
    </Fragment>
};
