import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
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
      <section className="relative bg-slate-900 pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Portfolio</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8">
              Projects That Stand
              <br />
              The Test of <span className="text-accent-400">Time</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Over 100 projects across 14 sectors — from high-rise residential
              towers to industrial complexes, infrastructure, and structural audits.
            </p>
          </FadeIn>
        </div>
      </section>

      <ProjectsGrid />
    </>
  );
}
