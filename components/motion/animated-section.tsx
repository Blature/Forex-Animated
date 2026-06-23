"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * AnimatedSection / AnimatedItem — the reveal primitive EVERY section uses
 * (design-system/MASTER.md §5.3 "Section reveal": fade + translateY(12→0),
 * ease-out, 320ms, once on scroll-in; optional 40ms stagger per item).
 *
 * Respects prefers-reduced-motion (MASTER §5.4): motion is replaced by a
 * plain fade so content still appears but never slides.
 */

// MASTER §5.1 — ease-out (enter)
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DURATION = 0.32; // MASTER §5.1 --dur-slow
const STAGGER = 0.04; // MASTER §5.3 — 40ms per item

type Tag = "section" | "div" | "article" | "main" | "header" | "footer";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Rendered element. Default: section. */
  as?: Tag;
  /** Delay before the reveal starts (s). */
  delay?: number;
  /** Slide distance in px (default 12, per MASTER). */
  y?: number;
  /** Fraction of element visible before triggering (0–1). */
  amount?: number;
  /** When true, children wrapped in <AnimatedItem> reveal in a 40ms stagger. */
  stagger?: boolean;
}

export function AnimatedSection({
  children,
  className,
  as = "section",
  delay = 0,
  y = 12,
  amount = 0.2,
  stagger = false,
}: AnimatedSectionProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    visible: reduce
      ? { opacity: 1, transition: { duration: 0.2 } }
      : {
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATION,
            ease: EASE,
            delay,
            ...(stagger
              ? { staggerChildren: STAGGER, delayChildren: delay }
              : {}),
          },
        },
  };

  const MotionTag = motion[as] as typeof motion.section;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
}

/**
 * Child of a <AnimatedSection stagger> — inherits the parent's trigger and
 * reveals in sequence. Declares only variants (no own trigger) so Framer
 * propagates the staggered timing from the parent.
 */
export function AnimatedItem({ children, className, y = 12 }: AnimatedItemProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
    visible: reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
