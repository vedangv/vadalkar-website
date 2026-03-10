# Vadalkar & Associates — Corporate Website

Corporate website for Vadalkar & Associates, a structural and civil engineering consultancy in Mumbai established in 1994.

## Scope

This is the **main corporate website only**. The `blog/` subdirectory is a separate standalone project (Reflections Blog for Kirty Vadalkar) managed in a different chat — **do not modify anything in `blog/`**.

## Live URLs
- **New site**: https://vadalkar-website.vercel.app (deployed on Vercel, connected to GitHub)
- **Original site**: http://vadalkar.com (legacy table-based HTML from 2007, no HTTPS)
- **GitHub**: https://github.com/vedangv/vadalkar-website

## Tech Stack
- Next.js 16 (App Router) + TypeScript + React 19
- Tailwind CSS 4 (inline @theme in globals.css)
- Framer Motion 12 (animations via FadeIn component)
- Font: Inter (Google Fonts)

## Architecture
- 8 base routes: `/` (home), `/about`, `/projects`, `/team`, `/contact`, `/careers`, `/projects/[category]`, `/projects/[category]/[slug]`
- Dynamic routes: 16 category pages + 11 featured project detail pages (SSG via `generateStaticParams`)
- Shared layout: Header (fixed, always white) + Footer + WhatsAppButton + ScrollToTop
- Logo: `/public/banner.gif` (no invert trick — header always white)
- Project data: 220+ projects in `src/data/projects.ts` (client-side filtering on /projects, SSG for category/detail pages)
- Featured project descriptions in `src/data/featured-projects.ts`
- No CMS — all content is static in component files
- Contact form: submits to `/api/contact` endpoint

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
src/data/projects.ts                    — 220+ project records with categories
src/data/featured-projects.ts           — Descriptions/highlights for 11 featured projects
```

## Development
- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- Auto-deploys on push to main via Vercel

## Content Source
All content comes from the original http://vadalkar.com site (2007 era):
- Company profile, contact details, office addresses
- Full project portfolio across 14 categories
- Hemant Vadalkar's credentials, career, and memberships
- Scope of services (12 items)
