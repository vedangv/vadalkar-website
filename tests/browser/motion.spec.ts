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
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/about");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 1440, height: 1200 });
  const total = page.getByText("Total Projects", { exact: true }).locator("..").locator("p").first();
  // Observe changes during animation: a one-time assertion can pass on the
  // server-rendered total before the first animation frame changes it.
  const observed = await total.evaluate(async (element) => {
    const values = [element.textContent];
    const observer = new MutationObserver(() => values.push(element.textContent));
    observer.observe(element, { childList: true, subtree: true, characterData: true });
    // Reveal enough of the statistics section to cross its observer threshold.
    element.parentElement!.parentElement!.parentElement!.scrollIntoView({ block: "start", behavior: "instant" });
    await new Promise((resolve) => setTimeout(resolve, 700));
    observer.disconnect();
    return values;
  });
  expect([...new Set(observed)]).toEqual([String(projects.length)]);
});

for (const path of ["/", "/about"]) {
  test(`statistics keep ${path} usable when IntersectionObserver is unavailable`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      Reflect.deleteProperty(window, "IntersectionObserver");
    });
    await page.goto(path);
    // Exercise hydration, not just the HTML returned before effects run.
    await page.setViewportSize({ width: 390, height: 900 });
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
    await page.keyboard.press("Escape");
    const label = path === "/" ? "Projects Delivered" : "Total Projects";
    const total = page.getByText(label, { exact: true }).last().locator("..").locator("p").first();
    await total.scrollIntoViewIfNeeded();
    await expect(total).toHaveText(String(projects.length));
    await expect(page.getByRole("main")).toBeVisible();
    expect(errors).toEqual([]);
  });
}
