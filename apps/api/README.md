# api

Backend for Shelflife — a [NestJS](https://nestjs.com/) REST API serving products and their videos.

## Stack

- [NestJS 11](https://nestjs.com/) on [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/) for unit and e2e tests
- In-memory data store (see [src/common/in-memory-repository.ts](src/common/in-memory-repository.ts)) — no database yet

## Getting started

From the repo root:

```bash
pnpm dev:api
```

Or from this directory:

```bash
pnpm start:dev
```

The server listens on `http://localhost:3000` by default (override with the `PORT` env var) and has CORS enabled for the [web](../web) app at `http://localhost:5173`.

## Scripts

- `pnpm start:dev` — start with hot reload
- `pnpm build` — compile to `dist/`
- `pnpm start:prod` — run the compiled build
- `pnpm lint` — run ESLint
- `pnpm test` — unit tests
- `pnpm test:e2e` — end-to-end tests
- `pnpm test:cov` — coverage report

## Structure

```
src/
  products/   # ProductsController, ProductsService, ProductsModule
  videos/     # VideosController, VideosService, VideosModule
  common/     # Shared in-memory repository
  app.module.ts
  main.ts
```

## Endpoints

| Method | Path                  | Description                |
| ------ | --------------------- | --------------------------- |
| GET    | `/products`           | List all products           |
| GET    | `/products/:id`       | Get a single product        |
| PATCH  | `/products/:id`       | Update a product             |
| GET    | `/videos/:productId`  | List videos for a product   |
| POST   | `/videos`             | Create a video               |

Shared `Product` and `Video` types come from [@shelflife/shared](../../packages/shared).
