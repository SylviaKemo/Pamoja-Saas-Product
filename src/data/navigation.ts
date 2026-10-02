export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Shared Inbox", href: "#product" },
      { label: "Team Collaboration", href: "#" },
      { label: "Pamoja AI", href: "#" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Getting Started", href: "#" },
      { label: "API Documentation", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];
