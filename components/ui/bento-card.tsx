"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * BentoCard — glass surface that tilts toward the cursor (3D) and lights up
 * with a cursor-following brand glow on hover (design-system/MASTER.md §5
 * transform-only, §6 glass cards). Tilt/glow are disabled under
 * prefers-reduced-motion; the static glass card remains.
 */
export function BentoCard({
  children,
  className,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rxBase = useMotionValue(0);
  const ryBase = useMotionValue(0);
  const rotateX = useSpring(rxBase, { stiffness: 160, damping: 18 });
  const rotateY = useSpring(ryBase, { stiffness: 160, damping: 18 });

  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, var(--brand-glow), transparent 65%)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rxBase.set((0.5 - py) * 6); // max ~6° tilt
    ryBase.set((px - 0.5) * 6);
    gx.set(px * 100);
    gy.set(py * 100);
  }
  function onLeave() {
    rxBase.set(0);
    ryBase.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border border-border bg-surface-1/60 backdrop-blur-md transition-colors duration-200 hover:border-[color:var(--border-accent)]",
        accent && "bg-[color:var(--brand-tint)]",
        className,
      )}
    >
      {/* cursor-following brand glow */}
      <motion.span
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* glass top edge highlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
