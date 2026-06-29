import { expect, test } from "@playwright/test";

test("customer can request a table booking", async ({ page }) => {
  await page.route("**/api/bookings", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ booking: { id: "booking_test" } }),
    });
  });

  await page.goto("/");
  await page
    .getByRole("textbox", { name: "Reservation date" })
    .fill("2026-07-03");
  await page
    .getByRole("combobox", { name: "Reservation time" })
    .selectOption("19:30");
  await page.getByPlaceholder("Your name…").fill("Asha Rao");
  await page.getByPlaceholder("Email…").fill("asha@example.com");
  await page.getByPlaceholder("Phone number…").fill("+6590000000");
  await page.getByRole("button", { name: "Find Table" }).click();

  await expect(page.getByText("Booking request received")).toBeVisible();
});
