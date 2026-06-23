"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, type Variants } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

// 3D canvas is client-only; skip SSR to avoid hydration/WebGL mismatch.
const ParticleField = dynamic(
  () => import("@/components/three/particle-field").then((m) => m.ParticleField),
  { ssr: false },
);

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Kinetic headline — each word rises from behind a mask, staggered.
const HEADLINE: { t: string; brand?: boolean; br?: boolean }[] = [
  { t: "Simple," },
  { t: "Straight-forward" },
  { t: "", br: true },
  { t: "Trading", brand: true },
];

export function Hero() {
  const reduce = useReducedMotion();
  const animate = !reduce;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.07, delayChildren: 0.15 },
    },
  };
  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: "115%" },
    show: reduce
      ? { opacity: 1 }
      : { y: 0, transition: { duration: 0.6, ease: EASE } },
  };
  const fade: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    show: reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  };

  return (
    <section
      id="top"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-28 text-center sm:px-6"
    >
      {/* 3D particle field */}
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden>
        <ParticleField animate={animate} />
        {/* legibility scrim so text never fights the field */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,transparent,var(--bg-deep)_85%)]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex w-full max-w-3xl flex-col items-center"
      >
        {/* Eyebrow */}
        <motion.div
          variants={fade}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface-1)]/60 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex size-1.5">
            <span
              className={
                "absolute inline-flex size-full rounded-full bg-brand " +
                (animate ? "animate-ping opacity-60" : "")
              }
            />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--fg-muted)]">
            STP execution · deep liquidity · transparent pricing
          </span>
        </motion.div>

        {/* Kinetic headline */}
        <h1 className="font-heading text-[clamp(2.5rem,7vw,4.25rem)] font-bold leading-[1.04] tracking-[-0.02em]">
          {HEADLINE.map((w, i) =>
            w.br ? (
              <span key={i} className="block h-0 w-full" />
            ) : (
              <span
                key={i}
                className="mx-[0.18em] inline-block overflow-hidden align-bottom pb-[0.08em]"
              >
                <motion.span
                  variants={rise}
                  className={
                    "inline-block " + (w.brand ? "text-brand" : "text-foreground")
                  }
                >
                  {w.t}
                </motion.span>
              </span>
            ),
          )}
        </h1>

        {/* Subhead */}
        <motion.p
          variants={fade}
          className="mt-6 max-w-xl text-balance text-base text-[color:var(--fg-muted)] sm:text-lg"
        >
          We always put our traders first.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fade}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticButton
            href="#start"
            strength={0.4}
            className="h-12 w-full rounded-md bg-brand px-7 text-sm font-semibold text-[color:var(--brand-foreground)] shadow-[0_0_0_1px_var(--brand-press),0_14px_40px_-10px_var(--brand-glow)] transition-colors duration-150 hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            Start Trading
          </MagneticButton>
          <MagneticButton
            href="#practice"
            strength={0.25}
            className="h-12 w-full rounded-md border border-input px-7 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-[color:var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] sm:w-auto"
          >
            Practice for Free
          </MagneticButton>
        </motion.div>

        {/* Live bid/ask ticker */}
        <motion.div variants={fade} className="mt-12 w-full">
          <PriceTicker live={animate} />
        </motion.div>
      </motion.div>

      {/* Scroll-down cue */}
      <motion.a
        href="#accounts"
        aria-label="Scroll to explore"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[color:var(--fg-subtle)] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <motion.span
          animate={animate ? { y: [0, 6, 0] } : undefined}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" strokeWidth={1.75} />
        </motion.span>
      </motion.a>
    </section>
  );
}

/* ── Live bid/ask ticker ──────────────────────────────────────────────── */

type Instrument = {
  sym: string;
  bid: number;
  ask: number;
  dp: number;
  pip: number;
};

const INSTRUMENTS: Instrument[] = [
  { sym: "EUR/USD", bid: 1.08421, ask: 1.08435, dp: 5, pip: 0.0001 },
  { sym: "XAU/USD", bid: 2034.18, ask: 2034.52, dp: 2, pip: 0.1 },
  { sym: "USD/JPY", bid: 157.842, ask: 157.861, dp: 3, pip: 0.01 },
];

type Quote = {
  sym: string;
  bid: number;
  ask: number;
  dp: number;
  pip: number;
  dir: 1 | -1 | 0;
};

function seed(): Quote[] {
  return INSTRUMENTS.map((i) => ({
    sym: i.sym,
    bid: i.bid,
    ask: i.ask,
    dp: i.dp,
    pip: i.pip,
    dir: 0,
  }));
}

function PriceTicker({ live }: { live: boolean }) {
  const [quotes, setQuotes] = useState<Quote[]>(seed);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      setQuotes((prev) =>
        prev.map((q, idx) => {
          const meta = INSTRUMENTS[idx];
          const step = (Math.random() - 0.5) * meta.pip * 6;
          const bid = Math.max(meta.pip, q.bid + step);
          const spread = meta.ask - meta.bid;
          const dir: 1 | -1 | 0 = step > 0 ? 1 : step < 0 ? -1 : 0;
          return { ...q, bid, ask: bid + spread, dir };
        }),
      );
    }, 1500);
    return () => clearInterval(id);
  }, [live]);

  return (
    <div
      className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-xl border border-border bg-[color:var(--surface-1)]/50 px-5 py-3 backdrop-blur-sm"
      data-numeric
      role="list"
      aria-label="Live indicative prices"
    >
      {quotes.map((q) => (
        <div
          key={q.sym}
          role="listitem"
          className="flex items-center gap-2.5 font-mono text-xs"
        >
          <span className="font-semibold tracking-tight text-[color:var(--fg-muted)]">
            {q.sym}
          </span>
          <span className="flex items-baseline gap-1">
            <span className="text-[9px] uppercase text-[color:var(--fg-subtle)]">
              bid
            </span>
            <span className="tabular-nums text-foreground">
              {q.bid.toFixed(q.dp)}
            </span>
          </span>
          <span className="flex items-baseline gap-1">
            <span className="text-[9px] uppercase text-[color:var(--fg-subtle)]">
              ask
            </span>
            <span
              className="tabular-nums transition-colors duration-500"
              style={{
                color:
                  q.dir === 1
                    ? "var(--up)"
                    : q.dir === -1
                      ? "var(--down)"
                      : "var(--fg)",
              }}
            >
              {q.ask.toFixed(q.dp)}
            </span>
          </span>
          <span className="flex items-baseline gap-1">
            <span className="text-[9px] uppercase text-[color:var(--fg-subtle)]">
              spread
            </span>
            <span className="tabular-nums text-[color:var(--fg-muted)]">
              {((q.ask - q.bid) / q.pip).toFixed(1)}
            </span>
          </span>
          <span
            aria-hidden
            className="text-[10px]"
            style={{
              color: q.dir === -1 ? "var(--down)" : "var(--up)",
            }}
          >
            {q.dir === -1 ? "▼" : "▲"}
          </span>
        </div>
      ))}
    </div>
  );
}
