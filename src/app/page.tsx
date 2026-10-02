import { Hero } from "@/components/sections/hero/Hero";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-x-clip">
        <Hero />
      </main>
    </>
  );
}
