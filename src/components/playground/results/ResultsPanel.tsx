import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Analysis } from "@/lib/ai/schemas";
import { cn } from "@/lib/cn";
import { Panel } from "../Panel";
import { InsightCards } from "./InsightCards";
import { AnalysisSkeleton, EmptyState, ErrorNotice, StaleNotice } from "./ResultStates";

export type ResultsView =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; title: string; message: string; retryable: boolean }
  | { status: "success"; analysis: Analysis };

type ResultsPanelProps = {
  view: ResultsView;
  /** True when the inputs changed after the shown analysis was generated. */
  isStale: boolean;
  onAnalyze: () => void;
  /** Rendered below the insight cards once there is an analysis (the reply editor). */
  replySlot?: ReactNode;
  /** Rendered next to the panel title (the Start over button). */
  headerAction?: ReactNode;
};

/** Right column: everything Pamoja AI returns, or the empty / loading / error state. */
export function ResultsPanel({ view, isStale, onAnalyze, replySlot, headerAction }: ResultsPanelProps) {
  return (
    <Panel title="Pamoja AI analysis" action={headerAction}>
      <div aria-live="polite">
        {view.status === "idle" && <EmptyState />}
        {view.status === "loading" && <AnalysisSkeleton />}
        {view.status === "error" && (
          <ErrorNotice title={view.title} message={view.message} onRetry={view.retryable ? onAnalyze : undefined} />
        )}
        {view.status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-3"
          >
            {isStale && <StaleNotice onReanalyze={onAnalyze} />}
            <div className={cn("flex flex-col gap-3 transition-opacity", isStale && "opacity-60")}>
              <InsightCards analysis={view.analysis} />
              {replySlot}
            </div>
          </motion.div>
        )}
      </div>
    </Panel>
  );
}
