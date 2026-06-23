"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * CandlestickMotif — subtle, slowly-streaming candlestick chart for the
 * background of a feature card (design-system/MASTER.md §5.3 live-ticker
 * "slow & even"). Deterministic data (fixed seed) so SSR/CSR match; one
 * transform-only marquee (no layout anim). Static under reduced-motion.
 */

const N = 24;
const STEP = 16;
const W = N * STEP;
const H = 120;

function buildCandles() {
  let s = 1337; // fixed seed → stable across SSR/CSR
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  const out: {
    x: number;
    up: boolean;
    bodyY: number;
    bodyH: number;
    wickY: number;
    wickH: number;
  }[] = [];
  let price = 60;
  for (let i = 0; i < N; i++) {
    const open = price;
    const close = Math.max(15, Math.min(105, open + (rnd() - 0.5) * 22));
    const high = Math.max(open, close) + rnd() * 8;
    const low = Math.min(open, close) - rnd() * 8;
    out.push({
      x: i * STEP + STEP / 2,
      up: close >= open,
      bodyY: H - Math.max(open, close),
      bodyH: Math.max(2, Math.abs(close - open)),
      wickY: H - high,
      wickH: high - low,
    });
    price = close;
  }
  return out;
}

const CANDLES = buildCandles();

function CandleSet() {
  const bw = 6;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-full w-1/2 shrink-0"
    >
      {CANDLES.map((c, i) => {
        const color = c.up ? "var(--up)" : "var(--down)";
        return (
          <g key={i} stroke={color} fill={color}>
            <line
              x1={c.x}
              x2={c.x}
              y1={c.wickY}
              y2={c.wickY + c.wickH}
              strokeWidth={1}
            />
            <rect x={c.x - bw / 2} y={c.bodyY} width={bw} height={c.bodyH} rx={1} />
          </g>
        );
      })}
    </svg>
  );
}

export function CandlestickMotif() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.45] [mask-image:linear-gradient(to_top,#000_0%,#000_28%,transparent_78%)]"
    >
      <motion.div
        className="flex h-full w-[200%]"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        <CandleSet />
        <CandleSet />
      </motion.div>
    </div>
  );
}
