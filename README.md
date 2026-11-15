# AGENTS.md — App Showcase (Static-First)

## Product
This website showcases mobile apps built and managed by the owner with AI-assisted coding.
Public visitors can browse apps, features, screenshots, download links, and changelogs.
Public discussions, reviews, and feedback are hosted via Giscus and GitHub Discussions.
The site is fully static — no database, no server, no visitor authentication.

## Stack
- Next.js 16.4.x (App Router with `output: 'export'`)
- React 19.0
- TypeScript 5.7+ in strict mode
- Tailwind CSS v3
- MDX for content files
- Zod 4.x for content frontmatter validation
- Giscus for GitHub-backed public discussions and feedback
- Vercel, Netlify, or Cloudflare Pages for static hosting
- Node.js 20.9+ / 24.x LTS

## Architecture
- Content lives in `content/apps/`, `content/projects/`, and `content/blogs/` as Markdown/MDX files — one file per entry.
- Entry metadata (name, slug, version, status, platforms, languages, download links) is stored as frontmatter at the top of each MDX file.
- The effective slug is derived from the filename; the frontmatter `slug` must be present and equal the filename or the build fails with an error naming the file.
  Listing links, `generateStaticParams`, the sitemap, and detail lookups all use `lib/content/load.ts` and `lib/content/schemas.ts` (via `lib/apps.ts`, `lib/projects.ts`, `lib/blogs.ts`, and `lib/changelogs.ts`) as their single source.
- The build reads these files at compile time and generates static pages into `out/`.
- No database. No Supabase. No visitor authentication.
- There is no admin panel in the deployed site; content is edited as Markdown/MDX files and pushed to Git.
- Public community discussions and feedback on detail pages are rendered via Giscus (`components/Comments.tsx` & `lib/giscus.ts`), backed by GitHub Discussions (`faroub/DevWebsite`).
- Theme logic has one source of truth in `lib/theme.ts`; locale logic in `lib/locale.ts`. The pre-hydration script in `public/boot.js` prevents a first-paint theme/locale flash.
- Site identity (author, domain, contact address, social links) lives in `lib/site.ts`.
- Environment variable `NEXT_PUBLIC_NOTIFY_EMAIL` (see `.env.example`) configures the public contact email printed on legal pages.
- `npm run lint` first runs `scripts/check-content.js` (slug must equal filename, required fields present, dates valid, referenced screenshots must exist under `public/screenshots/`, URL fields must be valid HTTP/HTTPS URLs), then ESLint. The same check runs automatically before `npm run build` (prebuild) and in CI.

## Coding Rules
- Use server components for static page rendering. Add `"use client"` only for interactive components (mobile menu, theme toggle, comments, gallery).
- Never use `any`. Use proper types throughout.
- Keep components focused and small.
- Avoid unrelated refactors. Change only what the current task requires.
- Do not use experimental or canary Next.js features unless explicitly approved.

## Static Export Rules
- Set `output: 'export'` in `next.config.ts`.
- Do NOT use features that require a server:
  - No API routes (`app/api/*`)
  - No Server Actions
  - No middleware
  - No `revalidate` / ISR
  - No dynamic routes that require server-side rendering at request time
- Dynamic routes like `/apps/[slug]` ARE supported — they are generated at build time from content files using `generateStaticParams()`.
- Images: use `next/image` with `unoptimized: true` in `next.config.ts`.

## Security
- No secrets in the repository.
- Giscus runs client-side, embedding a sandboxed iframe from `https://giscus.app` authenticated via GitHub OAuth.
- Security headers (CSP, HSTS, frame-ancestors, referrer policy) are configured in `vercel.json` and `public/_headers` to allow `https://giscus.app` while enforcing `default-src 'self'` and `object-src 'none'`.
- Never use `dangerouslySetInnerHTML` — with one audited exception: structured data via `components/JsonLd.tsx` + `lib/jsonld.ts`, which serializes build-time data and escapes every `<` as `\u003c`.

## Development
Setup and common commands:
- `npm ci` — install dependencies.
- Copy `.env.example` to `.env.local` (sets `NEXT_PUBLIC_NOTIFY_EMAIL`).
- `npm run dev` — Next.js dev server.
- `npm run lint` — content check + ESLint.
- `npx tsc --noEmit` — TypeScript type check.
- `npm run test:unit` — Vitest & Node unit test suites.
- `npm run build` — static export into `out/` (runs prebuild content check first).
- `npm run smoke` — post-build export checks (verifies routes, canonicals, internal links).
- `npm run check-tracked` — checks that no build metadata (`node_modules/`, `.next/`, `out/`) is tracked in git.
- `npm run test:e2e` — static build + Playwright E2E suite.
- `npm run preview` — serve `out/` locally at http://127.0.0.1:4321 (`scripts/serve-static.mjs`).

## Legal Text
The privacy and terms pages (`lib/i18n/translations.ts`) describe real data flows (theme and locale choice stored in browser `localStorage`, public discussions hosted via Giscus / GitHub Discussions, zero analytics).

## Testing Pipeline
Run before considering any task complete:
1. `npm ci`
2. `npm run lint`
3. `npx tsc --noEmit`
4. `npm run test:unit`
5. `npm run build`
6. `npm run smoke`
7. `npm run check-tracked`
8. `npm run test:e2e`
