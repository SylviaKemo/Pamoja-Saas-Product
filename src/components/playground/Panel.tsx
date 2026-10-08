import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelProps = {
  title: string;
  /** Content on the right of the title, e.g. an action button. */
  action?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** White workspace card with a heading row. */
export function Panel({ title, action, children, className }: PanelProps) {
  return (
    <section
      aria-label={title}
      className={cn("rounded-[22px] border border-sand bg-white p-5 shadow-panel sm:p-7", className)}
    >
      <div className="flex min-h-9 items-center justify-between gap-3">
        <h2 className="text-lg font-bold tracking-[-0.01em]">{title}</h2>
        {action}
      </div>
      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}
