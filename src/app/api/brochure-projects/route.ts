import { NextRequest, NextResponse } from "next/server";
import { categories, categorySlug } from "@/data/projects";
import { getProjects } from "@/sanity/lib/queries";

const brochureCategories = categories.filter((category) => category !== "All");

export async function GET(request: NextRequest) {
  const requestedSlug = request.nextUrl.searchParams.get("sector") || "all";
  const selectedCategory = brochureCategories.find(
    (category) => categorySlug(category) === requestedSlug,
  );

  if (requestedSlug !== "all" && !selectedCategory) {
    return NextResponse.json({ error: "Unknown brochure sector" }, { status: 400 });
  }

  const projects = await getProjects();
  const focusedProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;

  const rankedProjects = [...focusedProjects].sort((a, b) => {
    const featuredDifference = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featuredDifference !== 0) return featuredDifference;

    const aYear = Number.parseInt(a.year, 10);
    const bYear = Number.parseInt(b.year, 10);
    const safeAYear = Number.isFinite(aYear) ? aYear : Number.NEGATIVE_INFINITY;
    const safeBYear = Number.isFinite(bYear) ? bYear : Number.NEGATIVE_INFINITY;
    if (safeAYear !== safeBYear) return safeBYear > safeAYear ? 1 : -1;
    return a.title.localeCompare(b.title);
  });

  return NextResponse.json(
    {
      sector: selectedCategory || "All Sectors",
      sectorSlug: requestedSlug,
      total: focusedProjects.length,
      availableSectors: brochureCategories.map((category) => ({
        name: category,
        slug: categorySlug(category),
        count: projects.filter((project) => project.category === category).length,
      })),
      projects: rankedProjects.slice(0, 18).map((project) => ({
        title: project.title,
        category: project.category,
        client: project.client,
        architect: project.architect,
        year: project.year,
        cost: project.cost,
        image: project.image,
        slug: project.slug,
      })),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
