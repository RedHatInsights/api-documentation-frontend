import { APIConfiguration } from '@apidocs/common';
import {Fragment, FunctionComponent} from 'react';
import { PaginationInfo } from '../components/Card/usePaginatedGallery';
import {NoMatchFound} from "../components/NoMatchFound/NoMatchFound";
import {GalleryTemplate} from "./GalleryTemplate";

interface GridContentProps {
    galleryId: string;
    filteredDocs: Readonly<APIConfiguration>[];
    paginatedGalleryInfo: PaginationInfo<Readonly<APIConfiguration>>;
    clearFilters: () => void;
}

export const GridContent: FunctionComponent<GridContentProps> = ({galleryId, filteredDocs, paginatedGalleryInfo, clearFilters}) => {
    return <Fragment>
        <GalleryTemplate
        id={galleryId}
        elements={filteredDocs}
        isHidden
        />
        { paginatedGalleryInfo.paginatedElements.length > 0 ?
        <GalleryTemplate
            elements={paginatedGalleryInfo.paginatedElements}
        /> : <NoMatchFound clearFilters={clearFilters} /> }
    </Fragment>
}