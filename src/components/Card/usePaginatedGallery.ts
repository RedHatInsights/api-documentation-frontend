import { APIConfiguration } from "@apidocs/common";
import { useEffect, useState} from "react";
import {useDebounce, useWindowSize} from "react-use";
import {useGetHtmlElementById} from "../../hooks/useGetHtmlElementById";

interface PerPageOptions {
    setPage:(page: number) => void,
    setPerPage: (perPage: number) => void,
    page: number,
    perPage: number,
    setAvailablePerPage: (availablePerPage: ReadonlyArray<number>) => void,
    defaultAvailablePerPage: ReadonlyArray<number>,
    elements: ReadonlyArray<APIConfiguration>,
    setItems: (elements: ReadonlyArray<APIConfiguration>) => void,
}

export const usePaginatedGallery = (
    cardContainerId: string,
    usingGallery: boolean,
    {setPage, setPerPage, page, perPage, setAvailablePerPage, defaultAvailablePerPage, elements, setItems}: PerPageOptions
): void => {
    const { width: windowSizeWidth, height: windowSizeHeight } = useWindowSize();
    const [debouncedSize, setDebouncedSize] = useState<[number, number]>([windowSizeWidth , windowSizeHeight]);
    const [elementsPerRow, setElementsPerRow] = useState<number>();

    useDebounce(() => {
        setDebouncedSize([windowSizeWidth, windowSizeHeight]);
    }, 50, [windowSizeWidth, windowSizeHeight]);

    const gallery = useGetHtmlElementById(cardContainerId);

    useEffect(() => {
        if (usingGallery && gallery && gallery.children.length > 0) {
            gallery.style.display = 'grid';
            const first = gallery.children.item(0)!;
            const children = [...gallery.children];
            const elementsPerRow = children.filter(c => 'offsetTop' in first && 'offsetTop' in c && first.offsetTop === c.offsetTop).length;
            setElementsPerRow(elementsPerRow);
        } else {
            setElementsPerRow(undefined);
        }
    }, [debouncedSize, gallery, usingGallery]);

    useEffect(() => {
        setItems(elements.slice((page - 1) * perPage, page * perPage));
      }, [page, perPage, elements]);

    // Updates the available elements if the elements per row is different
    useEffect(() => {
        if (elementsPerRow) {
            const availablePerPage = defaultAvailablePerPage.map(size => {
                return Math.ceil(size / elementsPerRow) * elementsPerRow;
            });

            setAvailablePerPage(availablePerPage);
            setPerPage(availablePerPage.includes(perPage) ? perPage : availablePerPage[0])
        }
    }, [elementsPerRow, setAvailablePerPage, setPerPage, defaultAvailablePerPage]);

    // Updates current page
    useEffect(() => {
        if (usingGallery && gallery && gallery.children.length > 0) {
            const lastPage = Math.floor(gallery.childElementCount / (perPage)) + 1;
            setPage(Math.min(page, lastPage));
        }
    }, [perPage, setPage, gallery, usingGallery]);
};
