import { expect, test } from "@playwright/test";

test("customer can create an online order from checkout", async ({ page }) => {
  await page.route("**/api/orders", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        order: { id: "order_test" },
        payment: {
          provider: "stripe",
          paymentIntentId: "pi_test",
          clientSecret: "pi_test_secret",
        },
      }),
    });
  });

  await page.goto("/order");
  await page.getByRole("button", { name: /^Add$/ }).first().click();
  await page.getByRole("link", { name: /View Cart/i }).click();
  await page.getByLabel("First Name").fill("Asha");
  await page.getByLabel("Last Name").fill("Rao");
  await page.getByLabel("Delivery Address").fill("123 Balestier Road");
  await page.getByLabel("Mobile Number").fill("90000000");
  await page.getByPlaceholder("john@example.com").fill("asha@example.com");
  await page.getByRole("button", { name: /Place Order/i }).click();

  await expect(page.getByText("Order received")).toBeVisible();
  await expect(page.getByText("Order order_test")).toBeVisible();
});
