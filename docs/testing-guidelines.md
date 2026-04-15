# Testing Guidelines

Rules for writing and running tests in this repository.

## Test Framework

- **Jest** with **ts-jest** for TypeScript support
- **React Testing Library** (`@testing-library/react`) available but minimally used
- Jest config is in `package.json` under the `"jest"` key

## Running Tests

```bash
npm test                    # Runs Jest on packages/discovery
```

The `npm test` script targets the `discovery` workspace specifically. There are no frontend component tests currently.

## Discovery Tests (`packages/discovery/`)

The primary test suite validates the Discovery.yml data file:

### `Discovery.test.ts`
- Validates `Discovery.yml` against the JSON Schema using **Ajv**
- Checks for no repeated `tag.id` values
- For each API group: checks no repeated `app.id` within the group
- Validates that all tag references in apps point to existing tags
- For apps with `useLocalFile: true`, verifies the local spec file exists on disk

### `Validate.test.ts`
- Additional validation tests for the discovery data

### Patterns

- Uses `describe.each` for parameterized tests across API groups
- Uses `test.each` for per-app validation within groups
- Schema validation uses `better-ajv-errors` for readable error output
- Tests read files from disk (`readFileSync`) — they validate real data, not mocks

## Writing New Tests

- Place discovery-related tests in `packages/discovery/`
- For schema validation, use Ajv with the schema from `packages/discovery/schemas/Discovery.json`
- Keep tests data-driven: iterate over the actual Discovery.yml entries rather than hardcoding
- Use `describe.each` / `test.each` patterns consistent with existing tests
- Frontend component tests (if added) should use React Testing Library with `@testing-library/user-event`
