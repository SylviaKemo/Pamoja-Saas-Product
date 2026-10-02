import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Full-width page section with the standard 120px vertical and 28px side padding. */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("px-7 py-30", className)} {...props} />;
}

/** Centres content at the 1200px max width. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto max-w-[1200px]", className)} {...props} />;
}
