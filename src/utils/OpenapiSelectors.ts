/**
 * Functions to encompass the way we select information from the openapi.
 * Avoid having to repeat how to extract some specific data such as the "title with version" of the application.
 */

import { OpenAPIV3 } from 'openapi-types';

export const getTitleWithVersion = (openapi: OpenAPIV3.Document) => {
  const title = openapi.info.title;
  let version = openapi.info.version;

  if (version.match(/^d/)) {
    version = `v${version}`;
  }

  return `${title} ${version}`;
};
