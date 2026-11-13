import { test, expect } from "./fixtures";

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`navigation fits without overlap at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/services");
    const logo = await page.locator("header img").boundingBox();
    const nav = page.locator("header nav").first();
    const control = await nav.isVisible() ? nav : page.locator("header button").first();
    const controlBounds = await control.boundingBox();
    expect(logo).not.toBeNull();
    expect(controlBounds).not.toBeNull();
    expect(logo!.x + logo!.width + 16).toBeLessThanOrEqual(controlBounds!.x);
    expect(controlBounds!.x + controlBounds!.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

test("the tablet menu supports keyboard dismissal, current page, and short viewports", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 400 });
  await page.goto("/services");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  const menu = page.locator("#mobile-navigation");
  await expect(menu.getByRole("link", { name: "Services", exact: true })).toHaveAttribute("aria-current", "page");
  await menu.getByRole("link", { name: "Get in Touch" }).focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole("link", { name: "Get in Touch" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(menu).toHaveCount(0);
});

for (const width of [390, 768, 1440]) {
  test(`featured projects form substantial, separate cards at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const cards = page.locator('main a[aria-label^="View "]');
    await expect(cards).toHaveCount(3);
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded();
      const bounds = await card.boundingBox();
      expect(bounds!.width).toBeGreaterThan(200);
      expect(bounds!.height).toBeGreaterThanOrEqual(250);
      await expect(card).toHaveCSS("display", "block");
    }
  });
}
