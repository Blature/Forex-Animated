"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — global Lenis provider (design-system/MASTER.md §5).
 *
 * Gives the cinematic, "spacey" inertial scroll feel across all sections.
 * Honors prefers-reduced-motion: when the user opts out, Lenis is never
 * instantiated and the browser keeps native (instant) scrolling.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.1, // inertia — lower = heavier/slower glide
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
