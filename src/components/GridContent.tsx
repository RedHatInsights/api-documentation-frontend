import { APIConfiguration } from '@apidocs/common';
import { Fragment, FunctionComponent } from 'react';
import { NoMatchFound } from '@/components/NoMatchFound/NoMatchFound';
import { GalleryTemplate } from './GalleryTemplate';

interface GridContentProps {
  galleryId: string;
  allItems: Readonly<APIConfiguration>[];
  items: ReadonlyArray<APIConfiguration>;
  clearFilters: () => void;
}

export const GridContent: FunctionComponent<GridContentProps> = ({ galleryId, allItems, items, clearFilters }) => {
  return (
    <Fragment>
      <GalleryTemplate id={galleryId} elements={allItems} isHidden />
      {items.length > 0 ? <GalleryTemplate elements={items} /> : <NoMatchFound clearFilters={clearFilters} />}
    </Fragment>
  );
};
