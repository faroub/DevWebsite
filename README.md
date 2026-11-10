# AGENTS.md — App Showcase (Static-First)

## Product
This website showcases mobile apps built and managed by the owner with AI-assisted coding.
Public visitors can browse apps, features, screenshots, download links, and changelogs.
Visitor feedback is sent through a private Web3Forms form that emails the maintainer.
The site is fully static — no database, no server, no visitor authentication.

## Stack
- Next.js 16.4.x (use the latest stable App Router version at implementation time; verify with `npm show next version`; current verified line is 16.4.x / 16.4.5 as of November 2026, which patches the RCE/DoS advisories affecting 16.0.0–16.4.0)
- App Router (NOT Pages Router)
- React 19.3
- TypeScript 5.1+ in strict mode
- Tailwind CSS v3
- MDX for content files
- Zod 4.x for client-side form validation
- `output: 'export'` in next.config.ts for full static generation
- Vercel, Netlify, or Cloudflare Pages for static hosting
- Node.js 20.9+ LTS

## Architecture
- Content lives in `content/apps/`, `content/projects/`, and `content/blogs/` as Markdown/MDX files — one file per entry.
- Entry metadata (name, slug, version, status, platforms, languages, download links) is stored as frontmatter at the top of each MDX file.
- The effective slug is derived from the filename; the frontmatter `slug` must be
  present and equal the filename or the build fails with an error naming the file.
  Listing links, `generateStaticParams`, the sitemap, and detail lookups all use
  `lib/content.ts` (with a Zod schema per collection) as their single source.
- The build reads these files at compile time and generates static pages.
- No database. No Supabase. No visitor authentication.
- There is no admin panel in the deployed site; content is edited as Markdown/MDX files
  and pushed to Git.
- Settings live in environment variables (see `.env.example`). The public feedback
  key also lives in the client bundle via `NEXT_PUBLIC_WEB3FORMS_KEY` — it is a
  domain-allowlisted public identifier, not a secret.
- The feedback form on detail pages posts to Web3Forms (validated with Zod on the
  client, plus a honeypot and a 60-second client-side rate limit); the submission is
  emailed to the maintainer and is never published or stored on the site.
  Visitor feedback is sent only through this external form service.
- Theme logic has one source of truth in `lib/theme.ts`; locale logic in
  `lib/locale.ts`. The only other touch point is `public/boot.js`, an external
  pre-hydration script in `app/layout.tsx` that prevents a first-paint flash.
- Site identity (author, domain, contact address, social links) lives in `lib/site.ts`.
- Updating content = editing a Markdown file and pushing to Git.
- `npm run lint` first runs `scripts/check-content.js` (slug must equal filename,
  required fields present, dates valid, referenced screenshots must exist under
  `public/screenshots/`, URL fields must not be bare domains), then ESLint. The same
  check runs automatically before `npm run build` (prebuild) and in CI.

## Coding Rules
- Use server components for static page rendering. Add `"use client"` only for interactive components (form handlers, mobile menu, gallery).
- Never use `any`. Use proper types throughout.
- Validate form input on the client with Zod before submitting to the form service.
- Keep components focused and small.
- Avoid unrelated refactors. Change only what the current task requires.
- Do not use experimental or canary Next.js features unless explicitly approved.
- Install the latest patched stable Next.js version: `npm install next@latest`
- Use `npx create-next-app@latest` for initial scaffolding with TypeScript + Tailwind + App Router.
- After implementing each request, provide:
  1. A concise list of files created or changed.
  2. Installation commands for any new dependency.
  3. Manual test steps.
  4. Known limitations, if any.

## Static Export Rules
- Set `output: 'export'` in `next.config.ts`.
- Do NOT use features that require a server:
  - No API routes (`app/api/*`)
  - No Server Actions
  - No middleware
  - No `revalidate` / ISR
  - No dynamic routes that require server-side rendering at request time
- Dynamic routes like `/apps/[slug]` ARE supported — they are generated at build time from the content files using `generateStaticParams()`.
- Images: use `next/image` with `unoptimized: true` in next.config.ts, or use plain `<img>` tags with width/height to avoid layout shift.

