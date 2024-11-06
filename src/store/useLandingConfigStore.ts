import { produce } from 'immer';
import { create } from 'zustand';

export interface LandingConfigStore {
  searchInput: string;
  selectedTags: ReadonlyArray<string>;
  view: string;
  setSearchInput: (input: string) => void;
  setSelectedTags: (tagsArray: ReadonlyArray<string>) => void;
  updateSingleTag: (tagId: string, isChecked: boolean) => void;
  setView: (newView: string) => void;
}

export const useLandingConfigStore = create<LandingConfigStore>()((set) => ({
  searchInput: '',
  selectedTags: [],
  view: 'grid',
  setSearchInput: (input) => set(() => ({ searchInput: input })),
  setSelectedTags: (tagsArray) => set(() => ({ selectedTags: tagsArray })),
  updateSingleTag: (tagId, isChecked) =>
    set(
      produce((draft) => {
        const index = draft.selectedTags.indexOf(tagId);
        if (index === -1 && isChecked) {
          draft.selectedTags.push(tagId);
        } else if (index !== -1 && !isChecked) {
          draft.selectedTags.splice(index, 1);
        }
      }),
    ),
  setView: (newView) => set(() => ({ view: newView })),
}));
