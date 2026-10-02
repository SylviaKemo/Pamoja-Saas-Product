export type Billing = "monthly" | "yearly";

export type Plan = {
  name: string;
  /** Price per billing period. Plans without a fixed price show `priceLabel` instead. */
  price?: Record<Billing, string>;
  priceLabel?: string;
  period?: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

export const PLANS: Plan[] = [
  {
    name: "Free",
    price: { monthly: "$0", yearly: "$0" },
    period: "/ month",
    description: "For small teams getting started.",
    features: ["1 shared inbox", "2 team members", "Email + live chat", "Basic conversation tools"],
    cta: { label: "Get started free", href: "#" },
  },
  {
    name: "Team",
    price: { monthly: "$19", yearly: "$15" },
    period: "/ user / month",
    description: "For teams handling customer conversations every day.",
    features: [
      "Everything in Free",
      "Unlimited conversations",
      "All communication channels",
      "Pamoja AI",
      "Assignments & internal notes",
      "Tags and advanced filters",
    ],
    cta: { label: "Start free trial", href: "#" },
    highlighted: true,
  },
  {
    name: "Business",
    priceLabel: "Let's talk",
    description: "For growing customer support teams that need more control.",
    features: [
      "Everything in Team",
      "Advanced permissions",
      "Team reporting",
      "Priority support",
      "Custom integrations",
    ],
    cta: { label: "Contact us", href: "#" },
  },
];
