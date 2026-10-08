import type { Metadata } from "next";
import { Playground } from "@/components/playground/Playground";
import { PlaygroundHeader } from "@/components/playground/PlaygroundHeader";

export const metadata: Metadata = {
  title: "AI Playground · Pamoja",
  description:
    "Paste a customer message and watch Pamoja AI find the intent, sentiment and priority, then draft a reply you can refine.",
};

export default function AiPlaygroundPage() {
  return (
    <main className="min-h-screen bg-cream pb-24">
      <PlaygroundHeader />
      <Playground />
    </main>
  );
}
