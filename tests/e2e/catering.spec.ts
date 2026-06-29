import { expect, test } from "@playwright/test";

test("customer can submit a catering quote request", async ({ page }) => {
  await page.route("**/api/event-enquiries", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-headers": "content-type",
          "access-control-allow-methods": "POST,OPTIONS",
          "access-control-allow-origin": "*",
        },
      });
      return;
    }

    const payload = route.request().postDataJSON();
    expect(payload.source).toBe("catering-package");
    expect(payload.eventType).toContain("Catering");

    await route.fulfill({
      status: 201,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({ enquiry: { id: "catering_test" } }),
    });
  });

  await page.goto("/catering/silver");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Request a Quote" }).first().click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Full Name").fill("Priya Sharma");
  await dialog.getByLabel("Phone").fill("+6590000000");
  await dialog.getByLabel("Email").fill("priya@example.com");
  await dialog.getByLabel("Guests").fill("40");
  await dialog.getByLabel("Preferred Date").fill("2099-07-20");
  await dialog.getByLabel("Notes / Dietary Needs").fill("Vegetarian options");
  await dialog.getByRole("button", { name: "Submit Request" }).click();

  await expect(
    page.getByText("We received your catering enquiry"),
  ).toBeVisible();
});
