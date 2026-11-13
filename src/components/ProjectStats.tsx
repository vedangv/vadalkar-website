"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectStatistics } from "@/lib/project-statistics";

import { useCountUp } from "@/lib/useCountUp";

export default function ProjectStats({ statistics, yearsActive = 36 }: { statistics: ProjectStatistics, yearsActive?: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    // Counting is optional; keep the server-rendered totals if observation is unavailable.
    if (!el || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { totalProjects, sectorsServed, featuredProjects } = statistics;
  const categoryData = statistics.categories;
  const maxCount = Math.max(categoryData[0]?.count || 0, 1);
  const decades = statistics.decades;

  const totalCount = useCountUp(totalProjects, isVisible);
  const sectorsCount = useCountUp(sectorsServed, isVisible);

  return (
    <div ref={sectionRef}>
      {/* Summary counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-20">
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-primary-500 tabular-nums">
            {totalCount}
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Total Projects
          </p>
        </div>
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-primary-500 tabular-nums">
            {sectorsCount}
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Sectors Served
          </p>
        </div>
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-primary-500 tabular-nums">
            {useCountUp(yearsActive, isVisible)}
            <span className="text-3xl sm:text-4xl">+</span>
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Years of Experience
          </p>
        </div>
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-primary-500 tabular-nums">
            {useCountUp(
              featuredProjects,
              isVisible
            )}
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Landmark Projects
          </p>
        </div>
      </div>

      {/* Horizontal bar chart */}
      <div className="mb-20">
        <h3 className="text-lg font-semibold text-slate-900 mb-8">
          Projects by Category
        </h3>
        <div className="space-y-4">
          {categoryData.map((cat) => {
            const widthPercent = (cat.count / maxCount) * 100;
            return (
              <div key={cat.name} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-600 font-medium">
                    {cat.name}
                  </span>
                  <span className="text-sm text-slate-600 tabular-nums font-medium">
                    {cat.count}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decade breakdown */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-8">
          Projects by Decade
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {decades.map((d) => (
            <div
              key={d.label}
              className="border border-slate-200 rounded-xl p-6 text-center hover:border-accent-200 transition-colors"
            >
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 tabular-nums">
                {d.count}
              </p>
              <p className="text-slate-600 mt-1 text-sm font-medium uppercase tracking-wider">
                {d.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
