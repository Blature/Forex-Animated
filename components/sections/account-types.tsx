"use client";

import { motion, useReducedMotion } from "motion/react";
import { Crown, TrendingUp, Zap, Moon, Check, type LucideIcon } from "lucide-react";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/motion/animated-section";
import { cn } from "@/lib/utils";

/**
 * Account Types — pricing-style cards (design-system/MASTER.md §6, §5).
 * Staggered scroll-in reveal, hover lift + shadow, and an always-on brand
 * glow on the recommended tier. Hover lift disabled under reduced-motion.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Account = {
  name: string;
  icon: LucideIcon;
  tagline: string;
  spread: string;
  spreadUnit: string;
  from: boolean;
  commission: string;
  minDeposit: string;
  features: string[];
  recommended?: boolean;
};

const ACCOUNTS: Account[] = [
  {
    name: "Zero Prime",
    icon: Crown,
    tagline: "Institutional pricing for serious volume.",
    spread: "0.0",
    spreadUnit: "fixed spread",
    from: false,
    commission: "from $3.50 / lot",
    minDeposit: "$3,000",
    features: [
      "Fixed 0.0 pip spreads",
      "Raw institutional pricing",
      "Priority order execution",
      "Dedicated account manager",
    ],
    recommended: true,
  },
  {
    name: "Standard",
    icon: TrendingUp,
    tagline: "Balanced spreads for everyday trading.",
    spread: "0.2",
    spreadUnit: "pips",
    from: true,
    commission: "$5.00 / lot",
    minDeposit: "$1,000",
    features: [
      "Tight variable spreads",
      "Full instrument range",
      "No minimum trade volume",
    ],
  },
  {
    name: "Zero",
    icon: Zap,
    tagline: "Low barrier to get started.",
    spread: "0.4",
    spreadUnit: "pips",
    from: true,
    commission: "$6.00 / lot",
    minDeposit: "$10",
    features: [
      "Just $10 to get started",
      "Micro lots from 0.01",
      "Built for new traders",
    ],
  },
  {
    name: "Islamic",
    icon: Moon,
    tagline: "Swap-free, Shariah-compliant trading.",
    spread: "1.3",
    spreadUnit: "pips",
    from: true,
    commission: "None",
    minDeposit: "—",
    features: [
      "Swap-free & Shariah-compliant",
      "No overnight charges",
      "No hidden fees",
    ],
  },
];

export function AccountTypes() {
  return (
    <section
      id="accounts"
      className="relative mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <AnimatedSection className="mb-14 text-center" amount={0.4}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
          Account Types
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          Choose how you trade
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-balance text-[color:var(--fg-muted)]">
          Transparent, all-in pricing — pick the account that fits your
          strategy. No hidden fees, ever.
        </p>
      </AnimatedSection>

      <AnimatedSection
        as="div"
        stagger
        amount={0.15}
        className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {ACCOUNTS.map((acc) => (
          <AnimatedItem key={acc.name} className="relative h-full">
            <AccountCard acc={acc} />
          </AnimatedItem>
        ))}
      </AnimatedSection>

      <p className="mt-8 text-center text-xs text-[color:var(--fg-subtle)]">
        Spreads are indicative and may vary with market conditions. Trading CFDs
        carries risk.
      </p>
    </section>
  );
}

function AccountCard({ acc }: { acc: Account }) {
  const reduce = useReducedMotion();
  const Icon = acc.icon;
  const recommended = acc.recommended;

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.22, ease: EASE }}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border p-6 backdrop-blur-md transition-[box-shadow,border-color] duration-300",
        recommended
          ? "border-[color:var(--border-accent)] bg-[color:var(--brand-tint)] shadow-[0_0_0_1px_var(--border-accent),0_24px_60px_-18px_var(--brand-glow)]"
          : "border-border bg-surface-1/60 hover:border-[color:var(--border-strong)] hover:shadow-[0_18px_50px_-22px_var(--brand-glow)]",
      )}
    >
      {recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[color:var(--brand-foreground)] shadow-[0_6px_24px_-6px_var(--brand-glow)]">
          Recommended
        </span>
      )}

      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-lg",
            recommended
              ? "bg-brand/15 text-brand"
              : "bg-[color:var(--surface-2)] text-brand",
          )}
        >
          <Icon className="size-5" strokeWidth={1.75} aria-hidden />
        </span>
        <h3 className="font-heading text-xl font-semibold">{acc.name}</h3>
      </div>

      <p className="mt-3 text-sm text-[color:var(--fg-muted)]">{acc.tagline}</p>

      {/* Headline spread */}
      <div className="mt-5 flex items-baseline gap-1.5" data-numeric>
        {acc.from && (
          <span className="text-sm text-[color:var(--fg-subtle)]">from</span>
        )}
        <span className="font-mono text-4xl font-semibold tabular-nums text-foreground">
          {acc.spread}
        </span>
        <span className="text-sm text-[color:var(--fg-muted)]">
          {acc.spreadUnit}
        </span>
      </div>

      {/* Spec rows */}
      <dl className="mt-5 space-y-2.5 border-t border-border pt-5 text-sm">
        <div className="flex items-center justify-between gap-2">
          <dt className="text-[color:var(--fg-muted)]">Commission</dt>
          <dd className="font-mono tabular-nums text-foreground" data-numeric>
            {acc.commission}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-2">
          <dt className="text-[color:var(--fg-muted)]">Min deposit</dt>
          <dd className="font-mono tabular-nums text-foreground" data-numeric>
            {acc.minDeposit}
          </dd>
        </div>
      </dl>

      {/* Features */}
      <ul className="mt-5 space-y-2.5 text-sm">
        {acc.features.map((f) => (
          <li key={f} className="flex gap-2">
            <Check
              className="mt-0.5 size-4 shrink-0 text-brand"
              strokeWidth={2}
              aria-hidden
            />
            <span className="text-[color:var(--fg-muted)]">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#open"
        className={cn(
          "mt-7 flex h-11 items-center justify-center rounded-md text-sm font-semibold outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          recommended
            ? "bg-brand text-[color:var(--brand-foreground)] shadow-[0_10px_30px_-8px_var(--brand-glow)] hover:bg-brand-hover"
            : "border border-input text-foreground hover:bg-[color:var(--surface-2)]",
        )}
      >
        Open Account
      </a>
    </motion.div>
  );
}
