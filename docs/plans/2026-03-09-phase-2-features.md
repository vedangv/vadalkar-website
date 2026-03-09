# Phase 2: Feature Expansion — Design Document

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Expand the Vadalkar & Associates website beyond a replica of the original site with project detail pages, WhatsApp contact, downloadable brochure, services pages, statistics dashboard, and careers page.

**Architecture:** Static-first approach using Next.js App Router. All data remains in TypeScript files (no CMS). New dynamic routes for project categories and featured project details. Floating UI components for WhatsApp button.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion 12

---

## Completed Pre-requisites

- [x] Header: Always white background (no transparent-to-white scroll transition)
- [x] Logo: 50% larger (h-14 / sm:h-[4.5rem]), no invert trick needed
- [x] Updated photo of Hemant Vadalkar (professional headshot, Gemini watermark removed)
- [x] ISSE role updated to "President"
- [x] Added IGS membership, 2 new publications
- [x] Stats updated to "35+ years"
- [x] 7 new projects added from brochure with photos
- [x] "Questions for dad" running file created at docs/questions-for-dad.md

---

## Feature 1: Project Detail Pages (Hybrid)

### Category Landing Pages — `/projects/[category]`

- Dynamic route based on category slug (e.g., `/projects/residential`)
- Hero section with category name, total project count, brief description
- Grid of all projects in that category
- Filter by decade (1990s, 2000s, 2010s, 2020s)
- Cards show project image (if available) or gradient placeholder with building icon
- Link from main `/projects` page category tabs

### Featured Project Detail Pages — `/projects/[category]/[slug]`

- Only for ~10-15 flagship projects that have good photos
- Layout: full-width hero image, project specs sidebar (client, architect, year, cost, category)
- Description section (need content from dad or write based on project type)
- Photo gallery (when multiple photos available)
- Related projects section (same category)

**Featured Project Shortlist** (recent, visually striking):
1. IIT Bombay Hostel 18 (2015) — large residential/institutional
2. Agasan 16-storey Towers (2013) — high-rise residential
3. Tuticorin Piling Gantry (2016) — dramatic marine construction
4. Nagpur Transmission Tower Testing (2008) — iconic industrial
5. Plast India Exhibition Structure (1996) — unique tensile form
6. Nashik Indoor Stadium (2008) — large-span sports complex
7. Taloja MIDC Industrial Shed (2019) — recent industrial
8. Girgaon 22-storey Tower (2014) — urban high-rise
9. BSEL Tech Park Vashi (2002) — commercial landmark
10. Videocon Towers S+25 (1996) — twin-tower landmark

**Data model:** Add optional `slug`, `description`, `featured`, `gallery` fields to Project type.

---

## Feature 2: WhatsApp Floating Button

- Fixed position: bottom-right corner (bottom-6 right-6)
- Green WhatsApp icon (#25D366)
- Links to `https://wa.me/919322532578` with prefilled message: "Hello, I'd like to enquire about structural engineering services."
- Subtle entrance animation (slide up + fade in, 1s delay after page load)
- Pulse animation on icon to draw attention
- Hide on scroll-down, show on scroll-up (same as many modern sites)
- Close/dismiss button with localStorage to remember dismissal for session
- Component: `src/components/WhatsAppButton.tsx` (client component)

---

## Feature 3: Downloadable Company Brochure

- PDF download button on home page (hero or CTA section) and about page
- Current brochure: `docs/1321- Urban analysis-VA Intro.pdf` — copy to `public/brochure/`
- Simple direct download, no lead capture initially
- CTA design: accent-colored button with download icon
- Future: redesigned brochure PDF (ask dad if he wants a new version)

---

## Feature 4: Services Pages — `/services/[slug]`

12 individual service pages based on existing scope list:
1. Structural Design & Detailing
2. Structural Analysis (Computer Aided)
3. Structural Audit & Assessment
4. Proof Checking & Peer Review
5. Project Management & Site Supervision
6. Industrial Structures
7. Marine & Jetty Works
8. High-Rise Buildings
9. Infrastructure & Bridges
10. Shuttering & Formwork Design
11. Pile Foundation Design
12. Special Structures

**Template per page:**
- Hero with service name and brief description
- Detailed description of the service (2-3 paragraphs)
- Key capabilities / what's included
- Relevant projects grid (filtered from projects.ts by category/keywords)
- CTA to contact page

**Data:** Create `src/data/services.ts` with service data.

---

## Feature 5: Project Statistics Dashboard

- Section on `/about` page (or standalone `/stats`)
- Animated counters (count up on scroll into view)
- Charts/visualizations:
  - Projects by category (horizontal bar chart)
  - Projects by decade (timeline)
  - Project cost distribution (if data available)
- All data derived from `projects.ts` at build time
- Use CSS/SVG for charts (no heavy chart library)

---

## Feature 6: Careers Page — `/careers`

- Hero section
- Company culture / why work here section
- Current openings (static list, updatable in code):
  - Structural Engineer
  - Design Engineer / Draughtsman
  - Site Engineer
- Application form (similar to original site):
  - Name, email, phone
  - Position applied for (dropdown)
  - Qualifications, experience (years)
  - Resume upload (or link)
  - Message
- Form submits to `/api/careers` endpoint (similar to contact form)

---

## Feature 7: 3D Project Viewer (Stretch — Parked)

- Three.js / React Three Fiber
- Only feasible if dad provides 3D structural models (STAAD/AutoCAD exports)
- Park until models are available

---

## Implementation Priority

1. **WhatsApp button** — Quick win, high impact (30 min)
2. **Downloadable brochure** — Quick win (15 min)
3. **Project detail pages** — Biggest feature, highest value
4. **Services pages** — Content-driven, template approach
5. **Careers page** — Moderate effort
6. **Statistics dashboard** — Fun visual feature
7. **3D viewer** — Stretch, pending assets
