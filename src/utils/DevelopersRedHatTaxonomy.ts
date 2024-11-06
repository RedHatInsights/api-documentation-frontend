import { APILabel, DevRedHatTaxonomy } from '@apidocs/common';

export interface DevelopersRedHatTaxonomy {
  type: keyof DevRedHatTaxonomy;
  value: string;
}

type DictionaryKey = `${DevelopersRedHatTaxonomy['type']}:${string}`;

const addTaxonomy = (
  dictionary: Record<DictionaryKey, DevelopersRedHatTaxonomy>,
  taxonomy: DevRedHatTaxonomy,
  type: DevelopersRedHatTaxonomy['type'],
) => {
  const value = taxonomy[type];
  if (value) {
    dictionary[`product:${type}`] = {
      type,
      value,
    };
  }
};

export const fromApiLabels = (tags: ReadonlyArray<APILabel>): ReadonlyArray<DevelopersRedHatTaxonomy> => {
  const dictionary: Record<DictionaryKey, DevelopersRedHatTaxonomy> = {};
  tags
    .map((tag) => tag.devRedHatTaxonomy)
    .forEach((taxonomy) => {
      addTaxonomy(dictionary, taxonomy, 'product');
      addTaxonomy(dictionary, taxonomy, 'topic');
    });

  return Object.values(dictionary);
};
