import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const VARIANTS = {
  /** Cream button for dark backgrounds. */
  cream: "bg-cream font-bold text-pine hover:bg-white",
  /** Outlined button for dark backgrounds. */
  ghost: "border border-white/25 font-semibold text-white hover:border-white/50",
  /** Solid dark-green button for light backgrounds. */
  pine: "bg-pine font-semibold text-white hover:bg-pine-deep",
  /** White outlined button for light backgrounds. */
  outline: "border border-[#E0DCCF] bg-white font-semibold text-ink hover:border-[#B9C7BD]",
  /** Transparent outlined button used on pricing cards. */
  plain: "border border-[#D6D2C4] font-semibold text-ink hover:border-pine",
} as const;

const SIZES = {
  sm: "rounded-[10px] px-4 py-2.5 text-sm",
  md: "rounded-[10px] px-[18px] py-3 text-sm",
  lg: "rounded-[10px] px-5 py-[13px] text-[15px]",
  xl: "rounded-[10px] px-[22px] py-3.5 text-[15px]",
  /** Full-width, used on pricing cards. */
  block: "w-full justify-center rounded-[10px] p-3 text-sm",
  /** Full-width, used in the mobile menu. */
  menu: "w-full justify-center rounded-xl p-[15px] text-base",
} as const;

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
};

/** A link styled as a button. */
export function ButtonLink({ variant = "cream", size = "md", className, ...props }: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center transition-colors duration-200",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
