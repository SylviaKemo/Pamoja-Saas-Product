import { AiLabel } from "@/components/ui/AiLabel";
import { ButtonLink } from "@/components/ui/Button";
import { CheckItem } from "@/components/ui/CheckItem";
import { SectionHeading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { AI_FEATURES } from "@/data/features";
import { TypingReplyCard } from "./TypingReplyCard";

export function AiSection() {
  return (
    <Section className="relative overflow-hidden bg-forest text-[#F3F1E8]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-50 size-[700px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(127,199,154,0.22),rgba(127,199,154,0)_70%)]"
      />

      <Container className="relative grid items-center gap-16 split:grid-cols-2">
        <Reveal variant="left" className="rounded-3xl border border-white/12 bg-white/5 p-3.5">
          <TypingReplyCard />
        </Reveal>

        {/* Text comes first on narrow screens. */}
        <Reveal variant="right" className="order-first split:order-none">
          <AiLabel>PAMOJA AI</AiLabel>
          <SectionHeading className="mt-5 text-white">Spend less time on repetitive replies.</SectionHeading>
          <p className="mt-4 max-w-[500px] text-base leading-[1.65] text-pretty text-on-dark">
            Pamoja helps your team understand conversations and prepare responses, while keeping your team in control
            of what gets sent.
          </p>

          <div className="mt-[30px] flex flex-col gap-[18px]">
            {AI_FEATURES.map((feature) => (
              <CheckItem key={feature.title} title={feature.title} description={feature.description} tone="dark" />
            ))}
          </div>

          <ButtonLink href="#" className="mt-[30px]">
            See Pamoja AI in action →
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
