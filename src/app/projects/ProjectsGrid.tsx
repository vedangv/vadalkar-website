"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories, categorySlug } from "@/data/projects";
import type { SanityProject } from "@/sanity/lib/queries";

export default function ProjectsGrid({ projects }: { projects: SanityProject[] }) {
  const [active, setActive] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter */}
      <section className="bg-slate-900 border-b border-slate-800 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent pr-2"
              aria-label="Scroll categories left"
            >
              <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto py-4 scrollbar-hide px-1"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={cat === active}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  cat === active
                    ? "bg-primary-500 text-white"
                    : "bg-transparent text-slate-300 border border-slate-700 hover:border-accent-400 hover:text-accent-400"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({projects.filter((p) => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-gradient-to-l from-slate-900 via-slate-900/95 to-transparent pl-2"
              aria-label="Scroll categories right"
            >
              <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </section>

      {/* Results count */}
      <section className="bg-slate-950 pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-400">
            Showing <span className="font-semibold text-white">{filtered.length}</span>{" "}
            project{filtered.length !== 1 ? "s" : ""}
            {active !== "All" && (
              <>
                {" "}in <span className="font-semibold text-white">{active}</span>
              </>
            )}
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-8 pb-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => {
              const card = (
                <div className="group bg-slate-900 overflow-hidden border border-slate-800 hover:border-accent-400/50 transition-all duration-300 h-full">
                  <div className="aspect-[4/3] relative bg-gradient-to-br from-primary-500/90 to-slate-700 flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        unoptimized
                      />
                    ) : (
                      <svg
                        className="w-10 h-10 text-white/10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z"
                        />
                      </svg>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 z-[1]" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-accent-400 text-slate-900 text-[10px] font-black px-3 py-1 uppercase tracking-tight">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 uppercase tracking-tight">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h2 className="text-base font-semibold text-white uppercase tracking-tight mb-2 leading-snug">
                      {project.title}
                    </h2>
                    <p className="text-sm text-slate-400 mb-1">
                      Client: {project.client}
                    </p>
                    {project.architect && (
                      <p className="text-sm text-slate-400">
                        Architect: {project.architect}
                      </p>
                    )}
                    {project.cost && (
                      <div className="pt-3 mt-3 border-t border-slate-800 flex justify-between items-center">
                        <span className="text-accent-400 font-black text-sm">Rs. {project.cost} Lakhs</span>
                        <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              );

              return project.featured && project.slug ? (
                <Link key={i} href={`/projects/${categorySlug(project.category)}/${project.slug}`} className="block">
                  {card}
                </Link>
              ) : (
                <div key={i}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
