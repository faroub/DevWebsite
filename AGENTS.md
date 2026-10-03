# AGENTS.md — App Showcase (Static-First)

## Product
This website showcases mobile apps built and managed by the owner with AI-assisted coding.
Public visitors can browse apps, features, screenshots, download links, and changelogs.
Visitor feedback is collected via an external form service (Web3Forms, Formspree, or similar).
The site is fully static — no database, no server, no authentication.

## Stack
- Next.js 16.3.x (use the latest stable App Router version at implementation time; verify with `npm show next version`; current verified line is 16.3.x / 16.3.4 as of September 2026)
- App Router (NOT Pages Router)
- React 19.2
- TypeScript 5.1+ in strict mode
- Tailwind CSS v3
- MDX for content files
- `output: 'export'` in next.config.ts for full static generation
- Vercel, Netlify, or Cloudflare Pages for static hosting
- Node.js 20.9+ LTS

## Architecture
- Content lives in `content/apps/` as Markdown/MDX files — one file per app.
- App metadata (name, slug, version, status, platforms, languages, download links) is stored as frontmatter at the top of each MDX file.
- The build reads these files at compile time and generates static pages.
- No database. No Supabase. No authentication. No admin panel.
- Feedback forms POST to an external service (Web3Forms, Formspree, or Resend).
- Updating content = editing a Markdown file and pushing to Git.

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
- Never use `dangerouslySetInnerHTML`.

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
- Playwright E2E tests for critical user flows (optional but recommended)

## Task Workflow
1. Inspect existing files before writing code.
2. Explain the plan before broad changes.
3. Implement one focused task at a time.
4. Report: files changed, commands run, tests, limitations.
5. Commit after each completed phase.
6. Never delete working functionality when adding new features.
7. Never create fake or placeholder implementations — all content must be real.