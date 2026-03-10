# Phase 3: SEO & Polish — Design Document

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extract a proper favicon from the company logo, add auto-generated OG images for social sharing, and do a full SEO audit (canonical URLs, breadcrumbs, structured data on project pages, meta description review).

**Architecture:** Static Next.js App Router. OG images use Next.js `ImageResponse` (edge runtime). Favicon generated from banner.gif via PIL. Structured data via JSON-LD script tags.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS 4, PIL/Pillow (one-time image generation)

---

## Feature 1: Favicon from Company Logo

Extract the geometric VA monogram from the left portion of `/public/banner.gif`.

**Deliverables:**
- `public/favicon.ico` — Multi-size ICO (16x16, 32x32)
- `public/icon-192.png` — 192x192 for Android/PWA
- `public/icon-512.png` — 512x512 for PWA
- `public/apple-touch-icon.png` — 180x180 for iOS
- Update `layout.tsx` metadata `icons` to reference all sizes

**Approach:**
- Use PIL to open banner.gif, crop the left ~25% (the VA mark), resize to square with navy (#1e3a5f) background padding
- Generate all sizes from the cropped source
- Replace the existing text-based favicon.svg

---

## Feature 2: OG Images (Social Sharing)

Auto-generated Open Graph images using Next.js `ImageResponse`.

**Default OG image** (`src/app/opengraph-image.tsx`):
- 1200x630px
- Navy (#1e3a5f) background
- VA logo mark + "Vadalkar And Associates" + "Structural & Civil Engineering Consultants, Mumbai"
- Gold accent line

**Per-project OG images** (`src/app/projects/[category]/[slug]/opengraph-image.tsx`):
- 1200x630px
- Project title + category badge + year
- Navy background with gold accent

**Per-category OG images** (`src/app/projects/[category]/opengraph-image.tsx`):
- Category name + project count
- Same brand styling

---

## Feature 3: Full SEO Audit

### 3a. Canonical URLs
- Add `metadataBase` in root layout.tsx → `https://vadalkar-website.vercel.app`
- This auto-generates canonical URLs for all pages
- Add `alternates: { canonical: '/path' }` on each page

### 3b. Meta Descriptions Audit
Ensure every page has a unique, descriptive meta description:
- Home: ✅ exists
- About: ✅ exists
- Projects: ✅ exists
- Team: needs check
- Contact: ✅ exists
- Careers: needs check
- Category pages: ✅ via generateMetadata
- Project detail pages: ✅ via generateMetadata

### 3c. BreadcrumbList JSON-LD
Add on category and project detail pages:
- Category: Home > Projects > {Category}
- Detail: Home > Projects > {Category} > {Project Title}

### 3d. Project Detail Structured Data
Add `CreativeWork` or `Project` JSON-LD on each featured project detail page:
- name, description, dateCreated, creator (Vadalkar And Associates), location

### 3e. Verify Existing
- robots.ts: ✅ allows all, points to sitemap
- sitemap.ts: ✅ includes all routes
- JSON-LD ProfessionalService: ✅ in layout
