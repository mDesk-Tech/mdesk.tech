mdesk.tech — Designing and hosting your digital future

Modern website built with Next.js 16, React 19, and Tailwind CSS 4. It features server components, dynamic streaming, sleek UI components, and a production‑ready contact workflow with Discord notifications and MongoDB‑backed rate limiting.

Live site: [Click here](https://mdesk.tech)

Highlights

- Next.js App Router with React Server Components and streaming
- Tailwind CSS v4 (config‑less) with modern UI effects and transitions
- Page transitions, lazy loading for below‑the‑fold sections
- SEO ready: metadata, Open Graph, [`app/sitemap.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/sitemap.ts), [`app/robots.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/robots.ts)
- Analytics: Vercel Analytics, Speed Insights, optional Google Analytics (GA4)
- Contact form: Discord webhook integration + MongoDB TTL rate-limiting
- DX: ESLint 9, Prettier 3, Husky + lint‑staged, Turbopack dev/build

Requirements

- Node.js 18.18+ (Node 20+ recommended)
- pnpm (project is pinned to pnpm via `packageManager`)

Quick Start

```bash
# 1) Enable corepack (recommended to match the pinned pnpm version)
corepack enable

# 2) Install dependencies
pnpm install

# 3) Configure environment
cp .env.example .env
# Then edit .env with your values (see Environment below)

# 4) Run the dev server (Turbopack)
pnpm dev
# Open http://localhost:3000
```

Environment
Define these variables in `.env`:

- DISCORD_WEBHOOK_URL: Discord webhook to receive contact submissions (required for `POST /api/contact`)
- MONGODB_URI: Connection string used for IP‑based rate limiting (required if using contact form)
- NEXT_PUBLIC_SITE_URL: Base site URL for canonical/OG metadata (e.g. `http://localhost:3000` in dev)
- NEXT_PUBLIC_GA_ID: Optional GA4 Measurement ID (loads only in production)

Notes

- If `DISCORD_WEBHOOK_URL` or `MONGODB_URI` are missing, the contact endpoint will return an error when called.
- The rate‑limit window is 1 hour per IP and uses a TTL index in MongoDB ([`lib/db.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/lib/db.ts)).

Scripts

- `pnpm dev` — Start dev server with Turbopack
- `pnpm build` — Production build with Turbopack
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint
- `pnpm prettier` — Format with Prettier
- `pnpm check-types` — Type‑check with TypeScript
- `pnpm prepare` — Initialize Husky (run once after install, if needed)

Pre‑commit

- [`.husky/pre-commit`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/.husky/pre-commit) runs `pnpm check-types && pnpm lint-staged`
- `lint-staged` formats and fixes staged files

Project Structure

- [`app/page.tsx`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/page.tsx) — Home with lazy‑loaded sections (Features, Services, About, Contact)
- [`app/contact/page.tsx`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/contact/page.tsx) — Contact page with form and Discord submission
- [`app/api/contact/route.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/api/contact/route.ts) — API route posting to Discord + MongoDB IP rate limiting
- [`app/about/page.tsx`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/about/page.tsx), [`app/services/page.tsx`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/services/page.tsx), [`app/open-source/page.tsx`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/open-source/page.tsx) — Additional pages
- [`app/sitemap.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/sitemap.ts), [`app/robots.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/robots.ts) — SEO helpers
- [`components/`](https://github.com/mDesk-Tech/mdesk.tech/tree/main/components) — UI and layout (Navbar, Footer, PageTransition, rich UI effects)
- [`lib/db.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/lib/db.ts) — MongoDB client + TTL index setup for rate limiting
- [`lib/utils.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/lib/utils.ts) — `cn` utility combining `clsx` and `tailwind-merge`
- [`hooks/`](https://github.com/mDesk-Tech/mdesk.tech/tree/main/hooks) — Common hooks (e.g., `use-outside-click.tsx`)

API

- `POST /api/contact` (file: [`app/api/contact/route.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/api/contact/route.ts))
  - Body: `{ name: string; email: string; subject?: string; message: string; isOpenSourceForm?: boolean }

`

- Rate limit: 1 request per IP per hour (MongoDB TTL index)
- Side effect: sends a Discord embed to `DISCORD_WEBHOOK_URL`
- Responses: `200 { success: true }`, `429 { error, message }`, `400/500 { error }`

SEO & Analytics

- Metadata and OG/Twitter cards set in [`app/layout.tsx`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/layout.tsx)
- Sitemap at [`app/sitemap.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/sitemap.ts) and robots at [`app/robots.ts`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/app/robots.ts)
- Vercel Analytics + Speed Insights enabled in production; GA4 loads when `NEXT_PUBLIC_GA_ID` is set

Styling & UI

- Tailwind CSS v4 via PostCSS plugin ([`postcss.config.mjs`](https://github.com/mdesk-tech/mdesk.tech/blob/main/postcss.config.mjs))
- Modern Ui Components: 3D cards, glare/shine effects, hover text, world map, etc.
- page transitions configured via [`components/pagetransition.tsx`](https://github.com/mdesk-tech/mdesk.tech/blob/main/components/pagetransition.tsx)

Deployment

- recommended: vercel
  - set the same environment variables in your vercel project
  - ensure a mongodb instance is reachable from your deployment if using the contact form
  - build command uses turbopack by default. if you hit issues, try removing `--turbopack` from scripts

Troubleshooting

- discord webhook errors: verify `discord_webhook_url` and webhook permissions
- MongoDB connection errors: Verify `MONGODB_URI` and network access; the TTL index is created automatically
- GA not reporting: Ensure `NEXT_PUBLIC_GA_ID` is defined; analytics load only in production

Contributing

- Fork and create a feature branch
- Run `pnpm check-types`, `pnpm lint`, and `pnpm prettier` before opening a PR
- Thanks to Renovate ([`renovate.json`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/renovate.json)) for automated dependency updates

License

- GPL‑3.0 — see [`LICENSE`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/LICENSE)

Acknowledgements

- Next.js, React, Tailwind CSS, Vercel Analytics/SI
- lucide-react, motion, and other open‑source libraries listed in [`package.json`](https://github.com/mDesk-Tech/mdesk.tech/blob/main/package.json)
