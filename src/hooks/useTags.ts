import { OpenAPIV3 } from 'openapi-types';
import { useMemo } from 'react';
import startCase from 'lodash.startcase';
import snakeCase from 'lodash.snakecase';

export interface Tag {
  id: string;
  name: string;
  description?: string;
}

export const useTags = (openapi: OpenAPIV3.Document | undefined): Array<Tag> => {
  return useMemo(() => {
    const tags: Array<Tag> = [];
    if (openapi?.tags) {
      openapi.tags.forEach((t) =>
        tags.push({
          id: t.name,
          // the idea here is to have a consistent naming here
          // FOO_BAR or fooBar, foo bar => Foo bar
          name: startCase(snakeCase(t.name).toLowerCase()),
          // Omit empty strings and write undefined instead
          description: t.description?.trim() || undefined,
        }),
      );
    }
    return tags;
  }, [openapi]);
};
