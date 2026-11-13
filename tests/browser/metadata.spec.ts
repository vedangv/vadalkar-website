import { test, expect } from "./fixtures";

for (const path of [
  "/about", "/services", "/projects", "/team", "/contact", "/careers",
  "/projects/residential", "/projects/residential/videocon-towers",
]) {
  test(`sharing metadata describes ${path} and includes a working image`, async ({ page, request, baseURL }) => {
    await page.goto(path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      await expect(page.locator(selector)).toHaveAttribute("content", title);
    }
    for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      await expect(page.locator(selector)).toHaveAttribute("content", description!);
    }
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${baseURL}${path}`);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    const image = page.locator('meta[property="og:image"]');
    await expect(image).toHaveCount(1);
    const imageUrl = new URL((await image.getAttribute("content"))!);
    expect(imageUrl.origin).toBe(baseURL);
    const response = await request.get(imageUrl.href);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(1);
  });
}
