import { test, expect } from "./fixtures";
import { projects } from "../../src/data/projects";

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("marketing content and project totals remain visible", async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { name: "Scope of Services" });
    const hiddenAncestor = await heading.evaluate((element) => {
      let current: Element | null = element;
      while (current) {
        if (getComputedStyle(current).opacity === "0") return true;
        current = current.parentElement;
      }
      return false;
    });
    expect(hiddenAncestor).toBe(false);
    const total = page.getByText("Projects Delivered", { exact: true }).last().locator("..").locator("p").first();
    await expect(total).toHaveText(String(projects.length));
  });
});

test("reduced motion shows the final statistics without count-up animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  const total = page.getByText("Total Projects", { exact: true }).locator("..").locator("p").first();
  await total.scrollIntoViewIfNeeded();
  await expect(total).toHaveText(String(projects.length), { timeout: 250 });
});
