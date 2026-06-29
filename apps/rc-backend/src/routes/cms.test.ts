import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { buildApp } from "../app.js";
import {
  type AuditEntry,
  createMemoryAuditService,
} from "../services/audit-service.js";
import { createMemoryCatalogService } from "../services/catalog-service.js";
import type {
  CmsService,
  GalleryImage,
  Promotion,
  SiteSetting,
  Testimonial,
} from "../services/cms-service.js";

const adminToken = "test-admin-token";
const adminHeaders = {
  authorization: `Bearer ${adminToken}`,
  "x-admin-user": "test-admin",
};

function createMemoryCmsService(): CmsService {
  const promotions: Promotion[] = [];
  const images: GalleryImage[] = [];
  const testimonials: Testimonial[] = [];
  const settings: SiteSetting[] = [
    { key: "contact", value: { phone: "+65" } },
    { key: "privateToken", value: "secret" },
  ];
  return {
    listPromotions: async () => promotions,
    getPromotion: async (id) => promotions.find((item) => item.id === id),
    savePromotion: async (input) => {
      const item = { id: input.id ?? "promo_1", ...input };
      const index = promotions.findIndex(
        (candidate) => candidate.id === item.id,
      );
      if (index >= 0) promotions[index] = item;
      else promotions.push(item);
      return item;
    },
    deletePromotion: async (id) => {
      promotions.splice(
        promotions.findIndex((item) => item.id === id),
        1,
      );
    },
    listGalleryImages: async () => images,
    getGalleryImage: async (id) => images.find((item) => item.id === id),
    saveGalleryImage: async (input) => {
      const item = { id: input.id ?? "image_1", ...input };
      images.push(item);
      return item;
    },
    deleteGalleryImage: async () => {},
    listTestimonials: async () => testimonials,
    getTestimonial: async (id) => testimonials.find((item) => item.id === id),
    saveTestimonial: async (input) => {
      const item = { id: input.id ?? "testimonial_1", ...input };
      testimonials.push(item);
      return item;
    },
    deleteTestimonial: async () => {},
    listSettings: async (includePrivate = false) =>
      includePrivate
        ? settings
        : settings.filter((setting) => setting.key === "contact"),
    getSetting: async (key) => settings.find((item) => item.key === key),
    saveSetting: async (key, value) => {
      const setting = { key, value };
      settings.push(setting);
      return setting;
    },
  };
}

describe("cms routes", () => {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("lists public promotions and audit-logs admin writes", async () => {
    const auditEntries: AuditEntry[] = [];
    app = await buildApp({
      adminApiToken: adminToken,
      auditService: createMemoryAuditService(auditEntries),
      catalogService: createMemoryCatalogService(),
      cmsService: createMemoryCmsService(),
    });

    const unauthorized = await app.inject({
      method: "POST",
      url: "/api/cms/admin/promotions",
      payload: { title: "Feast", description: "Family dinner" },
    });
    assert.equal(unauthorized.statusCode, 401);

    const create = await app.inject({
      method: "POST",
      url: "/api/cms/admin/promotions",
      headers: adminHeaders,
      payload: { title: "Feast", description: "Family dinner" },
    });
    assert.equal(create.statusCode, 201);
    assert.equal(auditEntries[0].entityType, "promotion");

    const list = await app.inject({
      method: "GET",
      url: "/api/cms/promotions",
    });
    assert.equal(list.statusCode, 200);
    assert.equal(list.json().promotions[0].title, "Feast");
  });

  it("only exposes allowlisted settings publicly", async () => {
    app = await buildApp({
      adminApiToken: adminToken,
      auditService: createMemoryAuditService([]),
      catalogService: createMemoryCatalogService(),
      cmsService: createMemoryCmsService(),
    });

    const publicSettings = await app.inject({
      method: "GET",
      url: "/api/cms/settings",
    });
    assert.deepEqual(
      publicSettings.json().settings.map((setting: SiteSetting) => setting.key),
      ["contact"],
    );

    const adminSettings = await app.inject({
      method: "GET",
      url: "/api/cms/admin/settings",
      headers: adminHeaders,
    });
    assert.deepEqual(
      adminSettings.json().settings.map((setting: SiteSetting) => setting.key),
      ["contact", "privateToken"],
    );
  });
});
