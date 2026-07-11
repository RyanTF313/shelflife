# api

Backend for Shelflife — a [NestJS](https://nestjs.com/) REST API serving products, videos, and analytics.

## Stack

- [NestJS 11](https://nestjs.com/) on [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/) + SQLite for persistence
- [Passport](http://www.passportjs.org/) + JWT for auth
- [Jest](https://jestjs.io/) for e2e tests

## Getting started

From this directory, copy the env file and set up the database:

```bash
cp .env.example .env
pnpm prisma:migrate   # creates dev.db and applies migrations (seeds automatically)
```

Then, from the repo root:

```bash
pnpm dev:api
```

Or from this directory:

```bash
pnpm start:dev
```

The server listens on `http://localhost:3000` by default (override with the `PORT` env var) and has CORS enabled for the [web](../web) app (`CORS_ORIGIN` env var, defaults to `http://localhost:5173`).

A demo user (`demo@shelflife.dev` / `password123`) is created by the seed script for testing `/auth/login`.

## Scripts

- `pnpm start:dev` — start with hot reload
- `pnpm build` — compile to `dist/`
- `pnpm start:prod` — run the compiled build
- `pnpm lint` — run ESLint
- `pnpm test:e2e` — end-to-end tests
- `pnpm test:cov` — coverage report
- `pnpm prisma:generate` — regenerate the Prisma client
- `pnpm prisma:migrate` — create/apply a migration against `src/prisma/schema.prisma`

## Structure

```
src/
  common/           # Cross-cutting building blocks
    dto/            # Shared DTOs (e.g. pagination)
    filters/        # Global exception filter
    interceptors/   # Logging, request timeout
  modules/
    products/       # ProductsController, ProductsService, ProductsModule
    videos/         # VideosController, VideosService, VideosModule
    analytics/      # View/click tracking + per-product summaries
    auth/           # JWT auth: register/login, strategy, guard
  prisma/           # schema.prisma, migrations, PrismaService/PrismaModule, seed
  config/           # Typed, validated env config (ConfigModule)
  app.module.ts
  main.ts
```

## Endpoints

| Method | Path                                 | Description                          |
| ------ | ------------------------------------ | ------------------------------------- |
| GET    | `/products`                          | List products (`?skip=&take=`)        |
| GET    | `/products/:id`                      | Get a single product                  |
| PATCH  | `/products/:id`                      | Update a product                      |
| GET    | `/videos/:productId`                 | List videos for a product             |
| POST   | `/videos`                            | Create a video                        |
| POST   | `/analytics/videos/:videoId/views`   | Increment a video's view count        |
| POST   | `/analytics/videos/:videoId/clicks`  | Increment a video's click count       |
| GET    | `/analytics/products/:productId`     | Aggregate views/clicks for a product  |
| POST   | `/auth/register`                     | Create a user, returns a JWT          |
| POST   | `/auth/login`                        | Authenticate, returns a JWT           |

Shared `Product` and `Video` types come from [@shelflife/shared](../../packages/shared).
