import { expect, test } from "@playwright/test";

const siteUrl = "https://www.tandooricorner.com.sg";
const routes = [
  "/",
  "/menu",
  "/catering",
  "/catering/build",
  "/catering/silver",
  "/order",
  "/private-events",
  "/story",
] as const;

for (const route of routes) {
  test(`${route} has complete rendered SEO basics`, async ({ page }) => {
    await page.goto(route);

    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.title()).not.toBe("");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      /.+/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      route === "/" ? siteUrl : `${siteUrl}${route}`,
    );
    await expect(
      page.locator('script[type="application/ld+json"]'),
    ).not.toHaveCount(0);
  });
}

test("crawl files expose sitemap, robots, and manifest", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(`${siteUrl}/sitemap.xml`);

  const sitemap = await request.get("/sitemap.xml");
  const sitemapText = await sitemap.text();
  for (const route of routes.filter((route) => route !== "/catering/silver")) {
    expect(sitemapText).toContain(`${siteUrl}${route === "/" ? "/" : route}`);
  }

  const manifest = await request.get("/manifest.webmanifest");
  expect(await manifest.json()).toMatchObject({
    name: expect.stringContaining("Tandoori Corner"),
    start_url: "/",
  });
});
