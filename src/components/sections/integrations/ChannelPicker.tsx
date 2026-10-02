import { ChannelIcon } from "@/components/ui/ChannelIcon";
import { CHANNELS } from "@/data/channels";
import { cn } from "@/lib/cn";

type ChannelPickerProps = {
  connectedIds: string[];
  onToggle: (id: string) => void;
};

/** Grid of 24 channel toggles. */
export function ChannelPicker({ connectedIds, onToggle }: ChannelPickerProps) {
  return (
    <div className="flex-[1_1_360px] rounded-[22px] bg-cream p-[22px]">
      <div className="text-[13px] font-bold">Choose your channels</div>
      <div className="mt-0.5 text-xs text-muted">Switch some on and watch the inbox fill up.</div>

      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-2">
        {CHANNELS.map((channel) => {
          const connected = connectedIds.includes(channel.id);
          return (
            <button
              key={channel.id}
              type="button"
              title={channel.name}
              aria-label={channel.name}
              aria-pressed={connected}
              onClick={() => onToggle(channel.id)}
              className={cn(
                "relative flex aspect-square cursor-pointer items-center justify-center rounded-[14px] border bg-white transition-all duration-200",
                connected ? "border-leaf" : "border-sand opacity-55",
              )}
            >
              <ChannelIcon glyph={channel.glyph} size={24} />
              {connected && <span className="absolute top-1 right-1 size-2 rounded-full bg-leaf-bright" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
