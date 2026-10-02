import type { ReactNode } from "react";
import { SectionHeading, SectionLead } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionTag } from "@/components/ui/SectionTag";
import { CustomerRepeatsPreview } from "./previews/CustomerRepeatsPreview";
import { NotificationPilePreview } from "./previews/NotificationPilePreview";
import { ScatteredChannelsPreview } from "./previews/ScatteredChannelsPreview";

const PROBLEMS: { title: string; description: string; preview: ReactNode }[] = [
  {
    title: "Messages everywhere",
    description: "Bring conversations from email, WhatsApp, social media and live chat into one inbox.",
    preview: <ScatteredChannelsPreview />,
  },
  {
    title: "Replies get missed",
    description: "See new and unanswered conversations clearly, so important messages don't slip through.",
    preview: <NotificationPilePreview />,
  },
  {
    title: "Teams lose context",
    description: "Keep the full conversation history available to everyone, no matter who spoke to the customer last.",
    preview: <CustomerRepeatsPreview />,
  },
];

export function Problem() {
  return (
    <Section id="features" className="bg-white">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <SectionTag>WHY PAMOJA</SectionTag>
          <SectionHeading className="mt-5 max-w-[720px]">
            Stop jumping between apps to talk to your customers.
          </SectionHeading>
          <SectionLead className="max-w-[560px]">
            Customer messages shouldn&apos;t be scattered across different inboxes. Pamoja gives your team one place to
            see what&apos;s coming in and what needs a reply.
          </SectionLead>
        </Reveal>

        <div className="mt-15 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {PROBLEMS.map((problem, i) => (
            <Reveal key={problem.title} index={i}>
              <ProblemCard {...problem} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProblemCard({ title, description, preview }: (typeof PROBLEMS)[number]) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-sand-100 bg-white px-3.5 pt-3.5 pb-[30px] shadow-card transition duration-250 hover:-translate-y-1 hover:shadow-card-hover">
      <div aria-hidden className="relative mb-1.5 h-[132px] w-full overflow-hidden rounded-2xl border border-sand-100 bg-cream">
        {preview}
      </div>
      <h3 className="mt-6 px-3 text-[19px] font-bold tracking-[-0.01em]">{title}</h3>
      <p className="mt-2.5 max-w-[320px] px-3 text-sm leading-[1.65] text-body">{description}</p>
    </article>
  );
}
