import { History, Inbox, Tags, type LucideIcon } from "lucide-react";

export type Feature = { title: string; description: string };

export const INBOX_FEATURES: (Feature & { icon: LucideIcon })[] = [
  {
    icon: Inbox,
    title: "All your channels",
    description: "See email, WhatsApp, Instagram and live chat conversations together.",
  },
  {
    icon: History,
    title: "Everything in context",
    description: "Open a conversation and immediately see previous messages and customer details.",
  },
  {
    icon: Tags,
    title: "Easy to organize",
    description: "Use statuses, tags, search and filters to find what needs attention.",
  },
];

export const COLLABORATION_FEATURES: Feature[] = [
  {
    title: "Assign conversations",
    description: "Send a conversation to the right teammate and always know who's responsible.",
  },
  {
    title: "Leave private notes",
    description: "Talk with your team inside a conversation without the customer seeing it.",
  },
  {
    title: "Track progress",
    description: "Move conversations between Open, Pending and Resolved so everyone knows what still needs attention.",
  },
];

export const AI_FEATURES: Feature[] = [
  {
    title: "Summarize conversations",
    description: "Catch up on long customer conversations without reading every message.",
  },
  {
    title: "Suggest replies",
    description: "Get a suggested response based on the conversation and edit it before sending.",
  },
  {
    title: "Understand what customers need",
    description:
      "Automatically identify common topics like refunds, order questions, account problems and product enquiries.",
  },
];
