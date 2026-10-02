import { cn } from "@/lib/cn";

type MenuButtonProps = {
  open: boolean;
  onClick: () => void;
  className?: string;
};

const BAR = "block h-0.5 w-[18px] rounded-sm bg-white";

/** Hamburger button whose three bars turn into an X when the menu is open. */
export function MenuButton({ open, onClick, className }: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className={cn(
        "relative z-[41] flex size-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-xl border border-white/18 bg-white/6",
        className,
      )}
    >
      <span className={cn(BAR, "transition-transform duration-300", open && "translate-y-[7px] rotate-45")} />
      <span className={cn(BAR, "transition-opacity duration-200", open && "opacity-0")} />
      <span className={cn(BAR, "transition-transform duration-300", open && "-translate-y-[7px] -rotate-45")} />
    </button>
  );
}
