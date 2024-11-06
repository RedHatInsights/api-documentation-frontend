import { APIConfiguration } from '@apidocs/common';
import { create } from 'zustand';

export const defaultAvailablePerPage: ReadonlyArray<number> = [10, 20, 50];

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

export const usePaginationStore = create<PaginationStore>()((set) => ({
  count: 0,
  perPage: 10,
  page: 1,
  availablePerPage: defaultAvailablePerPage,
  items: [],
  setPerPage: (input) => set(() => ({ perPage: input })),
  setPage: (input) => set(() => ({ page: input })),
  setAvailablePerPage: (inputArr) => set(() => ({ availablePerPage: inputArr })),
  setItems: (elements) => set(() => ({ items: elements })),
}));
