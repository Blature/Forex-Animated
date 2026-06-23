"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import {
  Percent,
  Gauge,
  Layers,
  Zap,
  Minus,
  ShieldCheck,
  Server,
  type LucideIcon,
} from "lucide-react";

/**
 * Stats band (design-system/MASTER.md §5.3 "Number roll", §6 glass cards).
 * Count-up driven by GSAP ScrollTrigger when the band scrolls into view,
 * with a staggered glass-card reveal. Honors prefers-reduced-motion: values
 * appear at their final figure with no count / no slide.
 */

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  icon: LucideIcon;
  label: string;
  // numeric (count-up) …
  end?: number;
  start?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  // … or static text
  text?: string;
};

const STATS: Stat[] = [
  { icon: Percent, end: 0, start: 6, suffix: "%", label: "Funding Fees" },
  { icon: Gauge, end: 300, start: 0, prefix: "1:", label: "Max Leverage" },
  { icon: Layers, end: 0.01, start: 0, decimals: 2, label: "Micro Lot" },
  { icon: Zap, end: 10, start: 0, prefix: "<", suffix: "ms", label: "Avg Execution" },
  { icon: Minus, end: 0, start: 1.2, decimals: 1, label: "Spread · EUR/USD" },
  { icon: ShieldCheck, text: "Protected", label: "Negative Balance" },
  { icon: Server, text: "NY4 · TY3", label: "Tier‑1 Data Centres" },
];

const fmt = (s: Stat, v: number) =>
  `${s.prefix ?? ""}${v.toFixed(s.decimals ?? 0)}${s.suffix ?? ""}`;

export function StatsBand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: show final figures immediately, no reveal, no count.
    if (reduce) {
      setStarted(true);
      return;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-stat-card]");
      gsap.set(cards, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          setStarted(true); // kick off react-countup
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out", // ≈ MASTER ease-out
            stagger: 0.06, // ~60ms per card (MASTER §5.3)
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={ref}
      id="stats"
      className="relative mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
        Built for serious execution
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              data-stat-card
              className="group relative overflow-hidden rounded-2xl border border-border bg-[color:var(--surface-1)]/55 p-5 backdrop-blur-md transition-colors duration-200 hover:border-[color:var(--border-strong)]"
            >
              {/* top hairline highlight — glass edge */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
              {/* faint brand glow behind the icon */}
              <span
                aria-hidden
                className="pointer-events-none absolute -left-6 -top-6 size-20 rounded-full bg-[color:var(--brand-glow)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              />

              <Icon
                className="mb-3 size-5 text-brand"
                strokeWidth={1.75}
                aria-hidden
              />

              <div
                className="font-mono text-3xl font-semibold tabular-nums text-foreground sm:text-4xl"
                data-numeric
              >
                {/* Initial (pre-start) render is reduce-independent so SSR and
                    first client render match (avoids hydration mismatch). */}
                {stat.text ? (
                  stat.text
                ) : !started ? (
                  fmt(stat, stat.start ?? 0)
                ) : reduce ? (
                  fmt(stat, stat.end ?? 0)
                ) : (
                  <CountUp
                    start={stat.start ?? 0}
                    end={stat.end ?? 0}
                    duration={2}
                    decimals={stat.decimals ?? 0}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                )}
              </div>

              <div className="mt-1.5 text-xs font-medium uppercase tracking-wide text-[color:var(--fg-muted)]">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
