# Testing Guidelines

Rules for writing and running tests in this repository.

## Testing Strategy

This repo uses a layered testing approach:

| Layer | Tool | Scope | When to use |
|-------|------|-------|-------------|
| **Data validation** | Vitest | `packages/discovery/` | Validate Discovery.yml against schemas |
| **Component testing** | Storybook + play functions | `src/components/` | Verify UI behavior and interactions |

## Data Validation Tests (Vitest)

### Running

```bash
npm test                    # Runs Vitest on packages/discovery
```

### Discovery Tests (`packages/discovery/`)

**`Discovery.test.ts`**
- Validates `Discovery.yml` against the JSON Schema using **Ajv**
- Checks for no repeated `tag.id` values
- For each API group: checks no repeated `app.id` within the group
- Validates that all tag references in apps point to existing tags
- For apps with `useLocalFile: true`, verifies the local spec file exists on disk

**`Validate.test.ts`**
- Additional validation tests for the discovery data

### Patterns

- Uses `describe.each` for parameterized tests across API groups
- Uses `test.each` for per-app validation within groups
- Schema validation uses `better-ajv-errors` for readable error output
- Tests read files from disk (`readFileSync`) — they validate real data, not mocks
- Import `describe`, `test`, `expect` from `vitest`

### Writing New Data Tests

- Place discovery-related tests in `packages/discovery/`
- For schema validation, use Ajv with the schema from `packages/discovery/schemas/Discovery.json`
- Keep tests data-driven: iterate over the actual Discovery.yml entries rather than hardcoding
- Use `describe.each` / `test.each` patterns consistent with existing tests
- Import test functions explicitly: `import { describe, test, expect } from 'vitest'`

## Component Tests (Storybook)

### Running

```bash
npm run storybook           # Dev server on port 6006
npm run build-storybook     # Build for CI
npm run test-storybook      # Run interaction tests via Vitest browser mode
```

### Writing Stories

Stories live alongside their components: `ComponentName.stories.tsx` next to `ComponentName.tsx`.

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within, userEvent } from 'storybook/test';
import { MyComponent } from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: { /* props */ },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Expected text')).toBeVisible();
  },
};
```

### Rules

- Every story must have a `play` function that verifies behavior
- No snapshots (`toMatchSnapshot` / `toMatchInlineSnapshot` are banned)
- Use `within(canvasElement)` and role-based queries, not `querySelector`
- Use `userEvent` from `storybook/test` for interactions
- Use `fn()` from `storybook/test` for callback verification
- Import handler factories from `mocks/` if mocking is needed — no inline MSW handlers

