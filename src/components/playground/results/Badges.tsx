import type { Priority, Sentiment } from "@/lib/ai/schemas";
import { cn } from "@/lib/cn";

const SENTIMENT_STYLES: Record<Sentiment, string> = {
  Positive: "bg-mist text-emerald [--dot:var(--color-leaf)]",
  Neutral: "bg-[#EDEDEA] text-secondary [--dot:var(--color-muted-light)]",
  Negative: "bg-[#F5E3DA] text-[#9A4321] [--dot:#D9734A]",
};

const PRIORITY_STYLES: Record<Priority, string> = {
  Low: "bg-[#EDEDEA] text-body [--dot:var(--color-muted-light)]",
  Medium: "bg-[#F5EEDC] text-[#7A5A12] [--dot:#D9B54A]",
  High: "bg-[#F5E3DA] text-[#9A4321] [--dot:#D9734A]",
};

function Badge({ label, className }: { label: string; className: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-bold", className)}>
      <span aria-hidden className="size-[7px] rounded-full bg-(--dot)" />
      {label}
    </span>
  );
}

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  return <Badge label={sentiment} className={SENTIMENT_STYLES[sentiment]} />;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <Badge label={priority} className={PRIORITY_STYLES[priority]} />;
}
