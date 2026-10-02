"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT } from "@/lib/motion";

const HIDDEN_OFFSET = {
  up: { y: 40 },
  left: { x: -56 },
  right: { x: 56 },
  scale: { scale: 0.92 },
} as const;

const STAGGER_SECONDS = 0.12;
const MAX_STAGGER_STEPS = 5;

type RevealProps = {
  children: ReactNode;
  /** Direction the element travels in from. Two-column sections use left/right, big panels use scale. */
  variant?: keyof typeof HIDDEN_OFFSET;
  /** Position among sibling reveals; each step adds a 0.12s delay. */
  index?: number;
  className?: string;
};

/** Fades, un-blurs and slides its children into place the first time they scroll into view. */
export function Reveal({ children, variant = "up", index = 0, className }: RevealProps) {
  const delay = Math.min(index, MAX_STAGGER_STEPS) * STAGGER_SECONDS;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(6px)", ...HIDDEN_OFFSET[variant] }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{
        default: { duration: 1, ease: EASE_OUT, delay },
        opacity: { duration: 0.9, delay },
        filter: { duration: 0.9, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
