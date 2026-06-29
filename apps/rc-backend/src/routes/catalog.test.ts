import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { buildApp } from "../app.js";
import {
  type AuditEntry,
  createMemoryAuditService,
} from "../services/audit-service.js";
import {
  CatalogError,
  type CatalogService,
  createMemoryCatalogService,
} from "../services/catalog-service.js";
import { createMemoryOrderService } from "../services/order-service.js";
import { createMemoryPaymentService } from "../services/payment-service.js";

const adminToken = "test-admin-token";
const adminHeaders = {
  authorization: `Bearer ${adminToken}`,
  "x-admin-user": "test-admin",
};

async function buildTestApp(
  catalogService?: CatalogService,
  auditEntries: AuditEntry[] = [],
) {
  const nextCatalogService = catalogService ?? createMemoryCatalogService();
  return buildApp({
    adminApiToken: adminToken,
    auditService: createMemoryAuditService(auditEntries),
    catalogService: nextCatalogService,
    orderService: createMemoryOrderService(nextCatalogService),
    paymentService: createMemoryPaymentService(),
  });
}

describe("catalog read routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("lists categories in display order", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/catalog/categories",
    });
    assert.equal(response.statusCode, 200);
    const body = response.json() as {
      categories: Array<{ slug: string; sortOrder: number }>;
    };
    assert.ok(body.categories.length >= 4);
    const sortOrders = body.categories.map((category) => category.sortOrder);
    assert.deepEqual(
      sortOrders,
      [...sortOrders].sort((a, b) => a - b),
    );
  });

  it("filters items by category and search query", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/catalog/items?category=curry-corner&q=butter",
    });
    assert.equal(response.statusCode, 200);
    const body = response.json() as { items: Array<{ slug: string }> };
    assert.equal(body.items.length, 1);
    assert.equal(body.items[0].slug, "og-butter-chicken");
  });

  it("returns 404 for an unknown item slug", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "GET",
      url: "/api/catalog/items/does-not-exist",
    });
    assert.equal(response.statusCode, 404);
  });
});

describe("catalog mutations", () => {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("creates a category with a derived id and slug", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/api/catalog/categories",
      headers: adminHeaders,
      payload: {
        title: "Tandoori Bar",
        subtitle: "Cocktails",
        icon: "glassWater",
      },
    });
    assert.equal(response.statusCode, 201);
    const body = response.json() as {
      category: { id: string; slug: string };
    };
    assert.equal(body.category.slug, "tandoori-bar");
    assert.equal(body.category.id, "cat_tandoori_bar");
  });

  it("requires admin auth for mutations", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/api/catalog/categories",
      payload: {
        title: "Tandoori Bar",
        subtitle: "Cocktails",
        icon: "glassWater",
      },
    });
    assert.equal(response.statusCode, 401);
    assert.equal(response.json().error, "ADMIN_UNAUTHORIZED");
  });

  it("audit-logs catalog mutations", async () => {
    const auditEntries: AuditEntry[] = [];
    app = await buildTestApp(undefined, auditEntries);
    const response = await app.inject({
      method: "POST",
      url: "/api/catalog/categories",
      headers: adminHeaders,
      payload: {
        title: "Tandoori Bar",
        subtitle: "Cocktails",
        icon: "glassWater",
      },
    });
    assert.equal(response.statusCode, 201);
    assert.equal(auditEntries.length, 1);
    assert.deepEqual(auditEntries[0], {
      actor: "test-admin",
      action: "create",
      entityType: "catalogCategory",
      entityId: "cat_tandoori_bar",
      after: response.json().category,
    });
  });

  it("rejects a duplicate category slug with 409", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/api/catalog/categories",
      headers: adminHeaders,
      payload: {
        title: "Chef's Signatures",
        subtitle: "x",
        icon: "chefHat",
        slug: "chefs-signatures",
      },
    });
    assert.equal(response.statusCode, 409);
    assert.equal(response.json().error, "CATALOG_SLUG_CONFLICT");
  });

  it("rejects a category with a missing title (400 schema validation)", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/api/catalog/categories",
      headers: adminHeaders,
      payload: { subtitle: "x", icon: "chefHat" },
    });
    assert.equal(response.statusCode, 400);
  });

  it("creates an item in an existing category", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/api/catalog/items",
      headers: adminHeaders,
      payload: {
        categoryId: "cat_curry_corner",
        name: "Paneer Tikka Masala",
        description: "Grilled paneer in a spiced tomato gravy.",
        priceCents: 1900,
      },
    });
    assert.equal(response.statusCode, 201);
    const body = response.json() as { item: { id: string; slug: string } };
    assert.equal(body.item.slug, "paneer-tikka-masala");
    assert.equal(body.item.id, "item_paneer_tikka_masala");
  });

  it("rejects an item with an unknown category (409)", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/api/catalog/items",
      headers: adminHeaders,
      payload: {
        categoryId: "cat_nope",
        name: "Ghost Dish",
        description: "Nowhere to live.",
        priceCents: 100,
      },
    });
    assert.equal(response.statusCode, 409);
    assert.equal(response.json().error, "CATALOG_CATEGORY_MISSING");
  });

  it("updates an item price and reflects it on read", async () => {
    app = await buildTestApp();
    const patch = await app.inject({
      method: "PATCH",
      url: "/api/catalog/items/item_og_butter_chicken",
      headers: adminHeaders,
      payload: { priceCents: 2600 },
    });
    assert.equal(patch.statusCode, 200);
    assert.equal(patch.json().item.priceCents, 2600);

    const read = await app.inject({
      method: "GET",
      url: "/api/catalog/items/og-butter-chicken",
    });
    assert.equal(read.json().item.priceCents, 2600);
  });

  it("returns 404 when patching an unknown item", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "PATCH",
      url: "/api/catalog/items/item_unknown",
      headers: adminHeaders,
      payload: { priceCents: 100 },
    });
    assert.equal(response.statusCode, 404);
  });

  it("deletes an item then returns 404 on read", async () => {
    app = await buildTestApp();
    const del = await app.inject({
      method: "DELETE",
      url: "/api/catalog/items/item_garlic_naan",
      headers: adminHeaders,
    });
    assert.equal(del.statusCode, 204);

    const read = await app.inject({
      method: "GET",
      url: "/api/catalog/items/garlic-naan",
    });
    assert.equal(read.statusCode, 404);
  });

  it("refuses to delete a non-empty category (409)", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "DELETE",
      url: "/api/catalog/categories/cat_curry_corner",
      headers: adminHeaders,
    });
    assert.equal(response.statusCode, 409);
    assert.equal(response.json().error, "CATALOG_HAS_REFERENCES");
  });

  it("maps a service reference-conflict error to 409", async () => {
    const stub = {
      ...createMemoryCatalogService(),
      deleteItem: async () => {
        throw new CatalogError("CONFLICT_HAS_REFERENCES");
      },
    } satisfies CatalogService;
    app = await buildTestApp(stub);
    const response = await app.inject({
      method: "DELETE",
      url: "/api/catalog/items/item_og_butter_chicken",
      headers: adminHeaders,
    });
    assert.equal(response.statusCode, 409);
    assert.equal(response.json().error, "CATALOG_HAS_REFERENCES");
  });
});
