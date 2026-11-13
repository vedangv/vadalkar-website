import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { connection } from "next/server";
import ProjectsGrid from "./ProjectsGrid";
import { getProjects } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const projects = await getProjects();
  const sectors = new Set(projects.map((project) => project.category).filter(Boolean)).size;

  return pageMetadata({
    title: "Our Projects | Vadalkar And Associates",
    description: `Explore ${projects.length} structural engineering projects across ${sectors} sectors, including residential, commercial, industrial, and infrastructure work.`,
    path: "/projects",
  });
}

export default async function ProjectsPage() {
  // Render the URL-backed client filters with the incoming request's query.
  await connection();
  const projects = await getProjects();
  const sectors = new Set(projects.map((project) => project.category).filter(Boolean)).size;
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Portfolio</span>
            </div>
          </div>
          <h1 className="hero-animate text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8" style={{ animationDelay: "0.2s" }}>
            Projects That Stand
            <br />
            The Test of <span className="text-accent-400">Time</span>
          </h1>
          <p className="hero-animate text-xl text-slate-300 max-w-2xl leading-relaxed" style={{ animationDelay: "0.3s" }}>
            {projects.length} projects across {sectors} sectors — from high-rise residential
            towers to industrial complexes, infrastructure, and structural audits.
          </p>
        </div>
      </section>

      <ProjectsGrid projects={projects} />
    </>
  );
}
