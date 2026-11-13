import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "./fixtures";

const routes = [
  "/", "/about", "/services", "/projects", "/team", "/contact", "/careers",
  "/projects/residential", "/projects/residential/videocon-towers",
  "/missing-page", "/brochure.html",
];

for (const width of [390, 1440]) {
  for (const route of routes) {
    test(`accessible content on ${route} at ${width}px`, async ({ page }) => {
      test.setTimeout(60_000);
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await expect(page.getByRole("main")).toHaveCount(1);
      // Exercise lazy images and below-the-fold sections before the audit.
      await page.evaluate(async () => {
        for (let top = 0; top < document.body.scrollHeight; top += 700) {
          window.scrollTo({ top, behavior: "instant" });
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
      });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(result.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
    });
  }
}
