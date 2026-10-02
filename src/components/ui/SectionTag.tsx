import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionTagProps = {
  children: ReactNode;
  /** Use "mist" on the pale-green section for a greener border. */
  tone?: "default" | "mist";
  className?: string;
};

/** Small uppercase label that sits above a section heading on light backgrounds. */
export function SectionTag({ children, tone = "default", className }: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border bg-white py-[5px] pr-2.5 pl-[5px] text-[11px] font-bold tracking-[0.08em]",
        tone === "mist" ? "border-[#D6E3D9]" : "border-sand-200",
        className,
      )}
    >
      <span className="flex size-5 items-center justify-center rounded-md bg-mist">
        <span className="size-[7px] rounded-full bg-leaf-bright" />
      </span>
      {children}
    </span>
  );
}
