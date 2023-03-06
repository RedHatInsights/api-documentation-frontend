import {Fragment, FunctionComponent, useState} from 'react';
import { 
  DataList, 
  DataListItem, 
  DataListItemRow, 
  DataListItemCells, 
  Gallery, 
  GalleryItem, 
  Pagination, 
} from '@patternfly/react-core';

import {Item} from "../../components/Item/Item";

import {APIConfiguration, APILabel} from "../../config/apis";
import {NoMatchFound} from "../../components/NoMatchFound/NoMatchFound";

export interface ListViewProps {
  apiDocs: ReadonlyArray<Readonly<APIConfiguration>>;
  apiLabels?: ReadonlyArray<Readonly<APILabel>>;
  clear: any;
}

export const ListView: FunctionComponent<ListViewProps> = ({apiDocs, clear}) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

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

  const buildCards = (apiConfig: readonly Readonly<APIConfiguration>[]) => {
    const numberOfCards = (page - 1) * perPage + perPage - 1 >= apiDocs.length ? apiDocs.length - (page - 1) * perPage : perPage;

    return Array.apply(0, Array(numberOfCards)).map((x, i) => (
      apiConfig.map(apiConfig => (
        <GalleryItem key={i}>
          <Item displayName={apiConfig.displayName} description={apiConfig.description} />
        </GalleryItem>
            ))
    ));
  };

  return <Fragment>
      <Pagination
        perPageComponent="button"
        itemCount={apiDocs.length}
        perPage={perPage}
        page={page}
        onSetPage={onSetPage}
        widgetId="compact-example"
        onPerPageSelect={onPerPageSelect}
        isSticky
        isCompact
      />

      { apiDocs.length > 0 ?
      <DataList aria-label="List of API docs">
          <DataListItem aria-labelledby="simple-item1">
            <DataListItemRow>
              <DataListItemCells
                dataListCells={[
                  <Gallery minWidths={{default: '1000px'}}  hasGutter>{buildCards(apiDocs)}</Gallery>
                ]}
              /> 
            </DataListItemRow>
        </DataListItem>
      </DataList> : <NoMatchFound clearFilters={clear} /> }

      <Pagination
        perPageComponent="button"
        itemCount={apiDocs.length}
        perPage={perPage}
        page={page}
        onSetPage={onSetPage}
        widgetId="top-example"
        onPerPageSelect={onPerPageSelect}
      />
    </Fragment>
};
