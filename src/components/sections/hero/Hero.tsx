"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { EASE_OUT } from "@/lib/motion";
import { HeroVisual } from "./HeroVisual";

const HEADLINE = [
  { text: "All your customer conversations.", highlight: false },
  { text: "One simple inbox.", highlight: true },
];

const HEADLINE_START = 0.35;
const WORD_STAGGER = 0.08;

/** Deep-green opening section: headline and CTAs on the left, glass orb with channel chips on the right. */
export function Hero() {
  const words = HEADLINE.flatMap(({ text, highlight }) => text.split(" ").map((word) => ({ word, highlight })));

  return (
    <section id="top" className="relative min-h-[940px] overflow-hidden bg-forest px-7 pt-[200px] pb-30 text-[#F3F1E8]">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
        className="pointer-events-none absolute -top-15 -right-60 size-[1000px] rounded-full bg-[radial-gradient(closest-side,rgba(127,199,154,0.28),rgba(127,199,154,0)_70%)]"
      />

      <HeroVisual />

      <div className="relative z-[2] mx-auto max-w-[1200px]">
        <div className="max-w-[580px]">
          <FadeUp delay={0.2} duration={0.8}>
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/18 px-2.5 py-[5px] text-[11px] font-bold tracking-[0.1em] text-mint-pale">
              <span className="size-[7px] rounded-full bg-mint" />
              CUSTOMER CONVERSATIONS, TOGETHER
            </span>
          </FadeUp>

          <h1 className="mt-6 text-[clamp(46px,6.4vw,80px)] leading-[0.96] font-extrabold tracking-[-0.045em] text-balance text-white">
            {words.map(({ word, highlight }, i) => (
              <span key={i}>
                <motion.span
                  initial={{ opacity: 0, y: "60%", rotate: 4, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: HEADLINE_START + i * WORD_STAGGER, ease: EASE_OUT }}
                  className={highlight ? "inline-block text-mint" : "inline-block"}
                >
                  {word}
                </motion.span>{" "}
              </span>
            ))}
          </h1>

          <FadeUp delay={1}>
            <p className="mt-6 max-w-[460px] text-[17px] leading-[1.6] text-pretty text-on-dark">
              Bring email, WhatsApp, live chat and social messages into one place, so your team can stay organized and
              reply faster.
            </p>
          </FadeUp>

          <FadeUp delay={1.15} className="mt-[30px] flex flex-wrap gap-2.5">
            <ButtonLink href="#pricing" size="lg">
              Get started free
            </ButtonLink>
            <ButtonLink href="#product" variant="ghost" size="lg">
              See how it works
            </ButtonLink>
            <ButtonLink href="/ai-playground" variant="ghost" size="lg" className="gap-2">
              <Sparkles aria-hidden size={16} className="text-mint" />
              Try Pamoja AI
            </ButtonLink>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

type FadeUpProps = {
  children: ReactNode;
  delay: number;
  duration?: number;
  className?: string;
};

function FadeUp({ children, delay, duration = 0.9, className }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
