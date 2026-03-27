"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { categories } from "@/data/projects";
import type { SanityProject } from "@/sanity/lib/queries";

function useCountUp(target: number, isVisible: boolean, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
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

export default function HomeStats({ projects, yearsActive = 36 }: { projects: SanityProject[], yearsActive?: number }) {
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

  const activeCats = useMemo(
    () => categories.filter((c) => c !== "All"),
    []
  );

  const categoryData = useMemo(() => {
    return activeCats
      .map((cat) => ({
        name: cat,
        count: projects.filter((p) => p.category === cat).length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [activeCats]);

  const maxCount = categoryData.length > 0 ? categoryData[0].count : 1;

  const totalProjects = projects.length;
  const sectorsServed = activeCats.length;
  const featuredCount = projects.filter((p) => p.featured).length;

  const totalAnim = useCountUp(totalProjects, isVisible);
  const sectorsAnim = useCountUp(sectorsServed, isVisible);
  const yearsAnim = useCountUp(yearsActive, isVisible);
  const featuredAnim = useCountUp(featuredCount, isVisible);

  return (
    <div ref={sectionRef}>
      {/* Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 mb-16">
        <div>
          <p className="text-5xl sm:text-6xl font-bold text-primary-500 tabular-nums">
            {totalAnim}
            <span className="text-3xl sm:text-4xl">+</span>
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
            Years Active
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
                <span className="text-sm text-slate-400 tabular-nums font-medium">
                  {cat.count}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-400 rounded-full transition-all duration-1000 ease-out"
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
  );
}
