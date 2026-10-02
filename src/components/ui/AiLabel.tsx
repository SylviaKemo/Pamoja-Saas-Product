import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Colours for the gradient border and the shimmering text, per background tone. */
const TONES = {
  dark: {
    chip: "gap-2 py-[7px] pr-3.5 pl-2.5 text-xs font-bold",
    star: "text-[13px] text-mint",
    background:
      "linear-gradient(#0F3426,#0F3426) padding-box, linear-gradient(110deg,rgba(127,199,154,.9),rgba(127,199,154,.15) 45%,rgba(191,227,201,.9)) border-box",
    text: "linear-gradient(90deg,#BFE3C9 0%,#FFFFFF 40%,#BFE3C9 60%,#BFE3C9 100%)",
  },
  light: {
    chip: "gap-[7px] py-[5px] pr-[11px] pl-[9px] text-[11px] font-extrabold",
    star: "text-leaf",
    background:
      "linear-gradient(#FFFFFF,#FFFFFF) padding-box, linear-gradient(110deg,#2E8A5A,#BFE3C9 45%,#2E8A5A) border-box",
    text: "linear-gradient(90deg,#1F6B45 0%,#7FC79A 40%,#1F6B45 60%,#1F6B45 100%)",
  },
} satisfies Record<string, { chip: string; star: string; background: string; text: string }>;

type AiLabelProps = {
  children: ReactNode;
  tone?: keyof typeof TONES;
};

/** "Shimmer chip" label: a pill with a gradient border, a ✦ glyph and shimmering text. */
export function AiLabel({ children, tone = "dark" }: AiLabelProps) {
  const t = TONES[tone];
  const chipStyle: CSSProperties = { background: t.background };
  const textStyle: CSSProperties = { backgroundImage: t.text };

  return (
    <span
      style={chipStyle}
      className={cn(
        "relative inline-flex items-center overflow-hidden rounded-full border border-transparent leading-none tracking-[0.08em]",
        t.chip,
      )}
    >
      <span aria-hidden className={cn("leading-none", t.star)}>
        ✦
      </span>
      <span style={textStyle} className="text-shimmer">
        {children}
      </span>
    </span>
  );
}
