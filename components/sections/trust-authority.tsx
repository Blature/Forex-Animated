"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { WorldMap } from "@/components/three/world-map";
import { AnimatedSection } from "@/components/motion/animated-section";

/**
 * Trust & Authority (design-system/MASTER.md §7 trust layer, §5 motion).
 * Animated data-center map, an infinite marquee of award/rating logos, and a
 * regulation badge. Marquee + map animations stop under reduced-motion.
 */

const LOGOS = [
  { src: "/trust/wikifx.webp", alt: "WikiFX rating", w: 284, h: 99 },
  { src: "/trust/myfxbook.webp", alt: "Myfxbook verified", w: 284, h: 99 },
  { src: "/trust/trustpilot.webp", alt: "Trustpilot rating", w: 284, h: 99 },
  { src: "/trust/award-1.webp", alt: "Premium Trading Experience — FX Expo Dubai 2023", w: 702, h: 241 },
  { src: "/trust/award-2.webp", alt: "Industry award", w: 588, h: 241 },
  { src: "/trust/award-3.webp", alt: "Industry award", w: 632, h: 241 },
  { src: "/trust/award-4.webp", alt: "Industry award", w: 886, h: 241 },
  { src: "/trust/award-5.webp", alt: "Industry award", w: 886, h: 241 },
];

export function TrustAuthority() {
  return (
    <section
      id="company"
      className="relative mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <AnimatedSection className="mb-12 text-center" amount={0.4}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
          Trust &amp; Authority
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          Built on infrastructure you can trust
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-balance text-[color:var(--fg-muted)]">
          Co-located in the world&rsquo;s premier financial data centers, with
          recognition from the industry&rsquo;s most trusted names.
        </p>

        {/* Regulation badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold-tint)] px-4 py-2">
          <ShieldCheck
            className="size-4 text-[color:var(--gold-soft)]"
            strokeWidth={1.75}
            aria-hidden
          />
          <span className="text-sm font-medium text-[color:var(--fg)]">
            Founded 2019 · Regulated by Comoros MISA
          </span>
        </div>
      </AnimatedSection>

      {/* Animated data-center map */}
      <AnimatedSection
        className="relative mx-auto max-w-4xl rounded-3xl border border-border bg-surface-1/40 p-5 backdrop-blur-md sm:p-8"
        amount={0.25}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        />
        <WorldMap />
        <p className="mt-4 text-center text-xs text-[color:var(--fg-subtle)]">
          Equinix NY4 (New York) &amp; TY3 (Tokyo) — institutional-grade
          execution with ultra-low latency.
        </p>
      </AnimatedSection>

      {/* Awards / ratings marquee */}
      <AnimatedSection className="mt-16" amount={0.3}>
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]">
          Recognised &amp; rated by
        </p>
        <AwardsMarquee />
      </AnimatedSection>
    </section>
  );
}

function AwardsMarquee() {
  const reduce = useReducedMotion();
  const row = [...LOGOS, ...LOGOS]; // duplicate for seamless loop

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-4"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {row.map((logo, i) => (
          <div
            key={i}
            className="flex h-16 shrink-0 items-center rounded-xl border border-white/10 bg-white/95 px-6 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.w}
              height={logo.h}
              sizes="160px"
              style={{ height: "2.25rem", width: "auto" }}
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
