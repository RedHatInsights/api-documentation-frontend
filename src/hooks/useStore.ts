import { create } from 'zustand'
import { APIConfiguration } from '../../packages/common/types';


export interface LandingConfigStore {
  searchInput: string;
  selectedTags: ReadonlyArray<string>;
  view: string;
  updateInput: (input: string) => void;
  updateSelectedTags: (tagsArray: ReadonlyArray<string>) => void;
  updateView: (newView: string) => void;
}

export const useLandingConfigStore = create<LandingConfigStore>()(
  (set) => ({
    searchInput: '',
    selectedTags: [],
    view: 'grid',
    paginatedState: {count: 0, perPage: 10, page: 1},
    updateInput: (input) => set((state) => ({ searchInput: input })),
    updateSelectedTags: (tagsArray) => set((state) => ({ selectedTags: tagsArray })),
    updateView: (newView) => set((state) => ({ view: newView })),
  })
)

export const defaultAvailablePerPage: ReadonlyArray<number> = [
  10,
  20,
  50
];

export interface PaginationStore {
  count: number;
  perPage: number;
  page: number;
  availablePerPage: ReadonlyArray<number>;
  items: ReadonlyArray<APIConfiguration>;
  setPerPage: (input: number) => void;
  setPage: (input: number) => void;
  setAvailablePerPage: (inputArr: ReadonlyArray<number>) => void;
  setItems: (elements: ReadonlyArray<APIConfiguration>) => void;
}

export const usePaginationStore = create<PaginationStore>()(
  (set) => ({
    count: 0,
    perPage: 10,
    page: 1,
    availablePerPage: defaultAvailablePerPage,
    items: [],
    setPerPage: (input) => set((state) => ({ perPage: input })),
    setPage: (input) => set((state) => ({ page: input })),
    setAvailablePerPage: (inputArr) => set((state) => ({ availablePerPage: inputArr })),
    setItems: (elements) => set((state) => ({ items: elements })),
  })
)
