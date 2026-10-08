import { LoaderCircle, Sparkles } from "lucide-react";
import type { KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/TextArea";
import { EXAMPLE_BUSINESS_CONTEXT, SAMPLE_SCENARIOS } from "@/data/playgroundSamples";
import { LIMITS } from "@/lib/ai/schemas";
import { Panel } from "./Panel";
import { SampleScenarios } from "./SampleScenarios";

type MessagePanelProps = {
  message: string;
  onMessageChange: (value: string) => void;
  businessContext: string;
  onBusinessContextChange: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
};

/** Left column: the customer message, sample scenarios, optional business context and the Analyze button. */
export function MessagePanel({
  message,
  onMessageChange,
  businessContext,
  onBusinessContextChange,
  onAnalyze,
  isAnalyzing,
}: MessagePanelProps) {
  const canAnalyze = message.trim().length > 0 && !isAnalyzing;
  const selectedSampleId = SAMPLE_SCENARIOS.find((s) => s.message === message)?.id ?? null;

  // Ctrl/Cmd + Enter submits from either text field.
  const submitOnShortcut = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && canAnalyze) {
      event.preventDefault();
      onAnalyze();
    }
  };

  return (
    <Panel title="Customer message">
      <div className="flex flex-col gap-6">
        <TextArea
          id="customer-message"
          label="What did the customer say?"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={submitOnShortcut}
          maxLength={LIMITS.customerMessage}
          rows={7}
          disabled={isAnalyzing}
          required
          placeholder="Paste a customer message here and let Pamoja AI help you understand and respond to it..."
        />

        <SampleScenarios selectedId={selectedSampleId} onSelect={onMessageChange} disabled={isAnalyzing} />

        <div>
          <TextArea
            id="business-context"
            label="Business context"
            optional
            description="Policies or facts the AI may use. It won't invent anything that isn't here."
            value={businessContext}
            onChange={(e) => onBusinessContextChange(e.target.value)}
            onKeyDown={submitOnShortcut}
            maxLength={LIMITS.businessContext}
            rows={4}
            disabled={isAnalyzing}
            placeholder={"e.g. Refunds are available within 14 days.\nOrders are normally delivered within 3-5 business days."}
          />
          {businessContext.trim() === "" && (
            <button
              type="button"
              onClick={() => onBusinessContextChange(EXAMPLE_BUSINESS_CONTEXT)}
              disabled={isAnalyzing}
              className="mt-2 cursor-pointer rounded text-[13px] font-semibold text-emerald underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf disabled:opacity-50"
            >
              + Use example policies
            </button>
          )}
        </div>

        <div>
          <Button variant="pine" size="lg" onClick={onAnalyze} disabled={!canAnalyze} className="w-full justify-center gap-2">
            {isAnalyzing ? (
              <>
                <LoaderCircle aria-hidden size={18} className="animate-spin" />
                Analyzing message…
              </>
            ) : (
              <>
                <Sparkles aria-hidden size={18} />
                Analyze with Pamoja AI
              </>
            )}
          </Button>
          <p className="mt-2 text-center text-xs text-muted-light">
            Tip: press <kbd className="font-sans font-semibold text-muted">Ctrl</kbd> +{" "}
            <kbd className="font-sans font-semibold text-muted">Enter</kbd> to analyze
          </p>
        </div>
      </div>
    </Panel>
  );
}
