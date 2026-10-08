import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextAreaProps = Omit<ComponentProps<"textarea">, "value" | "maxLength"> & {
  id: string;
  label: ReactNode;
  value: string;
  /** Shows a character counter and stops typing past the limit. */
  maxLength: number;
  /** Small text under the label. */
  description?: ReactNode;
  /** Marks the field as optional next to its label. */
  optional?: boolean;
};

/** Labelled textarea with a character counter, styled for the cream/sand palette. */
export function TextArea({
  id,
  label,
  value,
  maxLength,
  description,
  optional,
  className,
  ...props
}: TextAreaProps) {
  const nearLimit = value.length > maxLength * 0.9;
  const descriptionId = description ? `${id}-description` : undefined;
  const counterId = `${id}-counter`;

  return (
    <div className="flex flex-col">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-bold text-ink">
          {label}
          {optional && <span className="ml-1.5 text-xs font-medium text-muted-light">Optional</span>}
        </label>
        <span id={counterId} className={cn("text-xs tabular-nums", nearLimit ? "text-[#B3542C]" : "text-muted-light")}>
          {value.length}/{maxLength}
        </span>
      </div>
      {description && (
        <p id={descriptionId} className="mt-1 text-xs leading-[1.5] text-muted">
          {description}
        </p>
      )}
      <textarea
        id={id}
        value={value}
        maxLength={maxLength}
        aria-describedby={cn(descriptionId, counterId)}
        className={cn(
          "mt-2.5 w-full resize-y rounded-[14px] border border-sand bg-white px-4 py-3.5 text-[15px] leading-[1.6] text-ink transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-muted-light focus:border-leaf focus:ring-4 focus:ring-mint/25 disabled:bg-cream disabled:text-muted",
          className,
        )}
        {...props}
      />
    </div>
  );
}
