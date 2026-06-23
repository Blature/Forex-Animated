"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ServiceIcon, type ServiceVariant } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils";

/**
 * Special Services — alternating left/right blocks that slide in from their
 * side on scroll (design-system/MASTER.md §5.3 directional reveal, §6 glass).
 * Reduced-motion → fade only; animated icons fall back to static.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Service = {
  variant: ServiceVariant;
  title: string;
  highlight?: string;
  desc: string;
  tag?: string;
};

const SERVICES: Service[] = [
  {
    variant: "antiMargin",
    title: "Anti Margin Call",
    highlight: "up to 70% of losses returned",
    desc: "When a trade moves against you, we return up to 70% of your realised losses as free trading credit — a safety net you won't find elsewhere.",
    tag: "Up to 70% back",
  },
  {
    variant: "hedge",
    title: "Hedge in Negative Margin",
    desc: "Keep hedged positions open even when your margin turns negative, so you can manage exposure without forced liquidation.",
  },
  {
    variant: "signals",
    title: "Free Trading Signals",
    desc: "Actionable, analyst-curated signals across forex, metals and indices — included with every account at no extra cost.",
  },
  {
    variant: "bonus",
    title: "20% Welcome Bonus",
    highlight: "up to $1,000",
    desc: "Boost your starting capital with a 20% deposit bonus of up to $1,000 in tradable credit on your first deposit.",
    tag: "New clients",
  },
  {
    variant: "copy",
    title: "Social & Copy Trading",
    desc: "Follow and automatically mirror top-performing traders, or share your own strategy and build a following of your own.",
  },
  {
    variant: "support",
    title: "24/7 Multilingual Support",
    desc: "Real humans, around the clock, in your language — whenever the markets are open, our team is too.",
  },
];

export function SpecialServices() {
  return (
    <section
      id="services"
      className="relative mx-auto w-full max-w-[1100px] overflow-x-clip px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <header className="mb-16 text-center sm:mb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
          Special Services
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          More than a brokerage
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-balance text-[color:var(--fg-muted)]">
          Protection, rewards and support engineered around the trader — not the
          house.
        </p>
      </header>

      <div className="flex flex-col gap-20 lg:gap-28">
        {SERVICES.map((s, i) => (
          <ServiceBlock key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const reduce = useReducedMotion();
  const flip = index % 2 === 1; // odd blocks mirror

  const slide = (sign: number): Variants => ({
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 44 * sign },
    show: reduce
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  });

  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      {/* Visual — slides from the outer edge */}
      <motion.div
        variants={slide(flip ? 1 : -1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className={cn("flex justify-center", flip && "md:order-2")}
      >
        <div className="relative flex aspect-[5/4] w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface-1/50 backdrop-blur-md">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,var(--brand-tint),transparent_70%)]" />
          {/* glass top edge */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
          />
          <ServiceIcon variant={service.variant} />
        </div>
      </motion.div>

      {/* Text — slides from the opposite edge */}
      <motion.div
        variants={slide(flip ? -1 : 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className={cn(flip && "md:order-1")}
      >
        <span className="font-mono text-sm text-[color:var(--fg-subtle)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-2 font-heading text-2xl font-bold leading-tight sm:text-3xl">
          {service.title}
          {service.highlight && (
            <span className="text-brand"> — {service.highlight}</span>
          )}
        </h3>
        <p className="mt-4 max-w-md text-[color:var(--fg-muted)]">
          {service.desc}
        </p>

        {service.tag && (
          <span className="mt-5 inline-flex items-center rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold-tint)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[color:var(--gold-soft)]">
            {service.tag}
          </span>
        )}

        <a
          href="#start"
          className="mt-6 flex w-fit items-center gap-1.5 rounded-md text-sm font-medium text-brand outline-none transition-colors hover:text-brand-hover focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
        >
          Learn more
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </motion.div>
    </div>
  );
}
