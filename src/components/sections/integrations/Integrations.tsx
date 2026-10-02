import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading, SectionLead } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionTag } from "@/components/ui/SectionTag";
import { LiveFeedDemo } from "./LiveFeedDemo";

export function Integrations() {
  return (
    <Section id="integrations" className="overflow-hidden bg-white">
      <Container className="flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center">
          <SectionTag>INTEGRATIONS</SectionTag>
          <SectionHeading className="mt-5">Bring every channel with you.</SectionHeading>
          <SectionLead className="max-w-[540px]">
            Connect the places your customers already use. New messages arrive in Pamoja automatically, ready for your
            team to handle.
          </SectionLead>
        </Reveal>

        <Reveal variant="scale" className="mt-11 w-full">
          <LiveFeedDemo />
        </Reveal>

        <Reveal className="mt-14 flex flex-col items-center">
          <h3 className="text-[clamp(22px,2.4vw,28px)] font-extrabold tracking-[-0.02em] text-balance">
            One inbox. No matter where the conversation started.
          </h3>
          <p className="mt-2.5 max-w-[500px] text-[15px] leading-[1.6] text-body">
            Add a new channel whenever you need it without changing how your team works.
          </p>
          <ButtonLink href="#" variant="outline" className="mt-6">
            View integrations →
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
