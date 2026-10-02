"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { FAQS } from "@/data/faqs";
import { FaqItem } from "./FaqItem";

export function Faq() {
  // One question open at a time; the second starts open.
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section id="faq" className="bg-white px-7 pt-30 pb-20">
      <div className="mx-auto max-w-[760px]">
        <Reveal className="flex flex-col items-center text-center">
          <SectionTag>FAQ</SectionTag>
          <SectionHeading className="mt-5">Questions? We&apos;ve got you.</SectionHeading>
        </Reveal>

        <Reveal className="mt-11 flex flex-col border-t border-sand-100">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.question}
              id={`faq-${i}`}
              {...faq}
              open={openIndex === i}
              onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
