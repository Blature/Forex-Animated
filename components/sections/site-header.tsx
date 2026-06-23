"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

// MASTER §5.1 easing
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const NAV_LINKS = [
  { label: "Accounts", href: "#accounts" },
  { label: "Products", href: "#products" },
  { label: "Platform", href: "#platform" },
  { label: "Services", href: "#services" },
  { label: "Company", href: "#company" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // Condense + blur background after a small scroll (MASTER §5.3 "Glass nav")
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Lock background scroll + close on Esc while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[height,background-color,border-color,backdrop-filter] duration-300",
          "border-b",
          scrolled
            ? "h-[60px] border-border bg-background/70 backdrop-blur-xl"
            : "h-[76px] border-transparent bg-transparent backdrop-blur-0",
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#top"
            aria-label="STP Trading — home"
            className="flex shrink-0 items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/stp-logo.svg"
              alt="STP Trading"
              width={79}
              height={30}
              className={cn(
                "w-auto transition-[height] duration-300",
                scrolled ? "h-[24px]" : "h-[28px]",
              )}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex" aria-label="Primary">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-[color:var(--fg-muted)] outline-none transition-colors duration-150 hover:text-foreground focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                  >
                    {link.label}
                    {/* animated underline */}
                    <span className="pointer-events-none absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-200 ease-out group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTAs (magnetic) */}
          <div className="hidden items-center gap-2 lg:flex">
            <MagneticButton
              href="#practice"
              strength={0.25}
              className="h-11 rounded-md border border-input px-5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-[color:var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
            >
              Practice for Free
            </MagneticButton>
            <MagneticButton
              href="#start"
              strength={0.4}
              className="h-11 rounded-md bg-brand px-5 text-sm font-semibold text-[color:var(--brand-foreground)] shadow-[0_0_0_1px_var(--brand-press),0_10px_30px_-8px_var(--brand-glow)] transition-colors duration-150 hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Start Trading
            </MagneticButton>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative flex size-11 items-center justify-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <motion.span
                className="absolute left-0 top-0 h-0.5 w-6 rounded-full bg-foreground"
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                style={{ transformOrigin: "center" }}
              />
              <motion.span
                className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded-full bg-foreground"
                animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: reduce ? 0 : 0.18 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 w-6 rounded-full bg-foreground"
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: reduce ? 0 : 0.22, ease: EASE }}
                style={{ transformOrigin: "center" }}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {open && (
          <MobileMenu reduce={!!reduce} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({
  reduce,
  onClose,
}: {
  reduce: boolean;
  onClose: () => void;
}) {
  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.05, delayChildren: 0.08 },
    },
  };
  const itemVariants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 16 },
    show: reduce
      ? { opacity: 1 }
      : { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
  };

  return (
    <div id="mobile-menu" className="lg:hidden">
      {/* scrim (MASTER §2.1 overlay) */}
      <motion.div
        className="fixed inset-0 z-40 bg-[color:var(--overlay)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.22 }}
        onClick={onClose}
        aria-hidden
      />

      {/* panel */}
      <motion.aside
        className="fixed right-0 top-0 bottom-0 z-50 flex w-[min(86vw,360px)] flex-col border-l border-border bg-[color:var(--surface-1)]"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 320, damping: 34 }
        }
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        {/* spacer clears the fixed header bar (logo + close button live there) */}
        <div className="h-[76px] shrink-0" aria-hidden />

        <motion.nav
          className="flex flex-1 flex-col px-4"
          variants={listVariants}
          initial="hidden"
          animate="show"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={onClose}
              variants={itemVariants}
              className="flex items-center justify-between rounded-md px-4 py-4 text-lg font-medium text-foreground outline-none transition-colors hover:bg-[color:var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
            >
              {link.label}
              <span aria-hidden className="text-[color:var(--fg-subtle)]">
                &#8594;
              </span>
            </motion.a>
          ))}
        </motion.nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-border p-6">
          <a
            href="#practice"
            onClick={onClose}
            className="flex h-12 items-center justify-center rounded-md border border-input text-sm font-medium text-foreground transition-colors hover:bg-[color:var(--surface-2)] focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
          >
            Practice for Free
          </a>
          <a
            href="#start"
            onClick={onClose}
            className="flex h-12 items-center justify-center rounded-md bg-brand text-sm font-semibold text-[color:var(--brand-foreground)] shadow-[0_0_0_1px_var(--brand-press),0_10px_30px_-8px_var(--brand-glow)] transition-colors hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
          >
            Start Trading
          </a>
        </div>
      </motion.aside>
    </div>
  );
}
