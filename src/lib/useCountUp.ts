"use client";

import { useEffect, useState } from "react";

export function useCountUp(target: number, isVisible: boolean, duration = 1500) {
  const [frame, setFrame] = useState<{ target: number; value: number } | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!isVisible || duration <= 0 || reducedMotion.matches) return;

    const startedAt = performance.now();
    let frameId: number;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setFrame({ target, value: Math.round(eased * target) });
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    const stopMotion = () => {
      if (!reducedMotion.matches) return;
      cancelAnimationFrame(frameId);
      setFrame(null);
    };
    reducedMotion.addEventListener("change", stopMotion);
    return () => {
      cancelAnimationFrame(frameId);
      reducedMotion.removeEventListener("change", stopMotion);
    };
  }, [target, isVisible, duration]);

  // The server-rendered and reduced-motion versions always show the real value.
  return isVisible && frame?.target === target ? frame.value : target;
}
