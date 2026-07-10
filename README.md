# shelflife

A monorepo for managing products and their promotional videos.

## Apps and packages

- [apps/web](apps/web) — React + Vite frontend
- [apps/api](apps/api) — NestJS REST API
- [packages/shared](packages/shared) — Shared TypeScript types (`Product`, `Video`) used by both apps
- [packages/widget](packages/widget) — Embeddable widget script

## Getting started

Install dependencies from the repo root:

```bash
pnpm install
```

Run both the API and web app together:

```bash
pnpm dev
```

Or run them individually:

```bash
pnpm dev:api   # NestJS API on http://localhost:3000
pnpm dev:web   # Vite dev server on http://localhost:5173
```

See each app's README for more details:

- [apps/web/README.md](apps/web/README.md)
- [apps/api/README.md](apps/api/README.md)

## Tooling

- [pnpm workspaces](pnpm-workspace.yaml) manage the `apps/*` and `packages/*` packages
- TypeScript project references are configured in the root [tsconfig.json](tsconfig.json)
