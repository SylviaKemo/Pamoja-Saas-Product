"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { siGmail, siInstagram, siWhatsapp } from "simple-icons";
import { ChannelIcon, type ChannelGlyph } from "@/components/ui/ChannelIcon";
import { EASE_OUT, EASE_SPRING } from "@/lib/motion";

const PARALLAX_SPEED = 0.12;
const ICON_COLOR = "var(--color-mint-ice)";

/** Chips sit on the orb's dashed ring. Positions are percentages of the 860px visual. */
const CHIPS: { label: string; glyph: ChannelGlyph; left: string; top: string }[] = [
  { label: "Gmail", glyph: { kind: "brand", icon: siGmail }, left: "14%", top: "14%" },
  { label: "WhatsApp", glyph: { kind: "brand", icon: siWhatsapp }, left: "4.7%", top: "36%" },
  { label: "Instagram", glyph: { kind: "brand", icon: siInstagram }, left: "5.8%", top: "64%" },
  { label: "Live Chat", glyph: { kind: "generic", icon: MessageCircleMore }, left: "17.4%", top: "83%" },
];

/**
 * The glass orb, its ring and the channel chips.
 * It always starts just right of the 580px text column and bleeds off the right edge,
 * so on narrow screens it is pushed off-screen entirely.
 */
export function HeroVisual() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, (y) => y * PARALLAX_SPEED);

  return (
    <motion.div
      aria-hidden
      style={{ y: parallaxY, left: "calc(max(28px, (100% - 1200px) / 2 + 28px) + 590px)" }}
      className="pointer-events-none absolute top-[110px] size-[860px]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: EASE_OUT }}
        className="absolute -inset-2.5 rounded-full border border-dashed border-mint-pale/28"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -24, filter: "blur(14px)" }}
        animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.6, delay: 0.3, ease: EASE_OUT }}
        className="absolute inset-0"
      >
        <Image
          src="/images/orb.png"
          alt=""
          fill
          sizes="860px"
          loading="eager"
          fetchPriority="high"
          className="animate-orb-float drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)]"
        />
      </motion.div>

      {CHIPS.map((chip, i) => (
        <motion.div
          key={chip.label}
          style={{ left: chip.left, top: chip.top, x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.2 + i * 0.15, ease: EASE_SPRING }}
          className="absolute flex items-center gap-3 rounded-full border border-white/16 bg-forest/62 py-1.5 pr-4 pl-1.5 text-[13px] font-bold whitespace-nowrap text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] backdrop-blur-[14px]"
        >
          <span className="relative size-[38px] flex-none">
            <span
              className="absolute inset-0 animate-ping-ring rounded-full border border-mint/60"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-full border border-mint-pale/35 bg-[linear-gradient(160deg,rgba(127,199,154,0.32),rgba(127,199,154,0.10))]">
              <ChannelIcon glyph={chip.glyph} size={18} color={ICON_COLOR} />
            </span>
          </span>
          {chip.label}
        </motion.div>
      ))}
    </motion.div>
  );
}
