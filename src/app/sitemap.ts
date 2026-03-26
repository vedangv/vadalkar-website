import type { MetadataRoute } from "next";
import { categories, categorySlug } from "@/data/projects";
import { getProjects } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vadalkar-website.vercel.app";

  const activeCats = categories.filter((c) => c !== "All");
  const projects = await getProjects();
  const featuredProjects = projects.filter((p) => p.featured && p.slug);

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...activeCats.map((cat) => ({
      url: `${baseUrl}/projects/${categorySlug(cat)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...featuredProjects.map((p) => ({
      url: `${baseUrl}/projects/${categorySlug(p.category)}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
