import { test, expect } from "./fixtures";
import type { Page } from "@playwright/test";

async function fillEnquiry(page: Page) {
  await page.getByLabel("Full Name").fill("Test Enquirer");
  await page.getByLabel("Email Address").fill("enquirer@example.com");
  await page.getByLabel("Project Details").fill("Please tell me more about your structural engineering services.");
}

test("sending locks the submitted fields and moves focus to the confirmation", async ({ page }) => {
  let release: () => void = () => {};
  const pending = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/api/contact", async (route) => {
    await pending;
    await route.fulfill({ json: { success: true } });
  });
  await page.goto("/contact?service=Structural%20Audit");
  await expect(page.getByLabel("Service Required")).toHaveValue("Structural Audit");
  await fillEnquiry(page);
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  try {
    await expect(page.getByLabel("Full Name")).toBeDisabled();
  } finally {
    release();
  }
  const success = page.getByRole("status");
  await expect(success).toContainText("Message Sent!");
  await expect(success).toBeFocused();
  await page.getByRole("button", { name: "Send another message" }).click();
  await expect(page.getByLabel("Full Name")).toBeFocused();
  await expect(page.getByLabel("Full Name")).toHaveValue("");
});

test("a non-JSON server failure keeps the enquiry and shows a useful retry message", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({ status: 502, contentType: "text/html", body: "<h1>Gateway error</h1>" }));
  await page.goto("/contact");
  await fillEnquiry(page);
  await page.getByRole("button", { name: "Send Message", exact: true }).click();
  await expect(page.getByRole("main").getByRole("alert")).toHaveText("We couldn’t send your message. Please try again or email us directly.");
  await expect(page.getByRole("main").getByRole("alert")).toBeFocused();
  await expect(page.getByLabel("Full Name")).toHaveValue("Test Enquirer");
  await expect(page.getByLabel("Full Name")).toBeEnabled();
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("enquiries use an email fallback and cannot become GET query strings", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("form")).toHaveAttribute("method", "post");
    await expect(page.locator("form")).toBeHidden();
    // Playwright's text/role selectors intentionally skip noscript descendants.
    const fallback = page.locator("noscript p");
    await expect(fallback).toBeVisible();
    await expect(fallback).toContainText("Email your enquiry to");
    await expect(fallback.locator("a")).toHaveAttribute("href", "mailto:info@vadalkar.com");
  });
});
