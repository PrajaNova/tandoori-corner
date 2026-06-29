import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { buildApp } from "../app.js";
import {
  type AuditEntry,
  createMemoryAuditService,
} from "../services/audit-service.js";
import { createMemoryCatalogService } from "../services/catalog-service.js";
import {
  createMemoryMenuService,
  type MenuCategory,
} from "../services/menu-service.js";
import { createMemoryOrderService } from "../services/order-service.js";
import { createMemoryPaymentService } from "../services/payment-service.js";

const adminToken = "test-admin-token";
const adminHeaders = {
  authorization: `Bearer ${adminToken}`,
  "x-admin-user": "test-admin",
};

const seedMenu: MenuCategory[] = [
  {
    id: "menu_cat_snacks",
    slug: "snacks",
    title: "Snacks",
    subtitle: "Tandoori Corner menu",
    icon: "utensils",
    status: "active",
    sortOrder: 10,
    items: [
      {
        id: "menu_item_samosa",
        slug: "vegetable-samosa",
        categoryId: "menu_cat_snacks",
        name: "Vegetable Samosa",
        description: "Crispy patty filled with spiced potatoes and peas.",
        priceCents: 900,
        currency: "SGD",
        variants: [],
        imageSlug: "vegetable-samosa",
        veg: true,
        allergens: ["wheat"],
        tags: ["Vegetarian"],
        ingredients: ["wheat"],
        status: "active",
        sortOrder: 10,
      },
    ],
  },
];

async function buildTestApp(auditEntries: AuditEntry[] = []) {
  const catalogService = createMemoryCatalogService();
  return buildApp({
    adminApiToken: adminToken,
    auditService: createMemoryAuditService(auditEntries),
    catalogService,
    menuService: createMemoryMenuService(seedMenu),
    orderService: createMemoryOrderService(catalogService),
    paymentService: createMemoryPaymentService(),
  });
}

describe("menu routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("lists menu categories and items", async () => {
    app = await buildTestApp();
    const response = await app.inject({ method: "GET", url: "/api/menu" });
    assert.equal(response.statusCode, 200);
    const body = response.json() as {
      categories: Array<{ title: string; items: Array<{ name: string }> }>;
    };
    assert.equal(body.categories[0].title, "Snacks");
    assert.equal(body.categories[0].items[0].name, "Vegetable Samosa");
  });

  it("requires admin auth for menu mutations", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "POST",
      url: "/api/menu/categories",
      payload: { title: "Breads" },
    });
    assert.equal(response.statusCode, 401);
  });

  it("creates categories and audit-logs the mutation", async () => {
    const auditEntries: AuditEntry[] = [];
    app = await buildTestApp(auditEntries);
    const response = await app.inject({
      method: "POST",
      url: "/api/menu/categories",
      headers: adminHeaders,
      payload: { title: "Breads" },
    });
    assert.equal(response.statusCode, 201);
    assert.equal(response.json().category.slug, "breads");
    assert.equal(auditEntries.length, 1);
    assert.equal(auditEntries[0].entityType, "menuCategory");
    assert.equal(auditEntries[0].action, "create");
  });

  it("creates and updates a menu item", async () => {
    app = await buildTestApp();
    const create = await app.inject({
      method: "POST",
      url: "/api/menu/items",
      headers: adminHeaders,
      payload: {
        categoryId: "menu_cat_snacks",
        name: "Onion Bhaji",
        description: "Thinly sliced red onions mixed with batter and fried.",
        priceCents: 1000,
        tags: ["Vegetarian"],
      },
    });
    assert.equal(create.statusCode, 201);
    assert.equal(create.json().item.slug, "onion-bhaji");

    const patch = await app.inject({
      method: "PATCH",
      url: "/api/menu/items/menu_item_onion_bhaji",
      headers: adminHeaders,
      payload: { priceCents: 1100 },
    });
    assert.equal(patch.statusCode, 200);
    assert.equal(patch.json().item.priceCents, 1100);
  });

  it("refuses to delete a non-empty menu category", async () => {
    app = await buildTestApp();
    const response = await app.inject({
      method: "DELETE",
      url: "/api/menu/categories/menu_cat_snacks",
      headers: adminHeaders,
    });
    assert.equal(response.statusCode, 409);
    assert.equal(response.json().error, "MENU_HAS_REFERENCES");
  });
});
