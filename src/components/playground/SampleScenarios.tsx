import { SAMPLE_SCENARIOS } from "@/data/playgroundSamples";
import { cn } from "@/lib/cn";

type SampleScenariosProps = {
  selectedId: string | null;
  onSelect: (message: string) => void;
  disabled?: boolean;
};

/** Three example messages that fill the customer message field when picked. */
export function SampleScenarios({ selectedId, onSelect, disabled }: SampleScenariosProps) {
  return (
    <fieldset disabled={disabled}>
      <legend className="text-sm font-bold text-ink">Or try a sample</legend>
      <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
        {SAMPLE_SCENARIOS.map(({ id, title, mood, icon: Icon, message }) => {
          const selected = id === selectedId;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(message)}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left sm:flex-col sm:items-start sm:gap-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf disabled:cursor-not-allowed disabled:opacity-60",
                selected ? "border-leaf bg-mist" : "border-sand bg-white hover:border-[#B9C7BD]",
              )}
            >
              <span
                className={cn(
                  "flex size-8 flex-none items-center justify-center rounded-lg transition-colors",
                  selected ? "bg-pine text-mint-pale" : "bg-cream text-emerald",
                )}
              >
                <Icon aria-hidden size={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] leading-tight font-bold text-ink">{title}</span>
                <span className="block text-[11px] text-muted">{mood} customer</span>
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
