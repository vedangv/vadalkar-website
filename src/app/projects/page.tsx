import type { Metadata } from "next";
import ProjectsGrid from "./ProjectsGrid";

export const metadata: Metadata = {
  title: "Our Projects | Vadalkar And Associates",
  description:
    "Explore our portfolio of 100+ structural engineering projects across residential, commercial, industrial, and infrastructure sectors.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-primary-500 to-slate-800 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Our Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Projects That Stand
            <br />
            The Test of Time
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Over 100 projects across 14 sectors — from high-rise residential
            towers to industrial complexes, infrastructure, and structural audits.
          </p>
        </div>
      </section>

      <ProjectsGrid />
    </>
  );
}
