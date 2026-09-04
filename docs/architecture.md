# Architecture

Overview of the API Catalog frontend architecture, monorepo structure, and build pipeline.

## System Overview

The API Catalog is a **statically exported Next.js site** that displays OpenAPI documentation for Red Hat APIs. It is served by nginx via SPAship at `developers.redhat.com/api-catalog/`.

There are no runtime API calls — all data is baked into the static build from generated TypeScript configuration. The Red Hat chrome (header/footer) is injected via nginx SSI in production.

## Monorepo Structure

```
api-documentation-frontend/
├── src/                        # Next.js application (React + PatternFly 6)
│   ├── app/                    # Next.js app router (pages + layout)
│   ├── components/             # React components
│   ├── hooks/                  # Custom React hooks
│   ├── store/                  # Zustand state stores
│   └── utils/                  # Utility functions
├── packages/
│   ├── common/                 # Shared types + generated API config
│   │   ├── config/             # ⚠ GENERATED — do not edit
│   │   ├── types.ts            # Shared TypeScript interfaces
│   │   └── index.ts            # Package entry point (re-exports)
│   ├── discovery/              # Source of truth for API definitions
│   │   ├── Discovery.yml       # API catalog data file
│   │   ├── schemas/            # JSON schemas for validation
│   │   └── resources/          # Local API specs + markdown content
│   ├── transform/              # CLI: Discovery.yml → TypeScript config
│   └── sitemap/                # CLI: sitemap.xml + canonical.json
└── .storybook/                 # Storybook configuration
```

## Data Pipeline

```
Discovery.yml ──→ transform CLI ──→ packages/common/config/ ──→ Next.js build ──→ static HTML
     │                                    (generated)                                  │
     │                                                                                 │
  validated by                                                                   served by
  Vitest + Ajv                                                                  nginx + SSI
```

1. APIs are defined in `packages/discovery/Discovery.yml`
2. `npm run discovery` runs the transform pipeline, generating TypeScript in `packages/common/config/`
3. The Next.js app imports generated config via `@apidocs/common`
4. `next build` with `output: 'export'` produces static HTML in `out/`
5. nginx serves static files with SSI includes for the Red Hat chrome

## Component Architecture

### Pages

- **Landing page** (`src/app/page.tsx`) — Grid/list view of all APIs with search, tag filtering, and pagination
- **API detail page** (`src/app/api/[slug]/page.tsx`) — OpenAPI spec viewer with sidebar navigation, code samples, and schema explorer

### State Management

Zustand stores with Immer for immutable updates:

- `useLandingConfigStore` — search query, active tag filters, view mode (grid/list)
- `usePaginationStore` — current page, items per page

### Key Component Groups

| Group | Purpose |
|-------|---------|
| `APIDoc/` | API detail page: spec rendering, code samples, schemas, parameters |
| `Card/` | API card for the landing page grid view |
| `Tags/` | Tag labels and filter chips |
| `SideBar/` | API detail page navigation sidebar |
| `DocumentContent/` | Markdown content renderer (getting started guides) |

## Deployment

```
git push → Konflux/Tekton pipeline → container image → SPAship → developers.redhat.com/api-catalog/
```

- **Konflux/Tekton** (`.tekton/`) builds the container image on PR and push
- **GitLab CI** (`.gitlab-ci.yml`) handles deployment to stage/QA/dev/prod
- **SPAship** deploys to `developers.redhat.com/api-catalog/`
- The `basePath` is `/api-catalog` in production, empty in dev mode
