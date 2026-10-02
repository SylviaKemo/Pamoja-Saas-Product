import { Collaboration } from "@/components/sections/collaboration/Collaboration";
import { Hero } from "@/components/sections/hero/Hero";
import { Navbar } from "@/components/layout/Navbar";
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
      </main>
    </>
  );
}
