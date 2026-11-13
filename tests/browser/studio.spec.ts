import { test, expect } from "./fixtures";

test("embedded Studio renders its sign-in screen with offline providers", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("https://*.sanity.io/**", async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith("/users/me")) {
      // A successful lookup with no user represents the signed-out state.
      return route.fulfill({ json: null });
    }
    if (path.endsWith("/auth/providers")) {
      return route.fulfill({ json: { providers: [
        { name: "google", title: "Offline Google", url: "http://127.0.0.1:3100/offline-login" },
        { name: "github", title: "Offline GitHub", url: "http://127.0.0.1:3100/offline-login" },
      ] } });
    }
    return route.fulfill({ status: 401, json: { error: "Offline: unauthenticated" } });
  });
  await page.goto("/studio");
  await expect(page.getByRole("link", { name: "Offline Google", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Offline GitHub", exact: true })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  expect(errors).toEqual([]);
});
