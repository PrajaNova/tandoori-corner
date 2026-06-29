import { expect, test } from "@playwright/test";

test("customer can submit a private event enquiry", async ({ page }) => {
  await page.route("**/api/event-enquiries", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ enquiry: { id: "event_test" } }),
    });
  });

  await page.goto("/private-events");
  await page
    .getByRole("button", { name: /Enquire to Book/i })
    .first()
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByLabel("Full Name").fill("Priya Sharma");
  await dialog.getByLabel("Phone").fill("+6590000000");
  await dialog.getByLabel("Email").fill("priya@example.com");
  await dialog.getByLabel("Event Type").selectOption("Birthday / Milestone");
  await dialog.getByLabel("Guests").fill("40");
  await dialog.getByLabel("Preferred Date").fill("2026-07-20");
  await dialog.getByLabel("Notes / Vision").fill("Cocktail style");
  await dialog.getByRole("button", { name: "Submit Enquiry" }).click();

  await expect(page.getByText("We received your enquiry")).toBeVisible();
});
