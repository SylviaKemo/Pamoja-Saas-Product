import { CreditCard, MessageCircleQuestion, PackageX, type LucideIcon } from "lucide-react";

export type SampleScenario = {
  id: string;
  title: string;
  /** Short mood label shown on the sample card. */
  mood: string;
  icon: LucideIcon;
  message: string;
};

/** Example customer messages. They only fill the input; every AI result is generated live. */
export const SAMPLE_SCENARIOS: SampleScenario[] = [
  {
    id: "delayed-order",
    title: "Delayed order",
    mood: "Angry",
    icon: PackageX,
    message:
      "This is ridiculous. I ordered a standing desk (order #58213) on the 2nd and it STILL hasn't arrived. Your website said 3-5 days. I've emailed twice and nobody has replied. If it isn't here by Friday I want my money back.",
  },
  {
    id: "duplicate-charge",
    title: "Charged twice",
    mood: "Worried",
    icon: CreditCard,
    message:
      "Hi, I just checked my bank statement and I've been charged twice for my Premium subscription this month - two payments of $29 on the 3rd. Can you please look into this and refund the extra payment? Thanks.",
  },
  {
    id: "pricing-question",
    title: "Pricing question",
    mood: "Curious",
    icon: MessageCircleQuestion,
    message:
      "Hello! We're a small online shop with 6 people answering customers on WhatsApp and Instagram. How much would your product cost for our team, and does it include AI reply suggestions? Is there a free trial?",
  },
];

/** Example business rules, offered as a one-click fill for the optional context field. */
export const EXAMPLE_BUSINESS_CONTEXT = [
  "Refunds are available within 14 days of purchase.",
  "Orders are normally delivered within 3-5 business days.",
  "Premium subscriptions cost $29/month and support up to 10 team members.",
  "Support hours are Monday to Friday, 9am-5pm.",
].join("\n");
