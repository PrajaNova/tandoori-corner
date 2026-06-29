import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import { buildApp } from "../app.js";
import {
  type AuditEntry,
  createMemoryAuditService,
} from "../services/audit-service.js";
import { createMemoryCatalogService } from "../services/catalog-service.js";
import { createMemoryCateringService } from "../services/catering-service.js";

const adminToken = "test-admin-token";

describe("catering routes security", () => {
  let app: Awaited<ReturnType<typeof buildApp>> | undefined;

  afterEach(async () => {
    await app?.close();
    app = undefined;
  });

  it("requires admin auth and audit-logs package writes", async () => {
    const auditEntries: AuditEntry[] = [];
    app = await buildApp({
      adminApiToken: adminToken,
      auditService: createMemoryAuditService(auditEntries),
      catalogService: createMemoryCatalogService(),
      cateringService: createMemoryCateringService(),
    });

    const payload = {
      name: "Diamond",
      tagline: "Large parties",
      description: "A larger catering set.",
      priceCents: 5600,
      minGuests: 40,
    };

    const blocked = await app.inject({
      method: "POST",
      url: "/api/catering/packages",
      payload,
    });
    assert.equal(blocked.statusCode, 401);

    const created = await app.inject({
      method: "POST",
      url: "/api/catering/packages",
      headers: { authorization: `Bearer ${adminToken}` },
      payload,
    });
    assert.equal(created.statusCode, 201);
    assert.equal(auditEntries[0].actor, "admin");
    assert.equal(auditEntries[0].entityType, "cateringPackage");
  });

  it("does not expose inactive packages on public reads", async () => {
    app = await buildApp({
      catalogService: createMemoryCatalogService(),
      cateringService: createMemoryCateringService([
        {
          id: "pkg_hidden",
          slug: "hidden",
          name: "Hidden",
          tagline: "Hidden",
          description: "Hidden package",
          accent: "dark",
          priceCents: 1000,
          currency: "SGD",
          minGuests: 1,
          features: [],
          status: "inactive",
          sortOrder: 1,
        },
      ]),
    });

    const list = await app.inject({
      method: "GET",
      url: "/api/catering/packages?all=true",
    });
    assert.deepEqual(list.json().packages, []);

    const detail = await app.inject({
      method: "GET",
      url: "/api/catering/packages/hidden",
    });
    assert.equal(detail.statusCode, 404);
  });
});
