# web

Frontend for Shelflife — a React + TypeScript single-page app for managing products, their promotional videos, and view/click analytics.

## Stack

- [React 19](https://react.dev/) with [React Router](https://reactrouter.com/) for routing
- [Vite](https://vite.dev/) for dev server and build
- [TanStack Query](https://tanstack.com/query) for server state
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Axios](https://axios-http.com/) for HTTP requests

## Getting started

From the repo root:

```bash
pnpm dev:web
```

Or from this directory:

```bash
pnpm dev
```

The app runs on Vite's default port and expects the [api](../api) service to be running at `http://localhost:3000` (see [src/lib/api-client.ts](src/lib/api-client.ts)).

## Scripts

- `pnpm dev` — start the Vite dev server
- `pnpm build` — type-check and build for production
- `pnpm lint` — run ESLint
- `pnpm preview` — preview the production build locally

## Structure

```
src/
  app/              # App root and router
  components/       # Shared, generic UI components (EmptyState, ErrorState, ErrorBoundary, Toast, ...)
  features/         # Feature modules (products, videos, analytics), each with api/, components/, hooks/, pages/
  layouts/          # Page layouts (e.g. DashboardLayout)
  lib/              # Shared utilities (API client, query client)
```

Routes are defined in [src/app/router.tsx](src/app/router.tsx):

| Path                           | Page                                  |
| ------------------------------- | -------------------------------------- |
| `/`                              | Product list (dashboard)               |
| `/products/new`                  | Create product                         |
| `/products/:id`                  | Product details                        |
| `/products/:id/edit`             | Edit product                           |
| `/products/:id/videos/create`    | Upload a video                         |
| `/products/:id/analytics`        | Product analytics (views/clicks/CTR)   |

The product details page also has an **Embed code** action ([EmbedCodeButton](src/features/products/components/EmbedCodeButton.tsx)) that copies a `<script>` snippet embedding [packages/widget](../../packages/widget)'s `widget.js` for that product — see [public/demo.html](public/demo.html) for a working example of the embed on a third-party page.
