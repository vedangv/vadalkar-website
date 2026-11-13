import { test as base, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

export const test = base.extend({
  context: async ({ context, baseURL }, run) => {
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (url.origin === baseURL) {
        if (url.pathname.startsWith("/_vercel/")) {
          return route.fulfill({ contentType: "application/javascript", body: "" });
        }
        return route.continue();
      }
      if (url.hostname === "cdn.sanity.io" && url.pathname.startsWith("/images/offline/")) {
        const path = Buffer.from(url.pathname.split("/").pop()!.split("-")[0], "hex").toString();
        if (!/^\/projects\/[a-z0-9/-]+\.(jpg|gif)$/.test(path)) throw new Error("Unknown test image");
        return route.fulfill({
          body: await readFile(`public${path}`),
          contentType: path.endsWith(".gif") ? "image/gif" : "image/jpeg",
        });
      }
      // Maps, analytics, fonts, and other live services are never contacted.
      return route.fulfill({ contentType: "text/plain", body: "" });
    });
    await run(context);
  },
});

export { expect };
