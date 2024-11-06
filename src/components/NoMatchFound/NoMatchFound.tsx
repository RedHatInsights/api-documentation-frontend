import { FunctionComponent } from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateHeader, EmptyStateFooter } from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';

interface NoMatchFoundProps {
  clearFilters: () => void;
}

export const NoMatchFound: FunctionComponent<NoMatchFoundProps> = ({ clearFilters }) => (
  <EmptyState>
    <EmptyStateHeader titleText="No results found" icon={<EmptyStateIcon icon={SearchIcon} />} headingLevel="h4" />
    <EmptyStateBody>No results match the filter criteria. Clear all filters and try again.</EmptyStateBody>
    <EmptyStateFooter>
      <Button onClick={clearFilters} variant="link">
        Clear all filters
      </Button>
    </EmptyStateFooter>
  </EmptyState>
);
