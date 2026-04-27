# API Contracts Guidelines

Rules for working with the Discovery pipeline, API definitions, and the data model that powers the API Catalog.

## Discovery File (`packages/discovery/Discovery.yml`)

- The Discovery file is the **single source of truth** for all APIs displayed in the catalog
- It follows a JSON Schema defined at `packages/discovery/schemas/Discovery.json` — validate changes against it
- CI uses this file to generate API content; manual edits to generated files in `packages/common/config/` will be overwritten

### Structure

```yaml
apis:          # Array of API groups (organizational only, no display impact)
  - id: string        # Unique group identifier (kebab-case)
    name: string      # Human-readable group name
    apps:             # Array of API applications within this group
      - id: string          # Unique app identifier within the group
        name: string        # Display name
        description: string # Short description
        url: string         # URL pointing to the OpenAPI spec
        apiType: string     # Format: "openapi-v3" is the only fully supported type
        icon: string        # One of the predefined icon identifiers
        tags: [string]      # References to tag IDs defined in the top-level tags array
tags:          # Array of available tag definitions
  - id: string
    displayName: string
    type: string
```

### Rules

- `id` fields must be unique: no repeated `tag.id` globally, no repeated `app.id` within a group
- Tags referenced by apps must exist in the top-level `tags` array
- Prefer `apiType: openapi-v3` — other types are skipped in processing
- Apps with `useLocalFile: true` must have a corresponding spec file at `packages/discovery/resources/api/{groupId}/{appId}/openapi.json`
- Apps can be temporarily excluded with `skip: true` and `skipReason: "reason"`

### Adding External Content

Markdown content sections go in `packages/discovery/resources/content/{groupId}/{appId}/`:
- `getting-started.md` — rendered as a "Getting Started" section on the API detail page
- Content is picked up during the discovery process and embedded in the static build

## Discovery Pipeline

The pipeline transforms `Discovery.yml` into TypeScript configuration:

1. `npm run discovery:build` — builds the `common` and `transform` packages
2. `npm run discovery:start` — runs the transform, reading from `packages/discovery/` and writing to `packages/common/config/`
3. The generated TypeScript in `packages/common/config/` is imported by the Next.js app

Run the full pipeline with `npm run discovery`. To skip fetching remote API specs: `npm run discovery:build && npm run discovery:start -- --skip-api-fetch`.

## Sitemap Generation

- `npm run sitemap` generates `public/canonical.json` (for Search Platform indexing) and `public/sitemap.xml`
- Requires `SITEMAP_BASE_URL` environment variable
- In CI/Dockerfile, uses Hydra secrets for authenticated API indexing

## Package Responsibilities

| Package | Purpose | Build tool |
|---------|---------|------------|
| `packages/common` | Shared types + generated API config | TypeScript |
| `packages/discovery` | Discovery.yml + schemas + tests | TypeScript |
| `packages/transform` | CLI: Discovery.yml → TypeScript config | Rollup |
| `packages/sitemap` | CLI: generates sitemap.xml + canonical.json | Rollup |
