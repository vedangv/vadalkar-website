"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { projects, categories } from "@/data/projects";

function useCountUp(target: number, isVisible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (current !== start) {
        start = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return count;
}

export default function ProjectStats() {
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeCats = useMemo(
    () => categories.filter((c) => c !== "All"),
    []
  );

  const categoryData = useMemo(() => {
    const data = activeCats
      .map((cat) => ({
        name: cat,
        count: projects.filter((p) => p.category === cat).length,
      }))
      .sort((a, b) => b.count - a.count);
    return data;
  }, [activeCats]);

  const maxCount = categoryData.length > 0 ? categoryData[0].count : 1;

  const decades = useMemo(() => {
    const ranges = [
      { label: "1990s", min: 1990, max: 1999 },
      { label: "2000s", min: 2000, max: 2009 },
      { label: "2010s", min: 2010, max: 2019 },
      { label: "2020s", min: 2020, max: 2029 },
    ];

    return ranges.map((r) => ({
      label: r.label,
      count: projects.filter((p) => {
        const y = parseInt(p.year, 10);
        return !isNaN(y) && y >= r.min && y <= r.max;
      }).length,
    }));
  }, []);

  const totalProjects = projects.length;
  const sectorsServed = activeCats.length;

  const totalCount = useCountUp(totalProjects, isVisible);
  const sectorsCount = useCountUp(sectorsServed, isVisible);

  return (
    <div ref={sectionRef}>
      {/* Summary counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-20">
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-accent-400 tabular-nums">
            {totalCount}
            <span className="text-3xl sm:text-4xl">+</span>
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Total Projects
          </p>
        </div>
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-accent-400 tabular-nums">
            {sectorsCount}
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Sectors Served
          </p>
        </div>
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-accent-400 tabular-nums">
            {useCountUp(30, isVisible)}
            <span className="text-3xl sm:text-4xl">+</span>
          </p>
          <p className="text-slate-500 mt-2 text-sm uppercase tracking-widest font-medium">
            Years Active
          </p>
        </div>
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-accent-400 tabular-nums">
            {useCountUp(
              projects.filter((p) => p.featured).length,
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
                  <span className="text-sm text-slate-400 tabular-nums font-medium">
                    {cat.count}
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isVisible ? `${widthPercent}%` : "0%",
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
                {isVisible ? d.count : 0}
              </p>
              <p className="text-slate-400 mt-1 text-sm font-medium uppercase tracking-wider">
                {d.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
