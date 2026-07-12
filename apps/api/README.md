# api

Backend for Shelflife — a [NestJS](https://nestjs.com/) REST API serving products, videos, analytics, auth, and the public data feed for the embeddable widget.

## Stack

- [NestJS 11](https://nestjs.com/) on [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/) (hosted on [Neon](https://neon.tech)) for persistence
- [Cloudinary](https://cloudinary.com/) for video storage
- [Passport](http://www.passportjs.org/) + JWT for auth
- [Jest](https://jestjs.io/) for e2e tests

## Getting started

From this directory, copy the env file and fill in `DATABASE_URL` (a Postgres connection string) and the `CLOUDINARY_*` credentials:

```bash
cp .env.example .env
pnpm prisma:migrate   # applies migrations against DATABASE_URL (seeds automatically)
```

Then, from the repo root:

```bash
pnpm dev:api
```

Or from this directory:

```bash
pnpm start:dev
```

The server listens on `http://localhost:3000` by default (override with the `PORT` env var). CORS is restricted to the [web](../web) app (`CORS_ORIGIN` env var, defaults to `http://localhost:5173`) except for `/widget/*` routes, which stay open since the embeddable widget runs on arbitrary third-party origins.

A demo user (`demo@shelflife.dev` / `password123`) is created by the seed script for testing `/auth/login`.

> Auth issues JWTs on register/login, but no controllers apply the `JwtAuthGuard` yet — all routes below are currently unauthenticated.

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
    videos/         # VideosController, VideosService, VideosModule (Cloudinary upload/delete)
    analytics/      # View/click tracking + per-product summaries
    auth/           # JWT auth: register/login, strategy, guard
    widget/         # Public read-only API + widget.js script route for embeds
  prisma/           # schema.prisma, migrations, PrismaService/PrismaModule, seed
  cloudinary/       # Cloudinary client provider
  config/           # Typed, validated env config (ConfigModule)
  app.module.ts
  main.ts
```

## Endpoints

| Method | Path                                 | Description                            |
| ------ | ------------------------------------ | --------------------------------------- |
| GET    | `/products`                          | List products (`?skip=&take=`)          |
| POST   | `/products`                          | Create a product                        |
| GET    | `/products/:id`                      | Get a single product                    |
| PATCH  | `/products/:id`                      | Update a product                        |
| DELETE | `/products/:id`                      | Delete a product                        |
| GET    | `/videos/:productId`                 | List videos for a product               |
| POST   | `/videos`                            | Create a video record                   |
| POST   | `/videos/upload`                     | Upload a video file to Cloudinary       |
| DELETE | `/videos/:id`                        | Delete a video (Cloudinary + DB)        |
| POST   | `/analytics/videos/:videoId/views`   | Increment a video's view count          |
| POST   | `/analytics/videos/:videoId/clicks`  | Increment a video's click count         |
| GET    | `/analytics/products/:productId`     | Aggregate views/clicks for a product    |
| POST   | `/auth/register`                     | Create a user, returns a JWT            |
| POST   | `/auth/login`                        | Authenticate, returns a JWT             |
| GET    | `/widget.js`                         | Serves the embeddable widget script     |
| GET    | `/widget/products/:id`               | Public: product + videos for the widget |
| POST   | `/widget/videos/:id/views`           | Public: record a widget video view      |
| POST   | `/widget/videos/:id/clicks`          | Public: record a widget video click     |

Shared `Product` and `Video` types come from [@shelflife/shared](../../packages/shared).
