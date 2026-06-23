"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * WorldMap — stylized equirectangular graticule with NY4 (New York) and TY3
 * (Tokyo) data-center nodes and a pulsing latency line between them
 * (design-system/MASTER.md §5: subtle, transform/opacity, meaning-driven).
 * Nodes are plotted at real lon/lat. Static under reduced-motion.
 */

const W = 1000;
const H = 460;

// equirectangular projection of real coordinates
const project = (lon: number, lat: number) => ({
  x: ((lon + 180) / 360) * W,
  y: ((90 - lat) / 180) * H,
});

const NY = project(-74, 40.7); // New York — NY4
const TY = project(139.7, 35.7); // Tokyo — TY3
const ARC = `M${NY.x} ${NY.y} Q ${(NY.x + TY.x) / 2} ${Math.min(NY.y, TY.y) - 90} ${TY.x} ${TY.y}`;

const V_LINES = Array.from({ length: 11 }, (_, i) => ((i + 1) * W) / 12);
const H_LINES = Array.from({ length: 5 }, (_, i) => ((i + 1) * H) / 6);

function Node({
  x,
  y,
  code,
  city,
  labelAnchor,
  reduce,
}: {
  x: number;
  y: number;
  code: string;
  city: string;
  labelAnchor: "start" | "end";
  reduce: boolean;
}) {
  const lx = labelAnchor === "end" ? x - 14 : x + 14;
  return (
    <g>
      {!reduce &&
        [0, 1].map((i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            fill="none"
            stroke="var(--brand)"
            strokeWidth={1.2}
            initial={{ r: 5, opacity: 0.5 }}
            animate={{ r: 22, opacity: 0 }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.3,
            }}
          />
        ))}
      <circle cx={x} cy={y} r={6} fill="var(--brand)" />
      <circle cx={x} cy={y} r={2.5} fill="var(--brand-foreground)" />
      <text
        x={lx}
        y={y - 4}
        textAnchor={labelAnchor}
        className="fill-[color:var(--fg)] font-mono text-[20px] font-semibold"
      >
        {code}
      </text>
      <text
        x={lx}
        y={y + 14}
        textAnchor={labelAnchor}
        className="fill-[color:var(--fg-subtle)] font-mono text-[15px]"
      >
        {city}
      </text>
    </g>
  );
}

export function WorldMap() {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="World map showing STP data centers at NY4 New York and TY3 Tokyo connected by a low-latency link"
    >
      {/* graticule */}
      <g stroke="var(--grid-line)" strokeWidth={1}>
        <rect x={0.5} y={0.5} width={W - 1} height={H - 1} fill="none" />
        {V_LINES.map((x) => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} />
        ))}
        {H_LINES.map((y) => (
          <line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} />
        ))}
      </g>
      {/* graticule intersection dots for map texture */}
      <g fill="var(--border)">
        {V_LINES.map((x) =>
          H_LINES.map((y) => <circle key={`d${x}-${y}`} cx={x} cy={y} r={1.4} />),
        )}
      </g>

      {/* latency line */}
      <path d={ARC} fill="none" stroke="var(--brand)" strokeOpacity={0.25} strokeWidth={1.5} />
      <motion.path
        d={ARC}
        fill="none"
        stroke="var(--brand)"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeDasharray="4 12"
        animate={reduce ? undefined : { strokeDashoffset: [0, -32] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
      />
      {/* traveling data packet */}
      {!reduce && (
        <circle r={3.5} fill="var(--brand)">
          <animateMotion dur="3.2s" repeatCount="indefinite" path={ARC} />
        </circle>
      )}

      <Node {...NY} code="NY4" city="New York" labelAnchor="start" reduce={!!reduce} />
      <Node {...TY} code="TY3" city="Tokyo" labelAnchor="end" reduce={!!reduce} />
    </svg>
  );
}
