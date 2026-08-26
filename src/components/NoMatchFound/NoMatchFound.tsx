import { FunctionComponent } from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateFooter } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';

interface NoMatchFoundProps {
  clearFilters: () => void;
}

export const NoMatchFound: FunctionComponent<NoMatchFoundProps> = ({ clearFilters }) => (
  <EmptyState headingLevel="h4" icon={SearchIcon} titleText="No results found">
    <EmptyStateBody>No results match the filter criteria. Clear all filters and try again.</EmptyStateBody>
    <EmptyStateFooter>
      <Button onClick={clearFilters} variant="link">
        Clear all filters
      </Button>
    </EmptyStateFooter>
  </EmptyState>
);
