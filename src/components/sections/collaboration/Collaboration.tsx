import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { CheckItem } from "@/components/ui/CheckItem";
import { SectionHeading, SectionLead } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionTag } from "@/components/ui/SectionTag";
import { COLLABORATION_FEATURES } from "@/data/features";

export function Collaboration() {
  return (
    <Section className="bg-cream">
      <Container className="grid items-center gap-16 split:grid-cols-2">
        <Reveal variant="left">
          <SectionTag>WORK TOGETHER</SectionTag>
          <SectionHeading className="mt-5">No more wondering who&apos;s replying.</SectionHeading>
          <SectionLead className="max-w-[500px]">
            Pamoja makes it clear who&apos;s handling each conversation, so your team can work together without sending
            duplicate replies or leaving customers waiting.
          </SectionLead>

          <div className="mt-[30px] flex flex-col gap-[18px]">
            {COLLABORATION_FEATURES.map((feature) => (
              <CheckItem key={feature.title} title={feature.title} description={feature.description} />
            ))}
          </div>

          <ButtonLink href="#" variant="outline" className="mt-[30px]">
            Learn about team collaboration →
          </ButtonLink>
        </Reveal>

        <Reveal variant="right">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-[#2A2F2A] shadow-[0_30px_60px_rgba(21,32,26,0.14)]">
            <Image
              src="/images/collaboration.jpg"
              alt="Two teammates working on one laptop"
              fill
              sizes="(min-width: 1000px) 570px, 100vw"
              className="object-cover object-[60%_40%]"
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
