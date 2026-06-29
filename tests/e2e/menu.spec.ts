import { expect, test } from "@playwright/test";

test("menu page renders the customer ordering entry point", async ({
  page,
}) => {
  await page.goto("/menu");

  await expect(
    page.getByRole("heading", { name: "The Chef's Creations" }),
  ).toBeVisible();
  await expect(page.getByText("Tandoori Corner Singapore")).toBeVisible();
  await expect(page.getByRole("link", { name: "Menu" }).first()).toBeVisible();

  await page.getByRole("searchbox", { name: "Search dishes" }).fill("sandwich");
  await expect(page.getByText(/Showing \d+ dish/)).toBeVisible();
  await page.getByRole("button", { name: /^Add$/ }).first().click();
  await expect(page.getByText("1").first()).toBeVisible();
});
