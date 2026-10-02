import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  active: boolean;
  onActivate: () => void;
};

/** Feature row that lifts into a white card while active. */
export function FeatureCard({ icon: Icon, title, description, active, onActivate }: FeatureCardProps) {
  return (
    <div
      onMouseEnter={onActivate}
      className={cn(
        "flex items-start gap-[18px] rounded-[18px] border px-6 py-[22px] transition-all duration-250",
        active ? "border-[#D6E3D9] bg-white shadow-[0_16px_36px_rgba(18,59,44,0.10)]" : "border-transparent",
      )}
    >
      <span
        className={cn(
          "flex size-11 flex-none items-center justify-center rounded-xl border border-[#DCE7DE] transition-colors duration-250",
          active ? "bg-pine" : "bg-white",
        )}
      >
        <Icon aria-hidden size={20} className={active ? "text-mint-pale" : "text-emerald"} />
      </span>
      <div>
        <h3 className="text-[17px] font-bold">{title}</h3>
        <p className="mt-1.5 text-sm leading-[1.6] text-[#4C5A52]">{description}</p>
      </div>
    </div>
  );
}
