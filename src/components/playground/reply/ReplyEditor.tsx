import {
  BriefcaseBusiness,
  Check,
  Copy,
  HeartHandshake,
  LoaderCircle,
  RefreshCw,
  Scissors,
  WandSparkles,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { LIMITS, type RefinementType } from "@/lib/ai/schemas";
import { cn } from "@/lib/cn";

const REFINE_ACTIONS: { type: RefinementType; label: string; icon: LucideIcon }[] = [
  { type: "shorter", label: "Make shorter", icon: Scissors },
  { type: "empathetic", label: "More empathetic", icon: HeartHandshake },
  { type: "professional", label: "More professional", icon: BriefcaseBusiness },
  { type: "simplify", label: "Simplify", icon: WandSparkles },
  { type: "regenerate", label: "Regenerate", icon: RefreshCw },
];

type ReplyEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onRefine: (type: RefinementType) => void;
  /** The refinement currently running, if any. */
  activeRefinement: RefinementType | null;
  /** Blocks AI refinement, e.g. while the results are outdated. */
  refineDisabled?: boolean;
  /** Friendly message from the last failed refinement. */
  error?: string | null;
};

/** The editable suggested reply with AI refinement actions and a copy button. */
export function ReplyEditor({ value, onChange, onRefine, activeRefinement, refineDisabled, error }: ReplyEditorProps) {
  const { status: copyStatus, copy } = useCopyToClipboard();
  const isRefining = activeRefinement !== null;
  const isEmpty = value.trim() === "";

  return (
    <section className="rounded-2xl border border-[#D6E3D9] bg-white p-4" aria-labelledby="reply-label">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label
          id="reply-label"
          htmlFor="suggested-reply"
          className="text-[11px] font-bold tracking-[0.08em] text-emerald uppercase"
        >
          Suggested reply
        </label>
        <span className="text-xs text-muted-light">Review and edit before sending. Nothing is sent automatically.</span>
      </div>

      <textarea
        id="suggested-reply"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={LIMITS.reply}
        rows={8}
        disabled={isRefining}
        aria-busy={isRefining}
        className="mt-3 w-full resize-y rounded-xl border border-[#DCE7DE] bg-[#FCFBF7] px-4 py-3.5 text-[15px] leading-[1.6] text-ink transition-[border-color,box-shadow,opacity] duration-200 outline-none focus:border-leaf focus:ring-4 focus:ring-mint/25 disabled:opacity-60"
      />

      {error && (
        <p role="alert" className="mt-2 text-[13px] leading-[1.5] text-[#9A4321]">
          {error}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {REFINE_ACTIONS.map(({ type, label, icon: Icon }) => {
          const running = activeRefinement === type;
          return (
            <Button
              key={type}
              variant="outline"
              size="xs"
              onClick={() => onRefine(type)}
              disabled={isRefining || refineDisabled || isEmpty}
              aria-busy={running}
            >
              {running ? (
                <LoaderCircle aria-hidden size={14} className="animate-spin" />
              ) : (
                <Icon aria-hidden size={14} className="text-emerald" />
              )}
              {running ? "Rewriting…" : label}
            </Button>
          );
        })}

        <Button
          variant="pine"
          size="xs"
          onClick={() => copy(value)}
          disabled={isRefining || isEmpty}
          className={cn("ml-auto", copyStatus === "copied" && "bg-leaf hover:bg-leaf")}
        >
          {copyStatus === "copied" ? <Check aria-hidden size={14} /> : <Copy aria-hidden size={14} />}
          {copyStatus === "copied" ? "Copied" : "Copy reply"}
        </Button>
      </div>

      <p aria-live="polite" className="sr-only">
        {copyStatus === "copied" && "Reply copied to clipboard."}
      </p>
      {copyStatus === "failed" && (
        <p role="alert" className="mt-2 text-[13px] text-[#9A4321]">
          Couldn&apos;t copy automatically. Select the text and copy it manually.
        </p>
      )}
    </section>
  );
}
