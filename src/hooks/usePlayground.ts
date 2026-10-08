import { useEffect, useRef, useState } from "react";
import type { ResultsView } from "@/components/playground/results/ResultsPanel";
import { analyzeMessage, isAbortError, PlaygroundRequestError, refineReply } from "@/lib/ai/client";
import { ERROR_COPY } from "@/lib/ai/errorMessages";
import type { RefinementType } from "@/lib/ai/schemas";

/** The inputs a shown analysis was generated from. */
type AnalyzedInputs = { customerMessage: string; businessContext: string };

function describeError(error: unknown) {
  const code = error instanceof PlaygroundRequestError ? error.code : "ai_unavailable";
  const copy = ERROR_COPY[code];
  const message = error instanceof PlaygroundRequestError && error.serverMessage ? error.serverMessage : copy.message;
  return { ...copy, message };
}

/** All state and actions for the AI Playground. */
export function usePlayground() {
  const [message, setMessage] = useState("");
  const [businessContext, setBusinessContext] = useState("");
  const [view, setView] = useState<ResultsView>({ status: "idle" });
  const [analyzedInputs, setAnalyzedInputs] = useState<AnalyzedInputs | null>(null);
  const [reply, setReply] = useState("");
  const [activeRefinement, setActiveRefinement] = useState<RefinementType | null>(null);
  const [refineError, setRefineError] = useState<string | null>(null);

  // One controller per kind of request, so Start over or a new analysis cancels stale work.
  const analyzeController = useRef<AbortController | null>(null);
  const refineController = useRef<AbortController | null>(null);

  useEffect(
    () => () => {
      analyzeController.current?.abort();
      refineController.current?.abort();
    },
    [],
  );

  const isAnalyzing = view.status === "loading";
  const isStale =
    view.status === "success" &&
    analyzedInputs !== null &&
    (analyzedInputs.customerMessage !== message.trim() || analyzedInputs.businessContext !== businessContext.trim());

  const analyze = async () => {
    const inputs = { customerMessage: message.trim(), businessContext: businessContext.trim() };
    if (!inputs.customerMessage || isAnalyzing) return;

    analyzeController.current?.abort();
    refineController.current?.abort();
    const controller = new AbortController();
    analyzeController.current = controller;

    setView({ status: "loading" });
    setActiveRefinement(null);
    setRefineError(null);

    try {
      const analysis = await analyzeMessage(inputs, controller.signal);
      setView({ status: "success", analysis });
      setAnalyzedInputs(inputs);
      setReply(analysis.suggestedReply);
    } catch (error) {
      if (isAbortError(error)) return;
      const { title, message: errorMessage, retryable } = describeError(error);
      setView({ status: "error", title, message: errorMessage, retryable });
    }
  };

  const refine = async (refinementType: RefinementType) => {
    if (!analyzedInputs || isStale || activeRefinement || !reply.trim()) return;

    const controller = new AbortController();
    refineController.current = controller;
    setActiveRefinement(refinementType);
    setRefineError(null);

    try {
      // Uses the agent's latest edited draft with the inputs the analysis was based on.
      const revised = await refineReply({ ...analyzedInputs, currentReply: reply, refinementType }, controller.signal);
      setReply(revised);
    } catch (error) {
      if (isAbortError(error)) return;
      const { title, message: errorMessage } = describeError(error);
      setRefineError(`${title}. ${errorMessage}`);
    } finally {
      if (refineController.current === controller) setActiveRefinement(null);
    }
  };

  const startOver = () => {
    analyzeController.current?.abort();
    refineController.current?.abort();
    setMessage("");
    setBusinessContext("");
    setView({ status: "idle" });
    setAnalyzedInputs(null);
    setReply("");
    setActiveRefinement(null);
    setRefineError(null);
  };

  return {
    message,
    setMessage,
    businessContext,
    setBusinessContext,
    view,
    isAnalyzing,
    isStale,
    reply,
    setReply,
    activeRefinement,
    refineError,
    analyze,
    refine,
    startOver,
    hasContent: message !== "" || businessContext !== "" || view.status !== "idle",
  };
}
