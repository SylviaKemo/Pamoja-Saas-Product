import { motion } from "framer-motion";
import type { Billing } from "@/data/pricing";
import { cn } from "@/lib/cn";

const OPTIONS: { value: Billing; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly · save 20%" },
];

type BillingToggleProps = {
  value: Billing;
  onChange: (value: Billing) => void;
};

/** Segmented Monthly / Yearly switch. The dark pill slides to the selected option. */
export function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="mt-7 flex rounded-xl border border-sand-200 bg-white p-1 text-[13px] font-semibold"
    >
      {OPTIONS.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative cursor-pointer rounded-[9px] px-4 py-[9px] transition-colors",
              selected ? "text-white" : "text-secondary",
            )}
          >
            {selected && (
              <motion.span
                layoutId="billing-pill"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="absolute inset-0 rounded-[9px] bg-pine"
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