## Security
- No secrets in the repository.
- Form service access keys (Web3Forms/Formspree) are designed for client-side use — treat them as public identifiers, not secrets. Configure domain allowlists and spam protection in your form service dashboard.
- Never expose real API keys, passwords, or tokens (e.g., Resend API keys, email service credentials) in client-side code. If you need server-side email, remove `output: 'export'` and use a serverless function.
- Add a honeypot field on all forms to catch bots.
- Enable CAPTCHA in your form service settings if spam becomes a problem.
- Sanitize or safely render any user-submitted content that appears in success/error messages.
- Never use `dangerouslySetInnerHTML` — with one audited exception:
  structured data via `components/JsonLd.tsx` + `lib/jsonld.ts`, which serializes
  build-time-only data and escapes every `<` as `\u003c` so the payload can never
  terminate the script element. Never pass user-submitted content to it. (The
  pre-hydration theme/locale bootstrap is an external file, `public/boot.js`.)

## Development
Setup and common commands:
- `npm ci` — install dependencies (Node >= 20.9, see `engines`).
- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_KEY` (get a free
  key at web3forms.com). Without it the feedback form renders disabled. `NEXT_PUBLIC_NOTIFY_EMAIL`
  is optional; it only overrides the contact address on the legal pages.
- `npm run dev` — Next.js dev server (content editing by hand).
- `npm run lint` / `npx tsc --noEmit` — content check + ESLint / type check.
- `npm run build` — static export into `out/` (runs the content check first).
- `npm run smoke` — post-build checks: every route exists, no admin route or bridge
  strings leaked, absolute canonicals, all internal links resolve.
- `npm run test:e2e` — build + Playwright tests against the export (installs browsers
  on first run with `npx playwright install chromium`).
- `npm run preview` — serve `out/` locally at http://127.0.0.1:4321.

Content file format (see `content/apps/*.mdx` for examples; fields mirror the
schemas in `lib/content/schemas.ts`):
- `---`-delimited frontmatter: title, slug (**must equal the file name**), tagline,
  description, version, status, platforms, category, languages, updatedAt (YYYY-MM-DD),
  optional `downloadLinks` (appStore/playStore/github/web). Projects use techStack and
  optional githubUrl/demoUrl; blogs use excerpt, publishedAt, readTime, author, tags.
- The Markdown body is rendered as real HTML at build time; raw HTML in the source is
  not allowed.
- Missing required fields, invalid dates, or a slug that differs from the file name
  fail the build with an error naming the file.
- `status` is displayed on listings: Active (green dot), Beta, Archived, etc.
- `featured` marks entries shown on the homepage.

## Environment variables

All are public (no secrets): they come from `env` on the host, documented in
`.env.example`:

- `NEXT_PUBLIC_WEB3FORMS_KEY` — the form service key; used by the feedback forms
  (`components/FeedbackForm.tsx`) and checked on `process.env`.
- `NEXT_PUBLIC_NOTIFY_EMAIL` — the site contact address; read by `lib/site.ts` as
  `contactEmail` and printed on `/privacy` and `/terms` pages (safe fallback if unset).

Publishing:
- `npm run build`, then deploy `out/` to Vercel, Netlify, or Cloudflare Pages.
- Security headers (CSP, HSTS, frame-ancestors, referrer policy) are configured in
  `vercel.json` (Vercel) and `public/_headers` (Netlify/Cloudflare Pages). The CSP
  allows `'unsafe-inline'` for scripts because Next.js embeds inline RSC bootstrap
  scripts at build time; no inline script handles user input.

## Legal text
The privacy and terms pages (`lib/i18n/translations.ts`) describe the real data flows
(localStorage for theme/locale, Web3Forms as the form processor, no analytics). They
were written by the developer, not a lawyer — have the text reviewed before relying on
it. Keep the `lastUpdated` value current when the data flow changes.

## UX
- Mobile-first responsive layout.
- Accessible keyboard navigation with visible focus states.
- Semantic HTML headings (h1, h2, h3 in correct order).
- Correct label/input associations.
- Accessible dialogs (focus trap, Escape to close) for screenshot gallery.
- Sufficient color contrast (WCAG AA minimum).
- Descriptive image alt text on every screenshot.
- Clear loading, error, and empty states.
- Reduced-motion support (`prefers-reduced-motion`).
- No layout shift from images (set width/height or aspect-ratio).
- No horizontal overflow.
- Touch-friendly controls (min 44px tap targets).

## Testing
Run before considering any task complete:
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build` (verifies static export works)
- `npm run smoke` (post-build export checks)
- `npm run test:e2e` (Playwright: main pages, markdown rendering, locale switch, theme toggle, mobile menu, feed filters)

## Task Workflow
1. Inspect existing files before writing code.
2. Explain the plan before broad changes.
3. Implement one focused task at a time.
4. Commit after each completed phase.

## Compliance guidelines
Behavioral guidelines live in `AGENTS.md`. Highlights: no `any` types, no placeholder content,
no `dangerouslySetInnerHTML` outside the documented exceptions, commit after each completed phase.
