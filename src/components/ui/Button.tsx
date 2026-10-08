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
  xs: "gap-1.5 rounded-lg px-3 py-2 text-[13px]",
  sm: "rounded-[10px] px-4 py-2.5 text-sm",
  md: "rounded-[10px] px-[18px] py-3 text-sm",
  lg: "rounded-[10px] px-5 py-[13px] text-[15px]",
  xl: "rounded-[10px] px-[22px] py-3.5 text-[15px]",
  /** Full-width, used on pricing cards. */
  block: "w-full justify-center rounded-[10px] p-3 text-sm",
  /** Full-width, used in the mobile menu. */
  menu: "w-full justify-center rounded-xl p-[15px] text-base",
} as const;

type StyleProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
};

function buttonClasses({ variant = "cream", size = "md" }: StyleProps, className?: string) {
  return cn(
    "inline-flex items-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

/** A link styled as a button. */
export function ButtonLink({ variant, size, className, ...props }: ComponentProps<"a"> & StyleProps) {
  return <a className={buttonClasses({ variant, size }, className)} {...props} />;
}

/** A button element with the same styles as ButtonLink, plus a disabled state. */
export function Button({ variant, size, className, type = "button", ...props }: ComponentProps<"button"> & StyleProps) {
  return (
    <button
      type={type}
      className={buttonClasses(
        { variant, size },
        cn("cursor-pointer disabled:pointer-events-none disabled:opacity-50", className),
      )}
      {...props}
    />
  );
}
