import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useDebounce, useWindowSize} from "react-use";
import {useGetHtmlElementById} from "../../hooks/useGetHtmlElementById";

interface PerPageOptions {
    setPage: Dispatch<SetStateAction<number>>,
    setPerPage: Dispatch<SetStateAction<number>>,
    perPage: number,
    setAvailablePerPage: (availablePerPage?: ReadonlyArray<number>) => void,
    defaultAvailablePerPage: ReadonlyArray<number>
}

export const usePaginatedGallery = (
    cardContainerId: string,
    usingGallery: boolean,
    {setPage, setPerPage, perPage, setAvailablePerPage, defaultAvailablePerPage}: PerPageOptions
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

    // Updates the available elements if the elements per row is different
    useEffect(() => {
        if (elementsPerRow) {
            const availablePerPage = defaultAvailablePerPage.map(size => {
                return Math.ceil(size / elementsPerRow) * elementsPerRow;
            });

            setAvailablePerPage(availablePerPage);
            setPerPage(prev => {
                if (availablePerPage.includes(prev)) {
                    return prev;
                }

                return availablePerPage[0];
            });
        }
    }, [elementsPerRow, setAvailablePerPage, setPerPage, defaultAvailablePerPage]);

    // Updates current page
    useEffect(() => {
        if (usingGallery && gallery && gallery.children.length > 0) {
            const lastPage = Math.floor(gallery.childElementCount / (perPage)) + 1;
            setPage(prev => Math.min(prev, lastPage));
        }
    }, [perPage, setPage, gallery, usingGallery]);
};
