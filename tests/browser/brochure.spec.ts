import { test, expect } from "./fixtures";
import { categories, categorySlug } from "../../src/data/projects";

for (const width of [390, 768]) {
  test(`brochure statistics and project highlights stay within the page at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/brochure.html");
    await expect(page.locator("html")).toHaveAttribute("data-brochure-ready", "true");
    for (const item of await page.locator(".stats-grid > *, #project-highlights > *").all()) {
      const bounds = await item.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      expect(bounds!.width).toBeGreaterThan(120);
    }
  });
}

test("the mobile experience table remains readable and scrollable by keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/brochure.html?sector=residential");
  await expect(page.locator("html")).toHaveAttribute("data-brochure-ready", "true");
  const table = page.locator(".experience-table");
  expect((await table.boundingBox())!.width).toBeGreaterThanOrEqual(680);
  const region = page.getByRole("region", { name: "Selected project experience" });
  await region.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => region.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(page.locator("#sector-select")).toHaveValue("residential");
  await expect(page.getByRole("button", { name: /Print/ })).toBeEnabled();
});

for (const sector of ["all", ...categories.filter((category) => category !== "All").map(categorySlug)]) {
  test(`all ${sector} brochure text fits on its printed page`, async ({ page }) => {
    await page.setViewportSize({ width: 1123, height: 794 });
    await page.goto(`/brochure.html?sector=${sector}`);
    await expect(page.locator("html")).toHaveAttribute("data-brochure-ready", "true");
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("main > .page")).toHaveCount(8);
    const clippedText = await page.locator("main > .page").evaluateAll((sections) => {
      const clipped: string[] = [];
      sections.forEach((section, index) => {
        const bounds = section.getBoundingClientRect();
        const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          if (!node.textContent?.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const rect of Array.from(range.getClientRects())) {
            if (rect.bottom > bounds.bottom + 1 || rect.right > bounds.right + 1 || rect.left < bounds.left - 1) {
              clipped.push(`Page ${index + 1}: ${node.textContent.trim()}`);
              break;
            }
          }
        }
      });
      return clipped;
    });
    expect(clippedText).toEqual([]);
  });
}
