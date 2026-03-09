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
- 5 routes: `/` (home), `/about`, `/projects`, `/team`, `/contact`
- Shared layout: Header (fixed, scroll-aware) + Footer
- Logo: `/public/banner.gif` with CSS invert trick for dark/light backgrounds
- Project data: 212 projects in `src/data/projects.ts` (client-side filtering)
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
src/app/page.tsx          — Home (hero, services, featured projects, clients, CTA)
src/app/about/page.tsx    — Company history, activities, timeline
src/app/projects/page.tsx — Hero + ProjectsGrid.tsx (filter + cards)
src/app/team/page.tsx     — Hemant Vadalkar profile, career, memberships
src/app/contact/page.tsx  — Contact form + office info
src/app/globals.css       — Tailwind @theme with color palette
src/components/Header.tsx — Fixed nav, scroll-aware, mobile menu
src/components/Footer.tsx — 4-column footer
src/components/FadeIn.tsx — Framer Motion scroll-triggered animations
src/data/projects.ts      — 145+ project records with categories
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
