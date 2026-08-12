# Vadalkar & Associates Pre-Launch Hardening Checklist

Last reviewed: 2026-08-12

Target production domain: `https://vadalkar.com`

Current launch candidate: GitHub `main` / Vercel production, currently aliased to `https://development.vadalkar.com`

## Gate 1 — Release Blockers

- [x] Configure Next.js image optimization for `cdn.sanity.io` and verify the CMS-backed image path end to end.
- [x] Resolve factual count mismatches by deriving `386` projects and `17` categories from Sanity; label the separate `35+` figure as professional experience.
- [x] Remove empty client labels throughout project grids and details.
- [ ] **BLOCKED — Dad/photos:** replace low-resolution or missing images for IIT Bombay Hostel 18, Taloja MIDC Shed, and other approved flagship projects.
- [x] Harden the contact API: validation, length limits, HTML escaping, same-origin enforcement, a honeypot, request-size limits, and awaited downstream delivery.
- [ ] Replace the Resend sandbox sender with a verified `vadalkar.com` sender and run an approved end-to-end delivery test.
- [x] Make Cloudflare Email Routing the sole inbound-mail provider; remove the conflicting Hostinger MX records and Hostinger SPF include.
- [x] Activate and verify `info@vadalkar.com`, `support@vadalkar.com`, and `contact@vadalkar.com` as named forwarding aliases; keep catch-all delivery disabled.
- [x] Verify the authoritative DNS publishes Cloudflare's three routing MX records, SPF include, and Email Routing DKIM key.
- [x] Mark Vashi inactive, hide it from public office listings, retain its CMS record pending Dad's disposition decision, and set the public office count to one.
- [x] Remove the three unconfirmed job openings and convert Careers to a general enquiry form and `info@vadalkar.com` contact.
- [ ] Confirm the present-tense ISSE President claim and dates.

## Gate 2 — SEO, Indexing, and Domain Cutover

- [x] Centralize the canonical origin through `NEXT_PUBLIC_SITE_URL` for metadata, sitemap, robots, Open Graph, and JSON-LD.
- [x] Add canonical URLs and `og:url` coverage to public pages.
- [x] Default the launch-candidate host to `noindex, nofollow`; document the cutover variables that enable production indexing.
- [x] Generate `/robots.txt` from the deployment’s indexing state and exclude `/api/` and `/studio/` when indexing is enabled.
- [x] Exclude `/studio` from indexing and the public sitemap/navigation.
- [x] Give all core pages distinct titles and descriptions, including About and Services.
- [x] Add ProfessionalService, WebSite, BreadcrumbList, and project structured data with environment-aware URLs and safe JSON serialization.
- [x] Use Sanity `_updatedAt` values for project sitemap dates and omit fake build-time dates from static pages.
- [x] Add a linked, indexable Services overview with stable anchors for structural design, structural audit, proof checking, repair consulting, and STAADPro consulting.
- [ ] Add production-domain redirects for `www`, the Vercel alias, and the development hostname after cutover.
- [ ] Prepare Google Search Console and Bing Webmaster Tools verification/index submission steps for cutover day.

## Gate 3 — CMS and Content Freshness

- [x] Define the publication model: hourly ISR fallback plus a signed Sanity webhook for immediate refresh.
- [x] Implement signature-validated Sanity revalidation for affected public routes.
- [ ] Configure `SANITY_REVALIDATE_SECRET` in Vercel and create the matching Sanity webhook to `/api/revalidate`.
- [x] Type all Sanity query results and remove unsafe `any` mappings.
- [ ] Ensure CMS fallbacks never produce empty services, offices, milestones, or critical contact information.
- [x] Update README, environment template, and project documentation for the current Sanity/Vercel architecture.
- [x] Add a per-office publication toggle so inactive office records can be retained without appearing publicly.

## Gate 4 — Quality, Security, and Dependencies

