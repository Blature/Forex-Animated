"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import {
  Layers,
  MonitorSmartphone,
  Activity,
  Clock,
  Download,
  type LucideIcon,
} from "lucide-react";
import {
  WindowsLogo,
  AppleLogo,
  AndroidLogo,
} from "@/components/ui/platform-logos";
import {
  AnimatedSection,
  AnimatedItem,
} from "@/components/motion/animated-section";
import { cn } from "@/lib/utils";

/**
 * MT5 Platform (design-system/MASTER.md §5 parallax-subtle, §6 glass, §7 trust).
 * Device mockup parallaxes on scroll; glass UI chips drift gently and parallax
 * at varied depths. All motion is transform/opacity-only and stops under
 * prefers-reduced-motion.
 */

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Layers,
    title: "Multi-asset trading",
    desc: "Forex, metals, indices, energies & crypto in one terminal.",
  },
  {
    icon: MonitorSmartphone,
    title: "Desktop, web & mobile",
    desc: "Pick up exactly where you left off, on any device.",
  },
  {
    icon: Activity,
    title: "80 built-in indicators",
    desc: "Plus 2,000+ free & paid tools from the marketplace.",
  },
  {
    icon: Clock,
    title: "21 timeframes",
    desc: "From one minute to one month, with 6 order types.",
  },
];

const DOWNLOADS = [
  {
    os: "Windows",
    Logo: WindowsLogo,
    href: "https://download.mql5.com/cdn/web/stp.trading.ltd/mt5/stptrading5setup.exe",
  },
  {
    os: "macOS",
    Logo: AppleLogo,
    href: "https://www.stptrading.io/dl/MetaTrader5-Mac.zip",
  },
  {
    os: "iOS",
    Logo: AppleLogo,
    href: "https://download.mql5.com/cdn/mobile/mt5/ios?server=STPTrading-Server",
  },
  {
    os: "Android",
    Logo: AndroidLogo,
    href: "https://download.mql5.com/cdn/mobile/mt5/android?server=STPTrading-Server",
  },
];

export function PlatformMT5() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax depths (disabled under reduced-motion)
  const r = (a: number, b: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [a, b]);
  const yDevice = r(50, -50);
  const yChipA = r(70, -90);
  const yChipB = r(30, -50);
  const yChipC = r(90, -60);
  const yChipD = r(20, -70);

  return (
    <section
      ref={ref}
      id="platform"
      className="relative mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy + features + downloads */}
        <AnimatedSection stagger amount={0.3} className="order-2 lg:order-1">
          <AnimatedItem>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
              Platform
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              Trade on MetaTrader&nbsp;5
            </h2>
            <p className="mt-3 max-w-md text-balance text-[color:var(--fg-muted)]">
              The world&rsquo;s most powerful multi-asset platform — fast
              execution, advanced charting, and algorithmic trading on every
              device.
            </p>
          </AnimatedItem>

          <AnimatedItem>
            <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.title} className="flex gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[color:var(--surface-2)] text-brand">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {f.title}
                      </p>
                      <p className="mt-0.5 text-sm text-[color:var(--fg-muted)]">
                        {f.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </AnimatedItem>

          <AnimatedItem>
            <div className="mt-9">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-[color:var(--fg-subtle)]">
                Download MetaTrader 5
              </p>
              <div className="flex flex-wrap gap-2.5">
                {DOWNLOADS.map(({ os, Logo, href }) => (
                  <a
                    key={os}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-11 items-center gap-2.5 rounded-md border border-input px-4 text-sm font-medium text-foreground outline-none transition-colors duration-150 hover:border-[color:var(--border-accent)] hover:bg-[color:var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                  >
                    <Logo className="size-4 text-[color:var(--fg-muted)] transition-colors group-hover:text-brand" />
                    {os}
                    <Download
                      className="size-3.5 text-[color:var(--fg-subtle)]"
                      aria-hidden
                    />
                  </a>
                ))}
              </div>
            </div>
          </AnimatedItem>
        </AnimatedSection>

        {/* Device mockup + floating chips */}
        <div className="relative order-1 flex min-h-[320px] items-center justify-center lg:order-2 lg:min-h-[440px]">
          {/* ambient brand glow behind device */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_55%_45%,var(--brand-tint),transparent_70%)]"
          />

          <motion.div style={{ y: yDevice }} className="relative w-full max-w-xl">
            <Image
              src="/platform/mt5-devices.webp"
              alt="MetaTrader 5 running on laptop and mobile"
              width={791}
              height={469}
              sizes="(min-width: 1024px) 36rem, 90vw"
              className="h-auto w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            />
          </motion.div>

          {/* Floating UI chips — parallax (outer) + gentle drift (inner) */}
          <FloatChip
            y={yChipA}
            drift={!reduce}
            dur={5}
            className="left-0 top-4 sm:left-2 lg:-left-2"
          >
            <span className="font-mono text-[11px] text-[color:var(--fg-muted)]">
              XAU/USD
            </span>
            <span className="font-mono text-sm tabular-nums text-foreground">
              2034.50
            </span>
            <span className="font-mono text-[11px] text-[color:var(--up)]">
              &#9650; +0.42%
            </span>
          </FloatChip>

          <FloatChip
            y={yChipB}
            drift={!reduce}
            dur={6.5}
            className="right-0 top-10 hidden sm:flex lg:-right-2"
          >
            <Activity className="size-4 text-brand" strokeWidth={2} aria-hidden />
            <span className="text-xs font-medium text-foreground">
              80 indicators
            </span>
          </FloatChip>

          <FloatChip
            y={yChipC}
            drift={!reduce}
            dur={5.8}
            className="bottom-8 left-1 hidden sm:flex lg:left-6"
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-[color:var(--up)]/20 text-[color:var(--up)]">
              &#10003;
            </span>
            <span className="font-mono text-xs tabular-nums text-foreground">
              Filled · 0.50 lot
            </span>
          </FloatChip>

          <FloatChip
            y={yChipD}
            drift={!reduce}
            dur={7}
            className="bottom-2 right-0 lg:right-4"
          >
            <Clock className="size-4 text-brand" strokeWidth={2} aria-hidden />
            <span className="font-mono text-[11px] text-[color:var(--fg-muted)]">
              M1 · H1 · D1
            </span>
          </FloatChip>
        </div>
      </div>
    </section>
  );
}

function FloatChip({
  children,
  className,
  y,
  drift,
  dur,
}: {
  children: React.ReactNode;
  className?: string;
  y: MotionValue<number>;
  drift: boolean;
  dur: number;
}) {
  return (
    <motion.div style={{ y }} className={cn("absolute z-10", className)}>
      <motion.div
        animate={drift ? { y: [0, -8, 0] } : undefined}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-xl border border-border bg-surface-1/80 px-3 py-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-md"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
