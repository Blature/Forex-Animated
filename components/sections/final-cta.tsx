"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

/**
 * Final CTA (design-system/MASTER.md §5.3 accent gradient, §6 glass).
 * Animated teal gradient-mesh behind a magnetic primary/secondary CTA pair.
 * Mesh drift is transform-only and stops under reduced-motion.
 */
export function FinalCTA() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="relative overflow-hidden rounded-[28px] border border-border bg-surface-1/40 px-6 py-16 text-center backdrop-blur-md sm:px-12 lg:py-24">
        <GradientMesh reduce={!!reduce} />
        {/* glass top edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        />

        <div className="relative z-10 mx-auto max-w-2xl">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Start trading in minutes
          </h2>
          <p className="mx-auto mt-4 max-w-md text-balance text-[color:var(--fg-muted)] sm:text-lg">
            Open a live account with transparent pricing, or practise risk-free
            on a fully-funded demo.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticButton
              href="#start"
              strength={0.4}
              className="h-12 w-full rounded-md bg-brand px-7 text-sm font-semibold text-[color:var(--brand-foreground)] shadow-[0_0_0_1px_var(--brand-press),0_14px_40px_-10px_var(--brand-glow)] transition-colors duration-150 hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
            >
              Start Trading
              <ArrowRight className="size-4" aria-hidden />
            </MagneticButton>
            <MagneticButton
              href="#practice"
              strength={0.25}
              className="h-12 w-full rounded-md border border-input px-7 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-[color:var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] sm:w-auto"
            >
              Practice for Free
            </MagneticButton>
          </div>

          <p className="mt-6 text-xs text-[color:var(--fg-subtle)]">
            No deposit required for demo · 68% of retail CFD accounts lose money.
          </p>
        </div>
      </div>
    </section>
  );
}

function GradientMesh({ reduce }: { reduce: boolean }) {
  const blob = (
    className: string,
    anim: Record<string, number[]> | undefined,
    dur: number,
  ) => (
    <motion.div
      className={cn("absolute rounded-full blur-3xl mix-blend-screen", className)}
      animate={reduce ? undefined : anim}
      transition={{
        duration: dur,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {blob(
        "left-[8%] top-[-30%] size-72 bg-[color:var(--brand)] opacity-20",
        { x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.15, 1] },
        15,
      )}
      {blob(
        "right-[4%] bottom-[-40%] size-80 bg-[color:var(--brand-deep)] opacity-50",
        { x: [0, -34, 0], y: [0, -20, 0], scale: [1.1, 1, 1.1] },
        19,
      )}
      {blob(
        "left-[44%] top-[10%] size-56 bg-[color:var(--gold)] opacity-[0.06]",
        { x: [0, -26, 0], y: [0, 26, 0] },
        17,
      )}
    </div>
  );
}
