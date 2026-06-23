import {
  TrendingUp,
  Fuel,
  BarChart3,
  Gem,
  Bitcoin,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/motion/animated-section";
import { BentoCard } from "@/components/ui/bento-card";
import { CandlestickMotif } from "@/components/ui/candlestick-motif";
import { cn } from "@/lib/utils";

type Product = {
  key: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  tag: string;
  span: string;
};

// Bento placement (lg, 4-col): Forex 2×2, Energy + Metals stack right,
// Indices 2-wide, then "1000+" highlight and Crypto fill the last row.
const PRODUCTS: Product[] = [
  {
    key: "energy",
    title: "Energy",
    icon: Fuel,
    desc: "Crude, Brent & natural gas CFDs.",
    tag: "WTI · Brent · Gas",
    span: "lg:col-span-1",
  },
  {
    key: "metals",
    title: "Precious Metals",
    icon: Gem,
    desc: "Gold, silver & platinum spot.",
    tag: "XAU · XAG · XPT",
    span: "lg:col-span-1",
  },
  {
    key: "indices",
    title: "Indices",
    icon: BarChart3,
    desc: "Global benchmarks across US, Europe & Asia.",
    tag: "US100 · US30 · GER40",
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    key: "crypto",
    title: "Crypto",
    icon: Bitcoin,
    desc: "Leading digital assets, traded 24/7.",
    tag: "BTC · ETH · SOL",
    span: "md:col-span-2 lg:col-span-2",
  },
];

export function Products() {
  return (
    <section
      id="products"
      className="relative mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <AnimatedSection className="mb-12 text-center" amount={0.4}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
          Products
        </p>
        <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
          Five markets, one platform
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-balance text-[color:var(--fg-muted)]">
          Trade across the world&rsquo;s most liquid asset classes from a single
          STP account.
        </p>
      </AnimatedSection>

      <AnimatedSection
        as="div"
        stagger
        amount={0.15}
        className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:auto-rows-fr lg:grid-flow-dense lg:grid-cols-4"
      >
        {/* Feature card — Forex, with the animated candlestick motif */}
        <AnimatedItem className="h-full md:col-span-2 lg:col-span-2 lg:row-span-2">
          <BentoCard className="min-h-[220px] lg:min-h-[300px]">
            <CandlestickMotif />
            <div className="relative flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-center gap-2.5">
                <TrendingUp
                  className="size-6 text-brand"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--gold-tint)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--gold-soft)]">
                  Most traded
                </span>
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold sm:text-3xl">
                Forex
              </h3>
              <p className="mt-2 max-w-xs text-sm text-[color:var(--fg-muted)]">
                Major, minor &amp; exotic pairs with deep institutional
                liquidity and razor-tight spreads.
              </p>
              <span
                className="mt-auto pt-6 font-mono text-xs uppercase tracking-wider text-[color:var(--fg-subtle)]"
                data-numeric
              >
                70+ pairs · 24/5
              </span>
            </div>
          </BentoCard>
        </AnimatedItem>

        {/* Standard product cards */}
        {PRODUCTS.map((p) => {
          const Icon = p.icon;
          return (
            <AnimatedItem key={p.key} className={cn("h-full", p.span)}>
              <BentoCard className="min-h-[150px]">
                <div className="flex h-full flex-col p-5 sm:p-6">
                  <Icon
                    className="size-6 text-brand"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  <h3 className="mt-4 font-heading text-lg font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[color:var(--fg-muted)]">
                    {p.desc}
                  </p>
                  <span
                    className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-wider text-[color:var(--fg-subtle)]"
                    data-numeric
                  >
                    {p.tag}
                  </span>
                </div>
              </BentoCard>
            </AnimatedItem>
          );
        })}

        {/* Highlight card — 1000+ instruments */}
        <AnimatedItem className="h-full md:col-span-2 lg:col-span-2">
          <BentoCard accent className="min-h-[150px]">
            <div className="flex h-full flex-col justify-center p-6 sm:p-7">
              <div
                className="font-mono text-5xl font-semibold tabular-nums text-foreground sm:text-6xl"
                data-numeric
              >
                1000<span className="text-brand">+</span>
              </div>
              <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
                Tradable instruments across global markets.
              </p>
              <a
                href="#start"
                className="mt-4 inline-flex w-fit items-center gap-1 rounded-md text-sm font-medium text-brand outline-none transition-colors hover:text-brand-hover focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
              >
                Explore all markets
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>
          </BentoCard>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
