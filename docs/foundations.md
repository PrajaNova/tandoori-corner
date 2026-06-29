# Foundations

Phase 1 adds the shared backend pieces later feature phases reuse.

## Environment

- `ADMIN_API_TOKEN`: bearer token required by backend admin write routes.
- `RC_BACKEND_URL`: admin app server-side URL for the Fastify backend.

## Admin Auth

Backend admin routes use `createAdminAuthGuard()` from `apps/rc-backend/src/lib/admin-auth.ts`.
Clients must send `Authorization: Bearer <ADMIN_API_TOKEN>`.

## Audit Log

Mutations record `AuditLog` rows with actor, action, entity type/id, and before/after snapshots.
Use `AuditService.record()` from `apps/rc-backend/src/services/audit-service.ts` after create, update, delete, and state-change operations.

## Notifications

`apps/rc-backend/src/services/notification-service.ts` defines the email and WhatsApp adapter boundary.
Provider implementations are intentionally not selected until the booking/ordering phases choose providers.

## Errors

`registerErrorHandler()` in `apps/rc-backend/src/lib/error-handler.ts` normalizes schema validation and unhandled errors.
Feature-specific domain errors should still be mapped in their route module.

## E2E

Run `pnpm test:e2e` for the Playwright smoke suite. The current Phase 1 smoke proves the web harness by loading `/menu`.
