import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { CmsError, createPrismaCmsService } from "./cms-service.js";

describe("cms service security", () => {
  it("rejects promotion CTA URLs with unsafe schemes", async () => {
    const service = createPrismaCmsService({} as never);

    await assert.rejects(
      service.savePromotion({
        title: "Bad CTA",
        description: "Unsafe link",
        ctaHref: "javascript:alert(1)",
        placement: "home",
        status: "active",
        sortOrder: 0,
      }),
      CmsError,
    );
  });

  it("only returns allowlisted public settings unless admin asks for all", async () => {
    const rows = [
      { key: "contact", value: { phone: "+65" } },
      { key: "stripeSecret", value: "secret" },
    ];
    const service = createPrismaCmsService({
      siteSetting: {
        findMany: async ({ where }: { where?: { key?: { in: string[] } } }) =>
          where?.key?.in
            ? rows.filter((row) => where.key?.in.includes(row.key))
            : rows,
      },
    } as never);

    assert.deepEqual(
      (await service.listSettings()).map((setting) => setting.key),
      ["contact"],
    );
    assert.deepEqual(
      (await service.listSettings(true)).map((setting) => setting.key),
      ["contact", "stripeSecret"],
    );
  });
});
