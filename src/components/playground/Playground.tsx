"use client";

import { useRef } from "react";
import { usePlayground } from "@/hooks/usePlayground";
import { MessagePanel } from "./MessagePanel";
import { ReplyEditor } from "./reply/ReplyEditor";
import { ResultsPanel } from "./results/ResultsPanel";
import { StartOverButton } from "./StartOverButton";

/** Matches the `split` breakpoint in globals.css, where the columns sit side by side. */
const SIDE_BY_SIDE_QUERY = "(min-width: 1000px)";

/** The two-column workspace: customer message on the left, AI results on the right. */
export function Playground() {
  const playground = usePlayground();
  const resultsRef = useRef<HTMLDivElement>(null);

  const analyze = () => {
    // When the columns are stacked, bring the results into view so the loading state is visible.
    if (!window.matchMedia(SIDE_BY_SIDE_QUERY).matches) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    playground.analyze();
  };

  return (
    <div className="relative -mt-[72px] px-4 nav:px-7">
      <div className="mx-auto grid max-w-[1200px] items-start gap-5 split:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <MessagePanel
          message={playground.message}
          onMessageChange={playground.setMessage}
          businessContext={playground.businessContext}
          onBusinessContextChange={playground.setBusinessContext}
          onAnalyze={analyze}
          isAnalyzing={playground.isAnalyzing}
        />

        <div ref={resultsRef} className="scroll-mt-4">
          <ResultsPanel
            view={playground.view}
            isStale={playground.isStale}
            onAnalyze={analyze}
            headerAction={playground.hasContent && <StartOverButton onClick={playground.startOver} />}
            replySlot={
              <ReplyEditor
                value={playground.reply}
                onChange={playground.setReply}
                onRefine={playground.refine}
                activeRefinement={playground.activeRefinement}
                refineDisabled={playground.isStale}
                error={playground.refineError}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
