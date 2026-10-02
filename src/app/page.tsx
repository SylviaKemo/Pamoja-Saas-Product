import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AiSection } from "@/components/sections/ai/AiSection";
import { Collaboration } from "@/components/sections/collaboration/Collaboration";
import { Cta } from "@/components/sections/cta/Cta";
import { Faq } from "@/components/sections/faq/Faq";
import { Hero } from "@/components/sections/hero/Hero";
import { Integrations } from "@/components/sections/integrations/Integrations";
import { Pricing } from "@/components/sections/pricing/Pricing";
import { Problem } from "@/components/sections/problem/Problem";
import { SharedInbox } from "@/components/sections/shared-inbox/SharedInbox";

/**
 * Background rhythm, top to bottom:
 * Hero (deep green) → Problem (white) → Shared Inbox (pale green) → Collaboration (cream) → AI (deep green)
 * → Integrations (white) → Pricing (cream) → FAQ (white) → CTA (white) → Footer (cream)
 */
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
        <Cta />
      </main>
      <Footer />
    </>
  );
}
