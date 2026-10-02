"use client";

import { useState } from "react";
import { SectionHeading, SectionLead } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionTag } from "@/components/ui/SectionTag";
import { PLANS, type Billing } from "@/data/pricing";
import { BillingToggle } from "./BillingToggle";
import { PlanCard } from "./PlanCard";

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <Section id="pricing" className="bg-cream">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <SectionTag>SIMPLE PRICING</SectionTag>
          <SectionHeading className="mt-5">Start small. Grow when you&apos;re ready.</SectionHeading>
          <SectionLead className="max-w-[540px]">
            Try Pamoja with your team and upgrade when you need more channels, teammates or features.
          </SectionLead>
          <BillingToggle value={billing} onChange={setBilling} />
        </Reveal>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-stretch gap-5">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} index={i}>
              <PlanCard plan={plan} billing={billing} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
