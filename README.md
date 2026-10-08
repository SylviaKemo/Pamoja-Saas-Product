# Pamoja: marketing site and AI Playground

The website for **Pamoja**, a shared inbox that brings a team's email, WhatsApp, social DMs and live chat into one place. It includes the **Pamoja AI Playground** at `/ai-playground`, where visitors can try a real AI support copilot.

Built with **Next.js (App Router)**, **Tailwind CSS v4**, **Framer Motion**, **zod** and the **Google Gen AI SDK** (Gemini).

## Getting started

```bash
npm install
cp .env.example .env.local   # then add your Gemini API key (see below)
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The marketing site works without a key; only the playground needs one.

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Create a production build        |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

## AI Playground

Visitors paste a customer message, optionally add business rules, and Pamoja AI returns the following, generated live by Gemini on every request:
- intent
- sentiment
- priority, with the reason
- a summary
- a recommended next action
- a suggested reply

The reply is an editable draft. Five actions rewrite it with AI using the latest edited text:
- Make shorter
- More empathetic
- More professional
- Simplify
- Regenerate

The **Copy** button copies the current draft. Nothing is ever sent anywhere.

### Environment variables

| Name             | Required | Description                                                                  |
| ---------------- | -------- | ---------------------------------------------------------------------------- |
| `GEMINI_API_KEY` | Yes      | Free key from [Google AI Studio](https://aistudio.google.com/apikey). Server-only. |
| `GEMINI_MODEL`   | No       | Overrides the model. Defaults to `gemini-3.5-flash-lite`.                         |

- **Locally:** put them in `.env.local`. It is git-ignored.
- **On Vercel:** add them under **Project → Settings → Environment Variables**, then redeploy.
- **Never prefix with `NEXT_PUBLIC_`.** That would send the key to the browser.
- **Don't enable billing on the Google project.** Without billing, usage stays on the free tier and requests simply fail with a "demo limit reached" message when the quota runs out.

### How it works

```
Browser ──POST──▶ /api/ai/analyze | /api/ai/refine   (Node.js route handlers)
                    1. rate limit per IP
                    2. 16 KB body cap + zod validation (length limits)
                    3. Gemini generateContent with a JSON response schema,
                       25s timeout and capped output tokens
                    4. zod validates the model output (one retry if malformed)
                    5. errors mapped to { error: { code, message } }
