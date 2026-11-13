"use client";

import { useEffect, useRef, type ReactNode } from "react";

const offsets = {
  up: "translateY(24px)",
  down: "translateY(-24px)",
  left: "translateX(24px)",
  right: "translateX(-24px)",
  none: "none",
};

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element?.animate || reducedMotion.matches || !("IntersectionObserver" in window)) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      animation = element.animate([
        { opacity: 0, transform: offsets[direction] },
        { opacity: 1, transform: "none" },
      ], {
        duration: 700,
        delay: delay * 1000,
        easing: "cubic-bezier(0.21, 0.47, 0.32, 0.98)",
        fill: "backwards",
      });
      observer.disconnect();
    }, { rootMargin: "0px 0px -40px 0px" });
    observer.observe(element);

    const stopMotion = () => {
      if (!reducedMotion.matches) return;
      animation?.cancel();
      observer.disconnect();
    };
    reducedMotion.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animation?.cancel();
      reducedMotion.removeEventListener("change", stopMotion);
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