- [x] Exclude the standalone `blog/` project from root ESLint and make `npm run lint` deterministic.
- [x] Fix all root-project lint errors and warnings.
- [x] Add focused tests for SEO URL generation and contact validation/escaping; verify revalidation rejection behavior at the route boundary.
- [x] Add content-type, referrer, frame, and browser-permission security headers compatible with the public site and Studio.
- [x] Update safe patch/minor dependencies, including Next.js 16.3 and Resend 6.19, then re-run the dependency audit.
- [x] Reduce the audit from 34 findings including 1 critical to 9 Sanity-chain findings; keep the remaining major upgrade as a separate migration.
- [x] Remove unused `styled-components` from the direct dependencies.
- [x] Add CI for typecheck, lint, tests, and production build on pull requests and `main`.

## Gate 5 — UX and Accessibility Polish

- [x] Make homepage featured-project cards real links.
- [x] Add search, decade filtering, content-visibility optimization, and 36-item progressive disclosure to the 386-project portfolio.
- [x] Preserve category, decade, and search filters in the URL so filtered views are shareable and navigable.
- [ ] Clarify “Team” versus “Leadership” if Hemant remains the only profile.
- [x] Add `aria-expanded` and `aria-controls` to the mobile navigation trigger.
- [x] Fix low-contrast project-stat values and the header logo aspect ratio.
- [ ] Make scroll-triggered content resilient when JavaScript or IntersectionObserver fails.
- [ ] Add visible empty/error states for missing CMS content and images.
- [ ] Verify keyboard navigation, reduced-motion behavior, mobile menu behavior, and form error announcements.

## Gate 6 — Photo and Dad-Provided Content (Blocked)

- [ ] **BLOCKED — Dad:** approve 6–10 flagship projects.
- [ ] **BLOCKED — Dad:** provide approved high-resolution project images and usage permission.
- [ ] **BLOCKED — Dad:** provide/approve staff profiles or approve renaming Team to Leadership.
- [ ] **BLOCKED — Dad:** approve detailed service scope copy.
- [ ] **BLOCKED — Dad:** provide verified awards, testimonials, and current major-client additions.
- [ ] **BLOCKED — Dad:** provide a vector/SVG logo if available.
- [ ] **BLOCKED — Dad:** decide whether the six-page digital brochure is sufficient or provide current manpower, facilities, adviser, publication, and project-schedule content for a formal capability statement.

## Cutover Runbook

- [ ] Freeze content and create a rollback point for the legacy Hostinger site and DNS records.
- [ ] Verify Vercel production environment variables and domain assignment.
- [ ] Lower relevant DNS TTLs before the cutover window.
- [ ] Point the apex and `www` hostnames to Vercel without changing validated mail MX/TXT records.
- [ ] Verify HTTPS, canonical URLs, redirects, sitemap, robots, images, contact delivery, analytics, and all primary routes on `vadalkar.com`.
- [ ] Submit the production sitemap to search engines and monitor Vercel/Cloudflare logs.
- [ ] Keep the legacy export recoverable until the production site has completed a stable observation window.

## Current Verified Baseline

- [x] GitHub `main` is the Vercel production branch.
- [x] `development.vadalkar.com` and the Vercel production alias resolve to the same deployment.
- [x] Production build completes successfully.
- [x] All 34 sitemap routes return HTTP 200.
- [x] No broken internal links were found in the discovered public route set.
- [x] Responsive checks found no horizontal overflow at 390 px or 1440 px.
- [x] Project category filtering and native contact-form validation work.
- [x] The public office list shows Dadar only; Vashi remains retained as an inactive CMS record, and the map pin targets STADD Engineers Mumbai at `2RCV+JC`.
- [x] The Careers page advertises no openings and routes general career enquiries through the contact API with a distinct email subject.
- [x] The six-page digital brochure has no broken images, reflects 386 projects / 17 sectors / 35+ years, links the full portfolio, and supports print/save-to-PDF.
- [x] Sanity contains 386 projects across 17 categories with no duplicate titles or slugs.
- [x] Cloudflare Email Routing is enabled and DNS-locked; public DNS returns all three Cloudflare MX records plus the Cloudflare SPF and DKIM records.
- [x] Local production build generates 71 routes on Next.js 16.3.
- [x] Local browser verification found no broken Sanity image requests, no runtime overlays, no horizontal overflow at 390 px, and zero automated WCAG A/AA violations on the home page.
