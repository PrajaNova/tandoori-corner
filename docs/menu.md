# Menu System

Phase 2 moves the customer and admin menu onto the backend `MenuCategory` and `MenuItem` tables.

## API

- `GET /api/menu`: public list of active/inactive menu categories with items.
- `GET /api/menu/categories`: same list shape, used by the admin app.
- `GET /api/menu/categories/:categorySlug`: public category detail.
- `POST /api/menu/categories`: admin create category.
- `PATCH /api/menu/categories/:id`: admin update category.
- `DELETE /api/menu/categories/:id`: admin delete category.
- `POST /api/menu/items`: admin create item.
- `PATCH /api/menu/items/:id`: admin update item.
- `DELETE /api/menu/items/:id`: admin delete item.

Admin writes require `Authorization: Bearer <ADMIN_API_TOKEN>`.

## Models

`MenuCategory` owns the display section. `MenuItem` stores the dish, base price, variants, dietary flags, allergens, status, and sort order.

The migration creating these tables is `apps/rc-backend/prisma/migrations/20260628020000_menu_tables/migration.sql`.

## Frontend Flow

`apps/tc-web-app/app/menu/page.tsx` fetches `GET /api/menu` server-side through `apps/tc-web-app/lib/menu.ts`.
If the backend is unavailable, the page shows a friendly warning and falls back to the bundled static menu.

## Admin Flow

`apps/tc-admin-app/lib/api.ts` proxies admin category and item writes to `/api/menu`.
The existing admin forms continue to create, edit, and delete menu sections and dishes.
