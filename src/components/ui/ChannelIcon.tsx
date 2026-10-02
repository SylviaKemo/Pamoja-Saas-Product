import type { LucideIcon } from "lucide-react";
import type { SimpleIcon } from "simple-icons";

/** A channel's icon: a brand logo from Simple Icons, or a generic Lucide icon. */
export type ChannelGlyph = { kind: "brand"; icon: SimpleIcon } | { kind: "generic"; icon: LucideIcon };

type ChannelIconProps = {
  glyph: ChannelGlyph;
  size: number;
  /** Overrides the colour. Brand icons default to their brand colour, generic icons to emerald. */
  color?: string;
  className?: string;
};

export function ChannelIcon({ glyph, size, color, className }: ChannelIconProps) {
  if (glyph.kind === "generic") {
    const Icon = glyph.icon;
    return <Icon aria-hidden size={size} color={color ?? "var(--color-emerald)"} className={className} />;
  }

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color ?? `#${glyph.icon.hex}`}
      className={className}
    >
      <path d={glyph.icon.path} />
    </svg>
  );
}
