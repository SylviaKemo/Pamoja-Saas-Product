import {
  CreditCard,
  MessageCircle,
  RotateCcw,
  ShoppingBag,
  Truck,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import type { Analysis, Intent } from "@/lib/ai/schemas";
import { PriorityBadge, SentimentBadge } from "./Badges";

const INTENT_ICONS: Record<Intent, LucideIcon> = {
  "Billing Issue": CreditCard,
  "Refund Request": RotateCcw,
  "Technical Support": Wrench,
  "Delivery Problem": Truck,
  "Product Inquiry": ShoppingBag,
  "Account Issue": UserRound,
  "General Inquiry": MessageCircle,
};

/** Intent, sentiment and priority tiles, followed by the summary, priority reasoning and next action. */
export function InsightCards({ analysis }: { analysis: Analysis }) {
  const IntentIcon = INTENT_ICONS[analysis.intent];

  return (
    <div className="flex flex-col gap-3">
      <dl className="grid gap-3 sm:grid-cols-3">
        <Tile label="Customer intent">
          <span className="inline-flex items-center gap-2 text-[15px] font-bold text-ink">
            <span className="flex size-7 flex-none items-center justify-center rounded-lg bg-pine text-mint-pale">
              <IntentIcon aria-hidden size={15} />
            </span>
            {analysis.intent}
          </span>
        </Tile>
        <Tile label="Sentiment">
          <SentimentBadge sentiment={analysis.sentiment} />
        </Tile>
        <Tile label="Suggested priority">
          <PriorityBadge priority={analysis.priority} />
        </Tile>
      </dl>

      <TextCard title="Conversation summary">{analysis.summary}</TextCard>
      <TextCard title="Why this priority">{analysis.priorityReason}</TextCard>
      <TextCard title="Recommended next action" highlight>
        {analysis.recommendedAction}
      </TextCard>
    </div>
  );
}

function Tile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-sand-100 bg-cream/60 p-3.5">
      <dt className="text-[11px] font-bold tracking-[0.08em] text-muted uppercase">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function TextCard({ title, children, highlight }: { title: string; children: ReactNode; highlight?: boolean }) {
  return (
    <section
      className={
        highlight ? "rounded-2xl border border-[#D6E3D9] bg-mist/70 p-4" : "rounded-2xl border border-sand-100 p-4"
      }
    >
      <h3 className="font-sans text-[11px] font-bold tracking-[0.08em] text-emerald uppercase">{title}</h3>
      <p className="mt-1.5 text-[15px] leading-[1.6] whitespace-pre-line text-secondary">{children}</p>
    </section>
  );
}
