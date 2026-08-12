import type { MetadataRoute } from "next";
import { categories, categorySlug } from "@/data/projects";
import { getProjects } from "@/sanity/lib/queries";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const activeCats = categories.filter((c) => c !== "All");
  const projects = await getProjects();
  const featuredProjects = projects.filter((p) => p.featured && p.slug);

  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/team"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/careers"), changeFrequency: "monthly", priority: 0.6 },
    ...activeCats.map((cat) => ({
      url: absoluteUrl(`/projects/${categorySlug(cat)}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...featuredProjects.map((p) => ({
      url: absoluteUrl(`/projects/${categorySlug(p.category)}/${p.slug}`),
      lastModified: p.updatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
