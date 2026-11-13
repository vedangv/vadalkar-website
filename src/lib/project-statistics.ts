import { categories } from "@/data/projects";
import type { SanityProject } from "@/sanity/lib/queries";

export type ProjectStatistics = {
  totalProjects: number;
  sectorsServed: number;
  featuredProjects: number;
  categories: { name: string; count: number }[];
  decades: { label: string; count: number }[];
};

// Keep full project records on the server when a page only needs summary charts.
export function getProjectStatistics(
  projects: Pick<SanityProject, "category" | "year" | "featured">[],
): ProjectStatistics {
  const counts = new Map(categories.filter((category) => category !== "All").map((category) => [category, 0]));
  const decades = [1990, 2000, 2010, 2020].map((start) => ({ start, label: `${start}s`, count: 0 }));
  let featuredProjects = 0;

  for (const project of projects) {
    if (project.category) counts.set(project.category, (counts.get(project.category) || 0) + 1);
    if (project.featured) featuredProjects += 1;
    const year = Number.parseInt(project.year, 10);
    const decade = decades.find(({ start }) => year >= start && year < start + 10);
    if (decade) decade.count += 1;
  }

  const categoryCounts = [...counts].map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
  return {
    totalProjects: projects.length,
    sectorsServed: categoryCounts.filter(({ count }) => count > 0).length,
    featuredProjects,
    categories: categoryCounts,
    decades: decades.map(({ label, count }) => ({ label, count })),
  };
}
