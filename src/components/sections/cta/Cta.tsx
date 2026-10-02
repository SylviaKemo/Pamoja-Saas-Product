import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Closing call to action: a deep-green card on a white section. */
export function Cta() {
  return (
    <section className="bg-white px-7 pt-10 pb-30">
      <Reveal
        variant="scale"
        className="relative mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[28px] bg-pine px-[clamp(28px,5vw,72px)] py-16"
      >
        <div
          aria-hidden
          className="absolute -top-40 -right-30 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(127,199,154,0.32),rgba(127,199,154,0)_70%)]"
        />
        <div aria-hidden className="absolute right-30 -bottom-35 size-[280px] rounded-full border border-white/10" />

        <div className="relative max-w-[620px]">
          <h2 className="text-[clamp(30px,4vw,48px)] leading-[1.08] font-extrabold tracking-[-0.035em] text-balance text-white">
            Bring your customer conversations together.
          </h2>
          <p className="mt-3.5 text-base leading-[1.6] text-on-dark">
            One inbox for your customers. One place for your team to work.
          </p>
        </div>

        <div className="relative flex flex-col items-start gap-2.5">
          <ButtonLink href="#pricing" size="xl">
            Get started free
          </ButtonLink>
          <span className="text-[13px] text-[#A9BDB0]">No credit card required.</span>
        </div>
      </Reveal>
    </section>
  );
}
