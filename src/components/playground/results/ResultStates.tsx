import { CircleAlert, History, RefreshCw } from "lucide-react";
import Image from "next/image";
import { AiLabel } from "@/components/ui/AiLabel";
import { Button } from "@/components/ui/Button";

const INSIGHTS = ["Intent", "Sentiment", "Priority", "Summary", "Next action", "Suggested reply"];

/** Shown before the first analysis. */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-sand-200 bg-cream/50 px-6 py-14 text-center">
      <Image src="/images/orb.png" alt="" width={72} height={72} className="size-[72px] opacity-90" />
      <p className="mt-5 max-w-[340px] text-[15px] leading-[1.6] font-semibold text-secondary">
        Your AI analysis will appear here. Enter a customer message to get started.
      </p>
      <ul className="mt-5 flex max-w-[380px] flex-wrap justify-center gap-1.5">
        {INSIGHTS.map((item) => (
          <li key={item} className="rounded-full border border-sand bg-white px-2.5 py-1 text-xs font-medium text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Placeholder blocks while the analysis runs. */
export function AnalysisSkeleton() {
  return (
    <div role="status" className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <AiLabel tone="light">PAMOJA AI IS READING THE MESSAGE</AiLabel>
        <span className="sr-only">Analyzing the customer message…</span>
      </div>
      <div aria-hidden className="grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-[84px] animate-pulse rounded-2xl bg-cream" />
        ))}
      </div>
      {[64, 64, 84, 180].map((height, i) => (
        <div key={i} aria-hidden className="animate-pulse rounded-2xl bg-cream" style={{ height }} />
      ))}
    </div>
  );
}

type ErrorNoticeProps = {
  title: string;
  message: string;
  /** Shows a "Try again" button when the request can be retried. */
  onRetry?: () => void;
};

/** A friendly error with an optional retry. */
export function ErrorNotice({ title, message, onRetry }: ErrorNoticeProps) {
  return (
    <div role="alert" className="flex items-start gap-3 rounded-2xl border border-[#EBC3AE] bg-[#FBEFE9] p-4">
      <CircleAlert aria-hidden size={20} className="mt-px flex-none text-[#B3542C]" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-[#7A3418]">{title}</p>
        <p className="mt-1 text-sm leading-[1.55] text-[#7A3418]/90">{message}</p>
        {onRetry && (
          <Button variant="outline" size="xs" onClick={onRetry} className="mt-3">
            <RefreshCw aria-hidden size={14} />
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}

/** Warns that the inputs changed after the results were generated. */
export function StaleNotice({ onReanalyze, disabled }: { onReanalyze: () => void; disabled?: boolean }) {
  return (
    <div role="status" className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E8D48F] bg-[#FFF7E0] p-3.5">
      <History aria-hidden size={18} className="flex-none text-[#5E4A12]" />
      <p className="min-w-0 flex-1 text-sm leading-[1.5] text-[#5E4A12]">
        <strong className="font-bold">These results are outdated.</strong> The message or context changed since this
        analysis.
      </p>
      <Button variant="outline" size="xs" onClick={onReanalyze} disabled={disabled}>
        <RefreshCw aria-hidden size={14} />
        Analyze again
      </Button>
    </div>
  );
}
