# CreatorShelf Roadmap

## MVP (Interview Ready)

### Foundation

-   [x] Monorepo
-   [x] React + Vite
-   [x] NestJS
-   [x] Prisma
-   [x] PostgreSQL (Neon)
-   [x] React Router
-   [x] Dashboard
-   [x] Product Details
-   [x] Products API

### Product Management

#### Backend

-   [x] Create Product
-   [x] Edit Product
-   [x] Delete Product
-   [x] DTO validation

#### Frontend

-   [x] Product creation form
-   [x] Product edit form
-   [ ] Delete confirmation _(only a native `window.confirm`, no modal/dialog)_
-   [x] Dashboard refresh after CRUD

### Video Management

#### Backend

-   [x] Cloudinary integration
-   [x] Upload endpoint
-   [x] Delete video
-   [x] List videos by product

#### Frontend

-   [x] Upload form
-   [x] Upload progress
-   [x] Video cards
-   [x] Video player
-   [x] Delete video

### Analytics

#### Backend

-   [x] Track video views
-   [x] Track video clicks

#### Frontend

-   [x] Views dashboard
-   [x] Click dashboard
-   [x] CTR calculation 
-   [x] Analytics page

### UI Polish

-   [x] Loading states
-   [x] Error states _(shared `ErrorState` w/ retry + app-wide `ErrorBoundary`)_
-   [x] Empty states _(shared `EmptyState` for no products / no videos)_
-   [x] Toast notifications _(custom component, not a library)_
-   [x] Responsive layout _(flex-wrap action rows, scrollable analytics table, responsive header padding)_
-   [x] Dashboard polish _(product count, skeleton loading cards, sticky header)_

### Documentation

-   [x] README
-   [x] Architecture diagram
-   [x] Setup instructions
-   [ ] Screenshots

## Stretch Goal (Highest Interview Impact)

### Embeddable Widget

-   [x] Widget package
-   [x] Embed script
-   [x] Widget API endpoint
-   [x] Product video carousel
-   [x] Copy embed code
-   [x] Demo page

## V2 (After Interviews)

### Authentication

-   [x] Register
-   [x] Login
-   [x] JWT auth
-   [ ] Protected routes _(no controllers use `@UseGuards`/`JwtAuthGuard` yet)_

### Media

-   [ ] Image uploads
-   [ ] Drag & drop
-   [ ] Multiple uploads
-   [ ] Automatic thumbnails

### Search & Filtering

-   [ ] Search products
-   [ ] Search videos
-   [ ] Sort by newest
-   [ ] Sort by most viewed

### AI Features

-   [ ] Auto-tag videos
-   [ ] AI summaries
-   [ ] AI recommendations

### Widget Customization

-   [ ] Themes
-   [ ] Layout options
-   [ ] Autoplay
-   [ ] Positioning

### Production Readiness

-   [ ] Docker
-   [ ] CI/CD
-   [ ] Unit tests
-   [ ] E2E tests
-   [ ] Deployment