```

| File | Purpose |
| ---- | ------- |
| `src/app/ai-playground/page.tsx` | The playground page |
| `src/app/api/ai/{analyze,refine}/route.ts` | API routes |
| `src/lib/ai/schemas.ts` | Request/response schemas and input limits, shared by client and server |
| `src/lib/ai/prompts.ts` | System instructions. Visitor text is wrapped in tags and treated as data, never as instructions. |
| `src/lib/ai/gemini.ts` | Server-only Gemini client |
| `src/lib/ai/errors.ts`, `errorMessages.ts` | Error codes, HTTP status codes and friendly copy |
| `src/lib/ai/rateLimit.ts` | Per-IP rate limiter |
| `src/lib/ai/client.ts` | Browser-side fetch helpers (network/timeout handling) |
| `src/hooks/usePlayground.ts` | Playground state: inputs, results, outdated detection, refinement, Start over |
| `src/components/playground/` | Message panel, results cards, reply editor |

**Safety rules in the prompts:**
- The AI uses only facts from the business context.
- It never invents refunds, order or account statuses, timelines or completed actions.
- It asks for missing details instead of guessing.
- It replies in the customer's language, while the analysis is always in English for the agent.

**Logging:** only error codes are logged, never message content.

### Limits and known trade-offs

- **Rate limiting is best-effort.**
  - The limit is 5 requests per minute and 10 per day per IP (`VISITOR_LIMITS` in `src/lib/ai/schemas.ts`). Analyze and each refine action count as one request.
  - It is kept in memory, so each Vercel serverless instance has its own counts, which reset on a cold start.
  - The real ceiling is Google's free-tier quota, enforced per Google project. For a hard limit, swap `rateLimit.ts` for a shared store such as Upstash Redis.
- **Free-tier quota.**
  - Google shows your exact limits only in [AI Studio](https://aistudio.google.com/rate-limit). Bursts of requests can hit the per-minute limit.
  - The UI then shows "Demo limit reached" with a retry button.
- **Privacy.** On the free tier, Google may use submitted content to improve its products. The playground tells visitors not to enter confidential information.

### Testing it

1. Open `/ai-playground`, or click **Try Pamoja AI** in the hero or the AI section.
2. Pick a sample or write your own message, then click **Analyze with Pamoja AI**. You can also press Ctrl/Cmd + Enter while typing.
3. Analyze the same message with and without **Use example policies**. With policies, the reply should quote them; without them, it should ask instead of inventing prices or rules.
4. Edit the reply by hand, then try each refine action. Your edits, such as names or a sign-off, should be kept.
5. Change the message after analyzing. The results are marked outdated and refining is disabled until you analyze again.
6. Error states:
   - Remove the key to see "AI isn't set up yet".
   - Go offline to see "Connection problem".
   - Send many requests quickly to see the rate-limit message.

## Project structure

```
public/images/            orb.png (hero orb + logo), collaboration.jpg
src/
├── app/
│   ├── layout.tsx         Fonts (Bricolage Grotesque + DM Sans), metadata, motion provider, Vercel analytics
│   ├── page.tsx           Puts the landing sections together in page order
│   ├── ai-playground/     The AI Playground page
│   ├── api/ai/            analyze + refine route handlers
│   ├── globals.css        Design tokens (colours, breakpoints, shadows, animations)
│   ├── icon.svg           Favicon (flat two-tone dot)
│   └── apple-icon.png     App icon (orb on deep green)
├── components/
│   ├── layout/            Navbar, MenuButton, MobileMenu, Footer
│   ├── sections/          One folder per landing-page section
│   ├── playground/        Playground UI (message panel, results/, reply/)
│   ├── ui/                Reusable pieces: Button, TextArea, Logo, Reveal, SectionTag, Heading, ...
│   └── providers/         MotionProvider (respects prefers-reduced-motion)
├── data/                  Copy and lists: channels, features, pricing, FAQs, navigation, playground samples
├── hooks/                 useBodyScrollLock, useLiveFeed, useCopyToClipboard, usePlayground
└── lib/                   cn() helper, easing curves, ai/ (schemas, prompts, Gemini client, errors, rate limit)
```

**Where to change things**

- **Copy, prices, FAQ answers, channel list, playground samples**: `src/data/`
- **Colours, breakpoints, shadows**: the `@theme` block in `src/app/globals.css`
- **Section layout**: `src/components/sections/<section>/`
- **AI behaviour**: `src/lib/ai/prompts.ts`, plus input limits in `src/lib/ai/schemas.ts`

## Design notes

- **Tokens.** Brand colours are Tailwind theme colours (`bg-forest`, `text-mint`, `border-sand`...).
- **Breakpoints.** There are two custom ones: `nav:` (900px) for the desktop navbar and `split:` (1000px) for two-column layouts.
- **Scroll reveals.** `<Reveal variant="up | left | right | scale" index={n}>` fades, un-blurs and slides content in once. Siblings stagger by 0.12s.
- **Looping animations.** The orb float, ping rings, blinking dots and shimmer are CSS keyframes in `globals.css`.
- **Entrances.** The hero and nav entrances use Framer Motion.
- **Reduced motion.** It is respected by both CSS and Framer Motion. The AI typing loop shows the full reply instead.
- **Icons.** Brand logos come from `simple-icons`. Generic icons come from `lucide-react`.

## Branches

The work was built up in small branches, each merged into `main`.

**Landing page**

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
| `docs/readme`                  | First README                                         |
| `feature/footer-credit`        | "Developed by Sylvia" footer credit                  |
| `feature/vercel-analytics`     | Vercel Web Analytics and Speed Insights              |

**AI Playground**

| Branch                              | Contents                                               |
| ----------------------------------- | ------------------------------------------------------ |
| `feature/ai-schemas`                | Shared zod schemas and input limits                    |
| `feature/ui-form-primitives`        | Button and TextArea components                         |
| `feature/playground-route`          | `/ai-playground` page, header, demo notice             |
| `feature/playground-message-panel`  | Message, sample scenarios, business context, Analyze   |
| `feature/playground-results-ui`     | Empty/loading/error/outdated states, insight cards     |
| `feature/playground-reply-editor`   | Editable reply, refine actions, copy, Start over       |
| `feature/try-ai-ctas`               | "Try Pamoja AI" links in the hero and AI section       |
| `feature/ai-gemini-client`          | Server-side Gemini client and error mapping            |
| `feature/ai-rate-limit`             | In-memory per-IP rate limiter                          |
| `feature/ai-analyze-route`          | `POST /api/ai/analyze` and the analysis prompt         |
| `feature/ai-refine-route`           | `POST /api/ai/refine`                                  |
| `feature/playground-api-wiring`     | Connects the UI to the API                             |
| `feature/ai-prompt-tuning`          | Prompt fixes from live testing                         |
| `feature/playground-polish`         | Keeps the agent's sign-off when refining               |
| `docs/ai-playground`                | This README and `.env.example`                         |
| `feature/ai-lite-model`             | Default to `gemini-3.5-flash-lite` (bigger free quota) |
| `feature/ai-limit-reset-time`       | Tell visitors when a limit resets                      |
| `feature/ai-visitor-limits`         | 5 requests/minute, 10/day per visitor                  |
| `docs/ai-limits`                    | Branch table update                                    |
