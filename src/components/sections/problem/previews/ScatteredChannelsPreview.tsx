import { MessageCircleMore } from "lucide-react";
import type { CSSProperties } from "react";
import { siGmail, siInstagram, siMessenger, siWhatsapp } from "simple-icons";
import { ChannelIcon, type ChannelGlyph } from "@/components/ui/ChannelIcon";

/** Five app tiles scattered at slight angles: "messages everywhere". */
const TILES: { glyph: ChannelGlyph; style: CSSProperties }[] = [
  { glyph: { kind: "brand", icon: siGmail }, style: { left: "10%", top: "14%", rotate: "-8deg" } },
  { glyph: { kind: "brand", icon: siWhatsapp }, style: { left: "38%", top: "30%", rotate: "4deg" } },
  { glyph: { kind: "brand", icon: siInstagram }, style: { right: "10%", top: "12%", rotate: "7deg" } },
  { glyph: { kind: "brand", icon: siMessenger }, style: { left: "20%", bottom: "10%", rotate: "6deg" } },
  { glyph: { kind: "generic", icon: MessageCircleMore }, style: { right: "22%", bottom: "12%", rotate: "-5deg" } },
];

export function ScatteredChannelsPreview() {
  return (
    <div className="absolute inset-0">
      {TILES.map(({ glyph, style }, i) => (
        <span
          key={i}
          style={style}
          className="absolute flex size-[50px] items-center justify-center rounded-[14px] border border-sand bg-white shadow-[0_6px_14px_rgba(21,32,26,0.07)]"
        >
          <ChannelIcon glyph={glyph} size={24} />
        </span>
      ))}
    </div>
  );
}
