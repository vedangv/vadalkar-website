"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectStatistics } from "@/lib/project-statistics";

import { useCountUp } from "@/lib/useCountUp";

export default function HomeStats({ statistics, yearsActive = 36 }: { statistics: ProjectStatistics, yearsActive?: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { totalProjects, sectorsServed, featuredProjects } = statistics;
  const categoryData = statistics.categories.slice(0, 8);
  const maxCount = Math.max(categoryData[0]?.count || 0, 1);

  const totalAnim = useCountUp(totalProjects, isVisible);
  const sectorsAnim = useCountUp(sectorsServed, isVisible);
  const yearsAnim = useCountUp(yearsActive, isVisible);
  const featuredAnim = useCountUp(featuredProjects, isVisible);

  return (
    <div ref={sectionRef}>
      {/* Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 mb-16">
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-primary-500 tabular-nums">
            {totalAnim}
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Projects Delivered
          </p>
        </div>
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-primary-500 tabular-nums">
            {sectorsAnim}
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Sectors Served
          </p>
        </div>
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-primary-500 tabular-nums">
            {yearsAnim}
            <span className="text-3xl sm:text-4xl">+</span>
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Years of Experience
          </p>
        </div>
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-primary-500 tabular-nums">
            {featuredAnim}
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Landmark Projects
          </p>
        </div>
      </div>

      {/* Horizontal bar chart — top categories */}
      <div className="space-y-3">
        {categoryData.map((cat) => {
          const widthPercent = (cat.count / maxCount) * 100;
          return (
            <div key={cat.name}>
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
                  className="h-full bg-accent-400 rounded-full transition-all duration-1000 ease-out"
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
  );
}
