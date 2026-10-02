import { AiSection } from "@/components/sections/ai/AiSection";
import { Collaboration } from "@/components/sections/collaboration/Collaboration";
import { Faq } from "@/components/sections/faq/Faq";
import { Hero } from "@/components/sections/hero/Hero";
import { Integrations } from "@/components/sections/integrations/Integrations";
import { Navbar } from "@/components/layout/Navbar";
import { Pricing } from "@/components/sections/pricing/Pricing";
import { Problem } from "@/components/sections/problem/Problem";
import { SharedInbox } from "@/components/sections/shared-inbox/SharedInbox";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero />
        <Problem />
        <SharedInbox />
        <Collaboration />
        <AiSection />
        <Integrations />
        <Pricing />
        <Faq />
      </main>
    </>
  );
}
