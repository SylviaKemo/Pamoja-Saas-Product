# Pamoja: marketing landing page

The landing page for **Pamoja**, a shared inbox that brings a team's email, WhatsApp, social DMs and live chat into one place.

Built with **Next.js (App Router)**, **Tailwind CSS v4** and **Framer Motion**.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Create a production build        |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

## Project structure

```
public/images/            orb.png (hero orb + logo), collaboration.jpg
src/
├── app/
│   ├── layout.tsx         Fonts (Bricolage Grotesque + DM Sans), metadata, motion provider
│   ├── page.tsx           Puts the sections together in page order
│   ├── globals.css        Design tokens (colours, breakpoints, shadows, animations)
│   ├── icon.svg           Favicon (flat two-tone dot)
│   └── apple-icon.png     App icon (orb on deep green)
├── components/
│   ├── layout/            Navbar, MenuButton, MobileMenu, Footer
│   ├── sections/          One folder per page section
│   │   ├── hero/
│   │   ├── problem/       (+ previews/ for the three mini UI cards)
│   │   ├── shared-inbox/
│   │   ├── collaboration/
│   │   ├── ai/
│   │   ├── integrations/
│   │   ├── pricing/
│   │   ├── faq/
│   │   └── cta/
│   ├── ui/                Reusable pieces: Button, Logo, Reveal, SectionTag, Heading, ...
│   └── providers/         MotionProvider (respects prefers-reduced-motion)
├── data/                  All copy and lists: channels, features, pricing, FAQs, navigation
├── hooks/                 useBodyScrollLock, useLiveFeed
└── lib/                   cn() class helper, shared easing curves
```

**Where to change things**

- **Copy, prices, FAQ answers, channel list**: `src/data/`
- **Colours, breakpoints, shadows**: the `@theme` block in `src/app/globals.css`
- **Section layout**: `src/components/sections/<section>/`

## Design notes

- **Tokens.** Brand colours are Tailwind theme colours (`bg-forest`, `text-mint`, `border-sand`...).
- **Breakpoints.** There are two custom ones: `nav:` (900px) for the desktop navbar and `split:` (1000px) for two-column sections.
- **Scroll reveals.** `<Reveal variant="up | left | right | scale" index={n}>` fades, un-blurs and slides content in once. Siblings stagger by 0.12s.
- **Looping animations.** The orb float, ping rings, blinking dots and shimmer are CSS keyframes in `globals.css`.
- **Entrances.** The hero and nav entrances use Framer Motion.
- **Reduced motion.** It is respected by both CSS and Framer Motion. The AI typing loop shows the full reply instead.
- **Icons.** Brand logos come from `simple-icons`. Generic icons come from `lucide-react`.

## Branches

The work was built up in small feature branches, each merged into `main`:

| Branch                         | Contents                                             |
| ------------------------------ | ---------------------------------------------------- |
| `feature/design-system`        | Tokens, fonts, assets, shared UI components          |
| `feature/navbar-hero`          | Navbar, mobile menu, hero with orb and channel chips |
| `feature/problem-section`      | "Why Pamoja" cards with mini UI previews             |
| `feature/shared-inbox-collab`  | Shared inbox feature cards, collaboration section    |
| `feature/ai-section`           | Pamoja AI section with the live typing reply         |
| `feature/integrations`         | 24 channel toggles and the live inbox feed           |
| `feature/pricing-faq`          | Pricing with monthly/yearly toggle, FAQ accordion    |
| `feature/cta-footer`           | Closing call to action and footer                    |
| `docs/readme`                  | This README                                          |
