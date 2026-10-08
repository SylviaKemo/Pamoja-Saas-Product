import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { AiLabel } from "@/components/ui/AiLabel";
import { Logo } from "@/components/ui/Logo";

/** Deep-green band at the top of the playground: navigation back to the site, title and demo notice. */
export function PlaygroundHeader() {
  return (
    <header className="relative overflow-hidden bg-forest px-5 pt-5 pb-[120px] nav:px-7">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-60 -right-40 size-[700px] rounded-full bg-[radial-gradient(closest-side,rgba(127,199,154,0.24),rgba(127,199,154,0)_70%)]"
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[10px] border border-white/20 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:border-white/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
          >
            <ArrowLeft aria-hidden size={16} />
            Back to Pamoja
          </Link>
        </div>

        <div className="mt-14 max-w-[720px]">
          <AiLabel>PAMOJA AI PLAYGROUND</AiLabel>
          <h1 className="mt-5 text-[clamp(34px,4.6vw,56px)] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance text-white">
            Try Pamoja AI on a <span className="text-mint">real customer message.</span>
          </h1>
          <p className="mt-4 max-w-[560px] text-base leading-[1.65] text-pretty text-on-dark">
            Paste a message, add your business rules, and let Pamoja AI work out what the customer needs and draft a
            reply. You stay in control of what gets sent.
          </p>
          <p className="mt-6 flex max-w-[640px] items-start gap-2.5 rounded-xl border border-white/12 bg-white/5 px-3.5 py-3 text-[13px] leading-[1.55] text-on-dark">
            <ShieldAlert aria-hidden size={18} className="mt-px flex-none text-mint" />
            <span>
              <strong className="font-semibold text-white">This is a public demo.</strong> Don&apos;t enter
              confidential or personal customer information. Messages are processed by Google Gemini and, on the free
              tier, may be used by Google to improve its products.
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}
