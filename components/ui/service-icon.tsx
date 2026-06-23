"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import {
  ShieldCheck,
  ArrowLeftRight,
  RadioTower,
  Gift,
  Users,
  Headset,
  ArrowUp,
  Sparkle,
  type LucideIcon,
} from "lucide-react";

/**
 * ServiceIcon — animated icon for each Special Service block (design-system/
 * MASTER.md §5: transform/opacity-only, motion conveys meaning, 1–2 elements).
 * Each variant pairs a Lucide glyph in a glass tile (gentle float) with a
 * meaning-specific decoration. All motion stops under reduced-motion.
 */

export type ServiceVariant =
  | "antiMargin"
  | "hedge"
  | "signals"
  | "bonus"
  | "copy"
  | "support";

const ICONS: Record<ServiceVariant, LucideIcon> = {
  antiMargin: ShieldCheck,
  hedge: ArrowLeftRight,
  signals: RadioTower,
  bonus: Gift,
  copy: Users,
  support: Headset,
};

export function ServiceIcon({ variant }: { variant: ServiceVariant }) {
  const reduce = useReducedMotion();
  const Base = ICONS[variant];

  return (
    <div className="relative flex size-32 items-center justify-center">
      {variant === "signals" && <PulseRings reduce={!!reduce} />}
      {variant === "support" && <DashRing reduce={!!reduce} />}
      {variant === "copy" && <OrbitDot reduce={!!reduce} />}
      {variant === "bonus" && <Sparkles reduce={!!reduce} />}
      {variant === "hedge" && <HedgeBars reduce={!!reduce} />}
      {variant === "antiMargin" && <ReturnArrow reduce={!!reduce} />}

      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex size-16 items-center justify-center rounded-2xl border border-border bg-[color:var(--surface-2)]/70 text-brand backdrop-blur"
      >
        <Base className="size-8" strokeWidth={1.6} aria-hidden />
      </motion.div>
    </div>
  );
}

/* ── decorations ──────────────────────────────────────────────────────── */

function PulseRings({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute size-16 rounded-full border border-[color:var(--brand)]"
          initial={{ scale: 0.6, opacity: 0.5 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </>
  );
}

function DashRing({ reduce }: { reduce: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute size-28 text-[color:var(--brand)] opacity-40"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="6 9"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

function OrbitDot({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="absolute size-24"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 rounded-full bg-brand shadow-[0_0_10px_var(--brand-glow)]" />
    </motion.div>
  );
}

function Sparkles({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  const pts = [
    { x: -32, y: -22, d: 0 },
    { x: 30, y: -14, d: 0.6 },
    { x: 20, y: 26, d: 1.1 },
    { x: -24, y: 24, d: 1.6 },
  ];
  return (
    <>
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 text-gold"
          initial={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: p.d, ease: "easeOut" }}
        >
          <Sparkle className="size-3.5" fill="currentColor" />
        </motion.span>
      ))}
    </>
  );
}

function HedgeBars({ reduce }: { reduce: boolean }) {
  const t = { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const };
  return (
    <>
      <motion.span
        className="absolute left-2 top-1/2 -mt-4 h-8 w-1.5 rounded-full bg-[color:var(--up)] opacity-70"
        animate={reduce ? undefined : { y: [-4, 4, -4] }}
        transition={t}
      />
      <motion.span
        className="absolute right-2 top-1/2 -mt-4 h-8 w-1.5 rounded-full bg-[color:var(--down)] opacity-70"
        animate={reduce ? undefined : { y: [4, -4, 4] }}
        transition={t}
      />
    </>
  );
}

function ReturnArrow({ reduce }: { reduce: boolean }) {
  if (reduce) return null;
  return (
    <motion.span
      className="absolute bottom-2 left-1/2 -ml-2 text-[color:var(--up)]"
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: [4, -16], opacity: [0, 1, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
    >
      <ArrowUp className="size-4" strokeWidth={2.5} aria-hidden />
    </motion.span>
  );
}
