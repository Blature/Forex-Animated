"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * MagneticButton — a link/button that is gently pulled toward the cursor on
 * hover, with a spring return (design-system/MASTER.md §5: spring physics,
 * scale press feedback, transform-only). The inner label trails slightly for
 * a layered, premium feel.
 *
 * Honors prefers-reduced-motion (MASTER §5.4): the magnetic pull is disabled.
 */
interface MagneticButtonProps extends HTMLMotionProps<"a"> {
  /** Pull strength as a fraction of cursor offset (0–1). */
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 220, damping: 16, mass: 0.3 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  // label trails at a fraction of the button offset (parallax)
  const lx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.2 });
  const ly = useSpring(y, { stiffness: 260, damping: 20, mass: 0.2 });

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      className={cn(
        "relative inline-flex select-none items-center justify-center will-change-transform",
        className,
      )}
      {...props}
    >
      <motion.span
        style={reduce ? undefined : { x: lx, y: ly }}
        className="pointer-events-none inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
