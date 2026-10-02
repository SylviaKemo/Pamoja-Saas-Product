import { cn } from "@/lib/cn";

type CheckItemProps = {
  title: string;
  description: string;
  /** "light" for cream/white sections, "dark" for deep-green sections. */
  tone?: "light" | "dark";
};

/** A feature line with a round tick, a bold title and a short description. */
export function CheckItem({ title, description, tone = "light" }: CheckItemProps) {
  const isDark = tone === "dark";

  return (
    <div className="flex items-start gap-3.5">
      <span
        aria-hidden
        className={cn(
          "mt-px flex size-[22px] flex-none items-center justify-center rounded-full text-[11px] font-extrabold",
          isDark ? "bg-mint text-forest" : "bg-pine text-mint",
        )}
      >
        ✓
      </span>
      <div>
        <div className={cn("text-base font-bold", isDark && "text-white")}>{title}</div>
        <p className={cn("mt-1 text-sm leading-[1.6]", isDark ? "text-on-dark" : "text-body")}>{description}</p>
      </div>
    </div>
  );
}
