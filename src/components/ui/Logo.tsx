import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  /** "glass" uses the orb image (dark backgrounds); "flat" uses a two-tone dot (light backgrounds, small sizes). */
  variant?: "glass" | "flat";
  className?: string;
};

/** The "pamoja" wordmark, with the glass orb standing in for the "o". */
export function Logo({ variant = "glass", className }: LogoProps) {
  const isGlass = variant === "glass";

  return (
    <span
      role="img"
      aria-label="Pamoja"
      className={cn(
        "flex items-center font-heading leading-none font-extrabold tracking-[-0.04em]",
        isGlass ? "text-[26px] text-white" : "text-[28px] text-pine",
        className,
      )}
    >
      <span aria-hidden>pam</span>
      {isGlass ? (
        <Image src="/images/orb.png" alt="" width={21} height={21} className="mx-px mt-1 size-[21px]" />
      ) : (
        <span
          aria-hidden
          className="mx-0.5 mt-[5px] inline-block size-5 rounded-full bg-pine shadow-[inset_5px_-4px_0_0_var(--color-leaf)]"
        />
      )}
      <span aria-hidden>ja</span>
    </span>
  );
}
