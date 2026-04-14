# AI Agent Guidelines

Onboarding guide for AI agents working in the `api-documentation-frontend` repository.

## Project Overview

This is the **API Catalog** frontend at `https://developers.redhat.com/api-catalog/`. It displays OpenAPI documentation for Red Hat APIs. The app is a **statically exported Next.js site** served by nginx via SPAship.

The repo is a **monorepo** with npm workspaces:

| Directory | Purpose |
|-----------|---------|
| `src/` | Next.js application (React + PatternFly 5) |
| `packages/common/` | Shared types and generated API configuration |
| `packages/discovery/` | Discovery.yml data file, JSON schemas, and validation tests |
| `packages/transform/` | CLI tool that converts Discovery.yml into TypeScript config |
| `packages/sitemap/` | CLI tool that generates sitemap.xml and canonical.json |

## Domain-Specific Guidelines

Detailed rules for specific domains are in the `docs/` directory:

- [API Contracts Guidelines](docs/api-contracts-guidelines.md) — Discovery pipeline, API definitions, data model
- [Testing Guidelines](docs/testing-guidelines.md) — Test framework, patterns, and conventions

## Architecture

### Data Flow

```
Discovery.yml → transform CLI → packages/common/config/ → Next.js app → static HTML (via `next export`)
```

1. APIs are defined in `packages/discovery/Discovery.yml`
2. `npm run discovery` runs the transform pipeline
3. Generated TypeScript is consumed by the Next.js app at build time
4. `next build` with `output: 'export'` produces static HTML
5. Static files are served by nginx in production

### State Management

- **Zustand** for client-side state (`src/store/`)
- `useLandingConfigStore` — search input, tag filters, view mode (grid/list)
- `usePaginationStore` — pagination state
- Uses **Immer** for immutable state updates within Zustand

### Key Libraries

| Library | Usage |
|---------|-------|
| Next.js 15 | Framework (static export mode) |
| React 18 | UI library |
| PatternFly 5 | Component library (PF5, not PF6) |
| Zustand | State management |
| Monaco Editor | Code/spec editor in API detail pages |
| react-markdown | Rendering markdown content sections |
| httpsnippet-lite | Generating code snippets for API endpoints |
| Ajv | JSON Schema validation (in tests and transform) |

## Conventions

### File Organization

- React components go in `src/components/` — each component or component group gets its own directory
- Custom hooks go in `src/hooks/`
- Zustand stores go in `src/store/`
- Utility functions go in `src/utils/`
- The `@/` path alias maps to `src/`

### Component Patterns

- All page components use `'use client'` directive (client-side rendering)
- PatternFly 5 components are imported from `@patternfly/react-core`
- PatternFly icons from `@patternfly/react-icons/dist/js/icons/` or `dist/esm/icons/`
- CSS utility classes use `pf-v5-u-*` prefix (PatternFly 5)
- Custom styles use `apid-` prefix (e.g., `apid-c-page-landingpage`)

### TypeScript

- Strict mode enabled
- Target ES2017
- Module resolution: Node
- Path alias: `@/*` → `./src/*`
- Types for workspace packages: import from `@apidocs/common`

### Code Style

- **Prettier** for formatting (config in `prettier.config.js`)
- **ESLint** with TypeScript, React, and Prettier plugins
- `react/react-in-jsx-scope` is disabled (Next.js handles React imports)
- Run `npm run lint` to check, `npm run prettier` to format `.tsx` files

### Discovery Data Changes

When modifying `packages/discovery/Discovery.yml`:
1. Follow the JSON schema at `packages/discovery/schemas/Discovery.json`
2. Run `npm test` to validate the file
3. Run `npm run discovery` to regenerate TypeScript config
4. Do NOT manually edit files in `packages/common/config/` — they are generated

## Deployment

- **SPAship** deploys to `developers.redhat.com/api-catalog/`
- Static build output goes to `out/` directory
- Nginx serves the static files with SSI includes for Red Hat chrome (header/footer)
- The `basePath` is `/api-catalog` in production, empty in dev mode
- Dev mode runs a local proxy (`proxy.mjs`) for developers.redhat.com assets

## Common Pitfalls

- The `packages/common/config/` directory contains **generated files** — never edit directly
- PatternFly is version **5** in this repo, not version 6 — use `pf-v5-u-*` utility classes
- `npm test` only runs discovery tests — there are no frontend component tests
- The `next.config.ts` uses `output: 'export'` — features requiring a Node.js server (API routes, ISR, middleware) are not available
- Header and footer are loaded via SSI in production but fetched client-side in dev mode
