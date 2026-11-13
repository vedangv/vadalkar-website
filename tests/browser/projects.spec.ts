import { test, expect } from "./fixtures";

test("repeated search parameters remain usable instead of crashing", async ({ page }) => {
  await page.goto("/projects?q=IIT&q=Bombay&category=Residential&category=Industrial");
  await expect(page.getByRole("searchbox", { name: "Search projects" })).toHaveValue("IIT");
  await expect(page.locator("main h2").first()).toContainText(/IIT|Bombay/i);
});

test("literal All search terms survive refresh", async ({ page }) => {
  await page.goto("/projects");
  const search = page.getByRole("searchbox", { name: "Search projects" });
  await search.fill("All");
  await expect.poll(() => new URL(page.url()).searchParams.get("q")).toBe("All");
  await page.reload();
  await expect(search).toHaveValue("All");
  await search.fill("");
  await search.pressSequentially("IIT Bombay", { delay: 10 });
  await expect(search).toHaveValue("IIT Bombay");
  await expect.poll(() => new URL(page.url()).searchParams.get("q")).toBe("IIT Bombay");
});

test("project selection follows browser history and offers an empty-state reset", async ({ page }) => {
  await page.goto("/projects");
  const filters = page.getByRole("group", { name: "Filter projects by category" });
  await filters.getByRole("button", { name: /^Residential/ }).click();
  await expect(page).toHaveURL(/category=Residential/);
  await filters.getByRole("button", { name: /^Industrial/ }).click();
  await expect(page).toHaveURL(/category=Industrial/);
  await page.goBack();
  await expect(filters.getByRole("button", { name: /^Residential/ })).toHaveAttribute("aria-pressed", "true");
  await page.goForward();
  await expect(filters.getByRole("button", { name: /^Industrial/ })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("searchbox").fill("a project that does not exist");
  await expect(page.getByRole("status")).toContainText("0 projects");
  await page.getByRole("button", { name: "Clear filters", exact: true }).last().click();
  await expect(page.getByRole("searchbox")).toHaveValue("");
  await expect(filters.getByRole("button", { name: "All", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("main h2")).toHaveCount(36);
  await page.getByRole("button", { name: "Show 36 more projects" }).click();
  await expect(page.locator("main h2")).toHaveCount(72);
  await expect(page.getByRole("status")).toContainText("Showing 72 of");
});

for (const width of [390, 768, 1440]) {
  test(`loading more projects resumes keyboard browsing at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/projects?category=Industrial");

    for (const [previousCount, nextCount] of [[36, 72], [72, 84]]) {
      const more = page.getByRole("button", { name: /^Show \d+ more projects$/ });
      await more.focus();
      await more.press("Enter");
      const headings = page.locator("main h2");
      await expect(headings).toHaveCount(nextCount);
      const firstNewHeading = headings.nth(previousCount);
      await expect.poll(() => firstNewHeading.evaluate((heading) => (
        document.activeElement === (heading.closest("a") || heading)
      ))).toBe(true);
      // The fixed header and sticky filters must not cover the resumed result.
      const filters = await page.getByRole("group", { name: "Filter projects by category" }).boundingBox();
      const heading = await firstNewHeading.boundingBox();
      expect(heading!.y).toBeGreaterThanOrEqual(filters!.y + filters!.height);
      expect(heading!.y + heading!.height).toBeLessThan(900);
      await expect(page.getByRole("status")).toContainText(`Showing ${nextCount} of 84 projects`);
    }

    await expect(page.getByRole("button", { name: /^Show \d+ more projects$/ })).toHaveCount(0);
  });
}

test("a project cannot be served under another category's canonical URL", async ({ page }) => {
  await page.goto("/projects/industrial/videocon-towers");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We couldn’t find that page");
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
});

test("unknown pages return 404 with useful recovery links", async ({ page }) => {
  const response = await page.goto("/missing-project-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We couldn’t find that page");
  await expect(page.getByRole("main").getByRole("link", { name: "Explore our projects" })).toHaveAttribute("href", "/projects");
  await expect(page.getByRole("main").getByRole("link", { name: "Contact us" })).toHaveAttribute("href", "/contact");
});
