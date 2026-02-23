"use client";

import { useState } from "react";
import { projects, categories } from "@/data/projects";

export default function ProjectsGrid() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  cat === active
                    ? "bg-primary-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
        </div>
      </section>

      {/* Results count */}
      <section className="bg-slate-50 pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
            project{filtered.length !== 1 ? "s" : ""}
            {active !== "All" && (
              <>
                {" "}in <span className="font-semibold text-slate-700">{active}</span>
              </>
            )}
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-8 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-32 bg-gradient-to-br from-primary-500/90 to-slate-700 relative flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white/20"
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
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent-400 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-1">
                    Client: {project.client}
                  </p>
                  {project.architect && (
                    <p className="text-sm text-slate-400">
                      Architect: {project.architect}
                    </p>
                  )}
                  {project.cost && (
                    <p className="text-xs text-accent-600 font-medium mt-2">
                      Rs. {project.cost} Lakhs
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
