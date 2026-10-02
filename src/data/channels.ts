import { ClipboardList, Mail, MessageCircleMore, MessageSquareText, Phone } from "lucide-react";
import {
  siDiscord,
  siEtsy,
  siFacebook,
  siGmail,
  siGoogle,
  siInstagram,
  siLine,
  siMessenger,
  siShopify,
  siSignal,
  siSnapchat,
  siTelegram,
  siThreads,
  siTiktok,
  siTrustpilot,
  siViber,
  siWechat,
  siWhatsapp,
  siX,
} from "simple-icons";
import type { ChannelGlyph } from "@/components/ui/ChannelIcon";

export type Channel = {
  id: string;
  name: string;
  category: string;
  /** A sample customer message shown in the live inbox feed. */
  sampleMessage: string;
  glyph: ChannelGlyph;
};

const brand = (icon: Extract<ChannelGlyph, { kind: "brand" }>["icon"]): ChannelGlyph => ({ kind: "brand", icon });
const generic = (icon: Extract<ChannelGlyph, { kind: "generic" }>["icon"]): ChannelGlyph => ({ kind: "generic", icon });

export const CHANNELS: Channel[] = [
  { id: "gmail", name: "Gmail", category: "Email", sampleMessage: "Question about my invoice", glyph: brand(siGmail) },
  { id: "outlook", name: "Outlook", category: "Email", sampleMessage: "Bulk order for our office", glyph: generic(Mail) },
  { id: "whatsapp", name: "WhatsApp", category: "Messaging", sampleMessage: "My order hasn't arrived yet", glyph: brand(siWhatsapp) },
  { id: "instagram", name: "Instagram", category: "Social", sampleMessage: "Do you ship to Portugal?", glyph: brand(siInstagram) },
  { id: "messenger", name: "Messenger", category: "Messaging", sampleMessage: "Are you open on Sunday?", glyph: brand(siMessenger) },
  { id: "facebook", name: "Facebook", category: "Social", sampleMessage: "Commented on your post", glyph: brand(siFacebook) },
  { id: "telegram", name: "Telegram", category: "Messaging", sampleMessage: "Can I pay on delivery?", glyph: brand(siTelegram) },
  { id: "tiktok", name: "TikTok", category: "Social", sampleMessage: "Where can I buy this?", glyph: brand(siTiktok) },
  { id: "x", name: "X", category: "Social", sampleMessage: "@you my parcel is late", glyph: brand(siX) },
  { id: "threads", name: "Threads", category: "Social", sampleMessage: "Replied to your thread", glyph: brand(siThreads) },
  { id: "viber", name: "Viber", category: "Messaging", sampleMessage: "Is the blue one in stock?", glyph: brand(siViber) },
  { id: "wechat", name: "WeChat", category: "Messaging", sampleMessage: "Do you offer wholesale?", glyph: brand(siWechat) },
  { id: "line", name: "LINE", category: "Messaging", sampleMessage: "Order #2291 question", glyph: brand(siLine) },
  { id: "signal", name: "Signal", category: "Messaging", sampleMessage: "Can you call me back?", glyph: brand(siSignal) },
  { id: "snapchat", name: "Snapchat", category: "Social", sampleMessage: "Sent you a message", glyph: brand(siSnapchat) },
  { id: "sms", name: "SMS", category: "Messaging", sampleMessage: "Reschedule my booking", glyph: generic(MessageSquareText) },
  { id: "google-reviews", name: "Google Reviews", category: "Reviews", sampleMessage: "Left a 3-star review", glyph: brand(siGoogle) },
  { id: "trustpilot", name: "Trustpilot", category: "Reviews", sampleMessage: "Great service, slow delivery", glyph: brand(siTrustpilot) },
  { id: "shopify", name: "Shopify", category: "Commerce", sampleMessage: "Customer asked about order", glyph: brand(siShopify) },
  { id: "etsy", name: "Etsy", category: "Commerce", sampleMessage: "Can you personalise this?", glyph: brand(siEtsy) },
  { id: "live-chat", name: "Live Chat", category: "Website", sampleMessage: "Is the large size back?", glyph: generic(MessageCircleMore) },
  { id: "contact-form", name: "Contact form", category: "Website", sampleMessage: "Partnership enquiry", glyph: generic(ClipboardList) },
  { id: "discord", name: "Discord", category: "Community", sampleMessage: "Bug in the latest update", glyph: brand(siDiscord) },
  { id: "phone", name: "Phone", category: "Voice", sampleMessage: "Missed call · voicemail", glyph: generic(Phone) },
];

/** Channels switched on when the page first loads. */
export const INITIALLY_CONNECTED = ["gmail", "whatsapp", "instagram", "shopify", "live-chat"];

/** Customer first names used for incoming messages in the live feed. */
export const SAMPLE_CUSTOMERS = ["Amina", "Daniel", "Sofia", "Lena", "Kwame", "Rosa", "Yusuf", "Mei", "Tomás", "Priya"];

export function getChannel(id: string) {
  const channel = CHANNELS.find((c) => c.id === id);
  if (!channel) throw new Error(`Unknown channel: ${id}`);
  return channel;
}
