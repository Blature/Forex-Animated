"use client";

import { useEffect, useState } from "react";
import { useReducedMotion as useFramerReducedMotion } from "motion/react";

/**
 * SSR-safe reduced-motion hook. Returns `false` on the server and on the first
 * client render, then the user's real preference after mount. This keeps the
 * initial client render identical to the server output, so reduce-dependent
 * markup (conditional decorations, className toggles) never causes a hydration
 * mismatch. Motion only begins after mount anyway, so gating costs nothing.
 */
export function useReducedMotion(): boolean {
  const reduce = useFramerReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? !!reduce : false;
}
