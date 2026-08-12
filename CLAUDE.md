# Vadalkar & Associates — Corporate Website

Corporate website for Vadalkar & Associates, a structural and civil engineering consultancy in Mumbai established in 1994.

## Scope

This is the **main corporate website only**. The `blog/` subdirectory is a separate standalone project (Reflections Blog for Kirty Vadalkar) managed in a different chat — **do not modify anything in `blog/`**.

## Live URLs
- **Launch candidate**: https://development.vadalkar.com (Vercel production deployment)
- **Current apex**: https://vadalkar.com (legacy static site retained until cutover)
- **GitHub**: https://github.com/vedangv/vadalkar-website

## Tech Stack
- Next.js 16 (App Router) + TypeScript + React 19
- Tailwind CSS 4 (inline @theme in globals.css)
- Framer Motion 12 (animations via FadeIn component)
- Font: Inter (Google Fonts)

## Architecture
- Core routes: `/`, `/about`, `/services`, `/projects`, `/team`, `/contact`, `/careers`, plus project category/detail routes
- Dynamic routes: 17 category pages + 11 featured project detail pages (SSG via `generateStaticParams`)
- Shared layout: Header (fixed, always white) + Footer + WhatsAppButton + ScrollToTop
- Logo: `/public/banner.gif` (no invert trick — header always white)
- Project data: 386 Sanity projects across 17 categories, with search, URL-backed filters, and progressive rendering on `/projects`
- Featured project descriptions in `src/data/featured-projects.ts`
- Sanity CMS: projects plus home, about, contact, and site settings; hourly refresh plus signed `/api/revalidate` webhook
- Contact form: validated and escaped server-side at `/api/contact`, delivered through Resend

## Design System
- **Primary**: Navy blue (#1e3a5f) — professionalism
- **Accent**: Gold/amber (#d97706) — engineering warmth
- **Neutral**: Slate scale (#f8fafc to #0f172a)
- **Background**: White (#ffffff)
- Editorial/magazine aesthetic inspired by WSP/Arup engineering sites
- Consistent section pattern: accent line + uppercase label + large heading

## Key Files
```
src/app/page.tsx                        — Home (hero, services, featured projects, stats, clients, CTA)
src/app/about/page.tsx                  — Company history, activities, timeline, project stats
src/app/projects/page.tsx               — Hero + ProjectsGrid.tsx (filter + cards)
src/app/projects/[category]/page.tsx    — Category landing pages (SSG)
src/app/projects/[category]/[slug]/page.tsx — Featured project detail pages (SSG)
src/app/team/page.tsx                   — Hemant Vadalkar profile, career, memberships
src/app/contact/page.tsx                — Contact form + office info
src/app/careers/page.tsx                — Careers page with open positions
src/app/globals.css                     — Tailwind @theme with color palette
src/components/Header.tsx               — Fixed nav, always white, mobile menu
src/components/Footer.tsx               — 4-column footer
src/components/FadeIn.tsx               — Framer Motion scroll-triggered animations
src/components/HomeStats.tsx            — Animated stats for home page (counters + bar chart)
src/components/ProjectStats.tsx         — Full project stats for about page
src/components/WhatsAppButton.tsx       — Floating WhatsApp CTA
src/sanity/lib/queries.ts               — Typed Sanity queries and image URL transformation
src/data/featured-projects.ts           — Descriptions/highlights for 11 featured projects
public/brochure.html                    — Standalone 6-page corporate brochure (printable)
```

## Development
- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npm run typecheck` / `npm run lint` / `npm test` — Required quality gates
- Auto-deploys on push to main via Vercel

## Content Sources
- Original website: http://vadalkar.com (2007 era) — company profile, contact details, services
- Client brochure PDF: `docs/1321- Urban analysis-VA Intro.pdf` (Feb 2026) — 371 projects with details, photos, credentials
- Project photos extracted to `docs/brochure-assets/` and `public/projects/` (20 images across 10 directories)
- **Note**: Image filenames were corrected on 2026-03-10 (original extraction had every filename wrong). IIT Bombay Hostel 18 and Taloja MIDC Shed images still missing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
