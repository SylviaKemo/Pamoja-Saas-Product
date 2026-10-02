import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingProps = {
  children: ReactNode;
  className?: string;
};

/** Section heading (H2) with the shared type scale. */
export function SectionHeading({ children, className }: HeadingProps) {
  return (
    <h2
      className={cn(
        "text-[clamp(32px,4vw,48px)] leading-[1.1] font-extrabold tracking-[-0.035em] text-balance",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** Paragraph that follows a section heading. */
export function SectionLead({ children, className }: HeadingProps) {
  return <p className={cn("mt-4 text-base leading-[1.65] text-pretty text-body", className)}>{children}</p>;
}
