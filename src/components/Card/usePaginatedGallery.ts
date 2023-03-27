import {useCallback, useEffect, useState} from "react";
import {useDebounce, useWindowSize} from "react-use";
import {useGetHtmlElementById} from "../../hooks/useGetHtmlElementById";

interface PaginatedGalleryState {
    count: number;
    perPage: number;
    page: number;
}

export interface PaginationInfo<T> extends PaginatedGalleryState{
    paginatedElements: ReadonlyArray<T>;
    onSetPage: (page: number) => void;
    height: number | undefined;
}

const ROWS_PER_PAGE = 3;

export const usePaginatedGallery = <T>(cardContainerId: string, elements: ReadonlyArray<T>): PaginationInfo<T> => {
    const { width: windowSizeWidth, height: windowSizeHeight } = useWindowSize();
    const [debouncedSize, setDebouncedSize] = useState<[number, number]>([windowSizeWidth , windowSizeHeight]);
    const [height, setHeight] = useState<number>();

    useDebounce(() => {
        setDebouncedSize([windowSizeWidth, windowSizeHeight]);
    }, 500, [windowSizeWidth, windowSizeHeight]);

    const [paging, setPaging] = useState<PaginatedGalleryState>({
        count: elements.length,
        perPage: elements.length,
        page: 1
    });

    const [paginatedElements, setPaginatedElements] = useState<ReadonlyArray<T>>([]);
    const gallery = useGetHtmlElementById(cardContainerId);

    useEffect(() => {
        if (gallery && gallery.children.length > 0) {
            gallery.style.display = 'grid';
            const first = gallery.children.item(0)!;
            const children = [...gallery.children];
            const elementsPerRow = children.filter(c => 'offsetTop' in first && 'offsetTop' in c && first.offsetTop === c.offsetTop).length;

            // Take pages of ROWS_PER_PAGE * elementsPerRow and determine their max height.
            const perPage = ROWS_PER_PAGE * elementsPerRow;
            const lastPage = Math.floor(elements.length / (ROWS_PER_PAGE * elementsPerRow)) + 1;
            let height = 0;
            for (let i = 0; i < lastPage; ++i) {
                const first = children[Math.min(i * perPage, children.length - 1)] as HTMLElement;
                const last = children[Math.min(i*perPage + perPage - 1, children.length - 1)]  as HTMLElement;
                height = Math.max(height, last.offsetTop - first.offsetTop + last.offsetHeight);
            }

            const galleryStyle = getComputedStyle(gallery);

            height += parseInt(galleryStyle.marginTop);
            height += parseInt(galleryStyle.paddingTop);
            height += parseInt(galleryStyle.paddingBottom);
            height += parseInt(galleryStyle.marginBottom);

            gallery.style.display = 'none';

            setHeight(height);
            setPaging(prev => ({
                count: elements.length,
                perPage,
                page: Math.min(prev.page, lastPage)
            }));
        }
    }, [debouncedSize, elements.length, gallery]);

    useEffect(() => {
        setPaginatedElements(elements.slice((paging.page - 1) * paging.perPage, paging.page * paging.perPage));
    }, [paging, elements]);

    const onSetPage = useCallback((page: number) => {
        setPaging(prev => ({...prev, page}));
    }, [setPaging]);

    return {
        ...paging,
        paginatedElements,
        onSetPage,
        height
    };
};
