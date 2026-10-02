import { siGmail } from "simple-icons";
import { ChannelIcon } from "@/components/ui/ChannelIcon";

/** A customer explaining themselves again: "teams lose context". */
export function CustomerRepeatsPreview() {
  return (
    <div className="absolute inset-x-4 inset-y-3.5 flex flex-col gap-1.5 text-[11px] leading-[1.45]">
      <div className="flex items-center gap-1.5 text-[10px] text-muted-light">
        <ChannelIcon glyph={{ kind: "brand", icon: siGmail }} size={12} />
        Daniel Okafor · 3rd message today
      </div>
      <div className="self-start rounded-[12px_12px_12px_4px] border border-sand bg-white px-[11px] py-[9px] text-secondary">
        Hi again.{" "}
        <span className="rounded-[3px] bg-[#FCE7A8] px-0.5 font-semibold text-ink">
          As I already explained to your colleague yesterday
        </span>
        , I was charged twice for September…
      </div>
    </div>
  );
}
