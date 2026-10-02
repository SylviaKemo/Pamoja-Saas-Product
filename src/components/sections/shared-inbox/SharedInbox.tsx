"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section } from "@/components/ui/Section";
import { SectionTag } from "@/components/ui/SectionTag";
import { INBOX_FEATURES } from "@/data/features";
import { FeatureCard } from "./FeatureCard";

export function SharedInbox() {
  // Hovering a card makes it the active one; the middle card starts active.
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <Section id="product" className="bg-mist">
      <Container className="grid items-center gap-16 split:grid-cols-2">
        <Reveal variant="left" className="flex flex-col gap-2.5">
          {INBOX_FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              active={activeIndex === i}
              onActivate={() => setActiveIndex(i)}
            />
          ))}
        </Reveal>

        {/* Text comes first on narrow screens. */}
        <Reveal variant="right" className="order-first split:order-none">
          <SectionTag tone="mist">ONE SHARED INBOX</SectionTag>
          <SectionHeading className="mt-5">Every conversation, in one place.</SectionHeading>
          <p className="mt-4 max-w-[480px] text-base leading-[1.65] text-pretty text-[#4C5A52]">
            Your customers can keep using the channels they already love. Your team gets one organized inbox for
            handling all of them.
          </p>
          <ButtonLink href="#" variant="pine" className="mt-7">
            Explore the shared inbox →
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}
