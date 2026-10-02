import { Hero } from "@/components/sections/hero/Hero";
import { Navbar } from "@/components/layout/Navbar";
import { Problem } from "@/components/sections/problem/Problem";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero />
        <Problem />
      </main>
    </>
  );
}
