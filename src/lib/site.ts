const DEFAULT_SITE_URL = "https://development.vadalkar.com";

export const SITE_EMAIL = "info@vadalkar.com";

function normalizeSiteUrl(value: string): string {
  const url = new URL(value);
  return url.toString().replace(/\/$/, "");
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
);

// Keep the launch candidate out of search results until the apex-domain cutover.
export const SITE_IS_INDEXABLE =
  process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
