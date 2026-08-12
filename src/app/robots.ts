import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_IS_INDEXABLE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: SITE_IS_INDEXABLE
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/", "/studio/"],
        }
      : { userAgent: "*", disallow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
