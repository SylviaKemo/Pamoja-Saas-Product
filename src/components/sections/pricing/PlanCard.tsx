import { ButtonLink } from "@/components/ui/Button";
import type { Billing, Plan } from "@/data/pricing";
import { cn } from "@/lib/cn";

type PlanCardProps = {
  plan: Plan;
  billing: Billing;
};

/** A pricing plan. The highlighted plan is dark green with a mint glow and a "POPULAR" badge. */
export function PlanCard({ plan, billing }: PlanCardProps) {
  const dark = Boolean(plan.highlighted);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[22px] px-7 py-8",
        dark ? "bg-pine text-white shadow-[0_30px_60px_rgba(18,59,44,0.24)]" : "border border-sand bg-white",
      )}
    >
      {dark && (
        <div
          aria-hidden
          className="absolute -top-20 -right-20 size-60 rounded-full bg-[radial-gradient(closest-side,rgba(127,199,154,0.35),rgba(127,199,154,0))]"
        />
      )}

      <div className="relative text-center">
        <div className="flex items-center justify-center gap-2">
          <span className={cn("text-xs font-bold tracking-[0.12em] uppercase", dark ? "text-mint-pale" : "text-muted")}>
            {plan.name}
          </span>
          {dark && (
            <span className="rounded-md bg-mint px-[7px] py-[3px] text-[10px] font-extrabold tracking-[0.06em] text-pine">
              POPULAR
            </span>
          )}
        </div>

        {plan.price ? (
          <div className="mt-3.5 flex items-baseline justify-center gap-1.5">
            <span className="text-[40px] font-extrabold tracking-[-0.03em]">{plan.price[billing]}</span>
            <span className={cn("text-sm", dark ? "text-on-dark" : "text-muted")}>{plan.period}</span>
          </div>
        ) : (
          <div className="mt-3.5 text-[40px] leading-[1.2] font-extrabold tracking-[-0.03em]">{plan.priceLabel}</div>
        )}

        <p className={cn("mt-2 text-sm leading-[1.5]", dark ? "text-on-dark" : "text-body")}>{plan.description}</p>
      </div>

      <div className={cn("relative my-[26px] h-px", dark ? "bg-white/14" : "bg-sand-50")} />

      <ul className="relative flex flex-1 flex-col gap-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5">
            <span className={cn("size-[7px] flex-none rounded-full", dark ? "bg-mint" : "bg-leaf")} />
            {feature}
          </li>
        ))}
      </ul>

      <ButtonLink href={plan.cta.href} variant={dark ? "cream" : "plain"} size="block" className="relative mt-7">
        {plan.cta.label}
      </ButtonLink>
    </div>
  );
}
