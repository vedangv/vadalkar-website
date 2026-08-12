# Vadalkar & Associates Website

Corporate website for Vadalkar & Associates, a structural and civil engineering consultancy in Mumbai established in 1994.

The Next.js launch candidate is currently served at `development.vadalkar.com`. The legacy static site remains at `vadalkar.com` until the production cutover is approved.

## Stack

- Next.js 16 App Router, React 19, and TypeScript
- Tailwind CSS 4 and Framer Motion
- Sanity for projects, home, about, contact, and site settings
- Resend for contact-form delivery
- Vercel for builds, hosting, analytics, and deployment
- Cloudflare for DNS

The `blog/` directory is a separate project and is intentionally excluded from this project’s TypeScript, ESLint, and Git scopes.

## Local development

Copy `.env.example` to `.env.local`, fill the required values, then run:

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Public Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Sanity dataset, normally `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | Pinned Sanity API version |
| `NEXT_PUBLIC_SITE_URL` | At cutover | Canonical origin; set to `https://vadalkar.com` for launch |
| `NEXT_PUBLIC_SITE_INDEXABLE` | At cutover | Set to `true` only when the apex domain is ready for indexing |
| `RESEND_API_KEY` | Yes | Contact-form email delivery |
| `CONTACT_FROM_EMAIL` | For launch | Verified sender such as `Vadalkar Website <website@vadalkar.com>` |
| `CONTACT_TO_EMAIL` | For launch | Enquiry recipient; use `info@vadalkar.com` |
| `GOOGLE_SHEETS_WEBHOOK_URL` | No | Optional lead-log webhook |
| `SANITY_REVALIDATE_SECRET` | Recommended | Shared secret for the signed Sanity publish webhook |

## Content publication

Sanity queries use hourly revalidation as a safe fallback. For immediate updates, create a Sanity webhook that sends create, update, and delete events to:

```text
POST https://<deployment>/api/revalidate
Projection: {"_type": _type}
Secret: the same value as SANITY_REVALIDATE_SECRET
```

The endpoint validates Sanity’s request signature before invalidating public routes.

## SEO and cutover

The launch candidate defaults to `noindex` so it does not compete with the legacy site. On cutover day, set:

```text
NEXT_PUBLIC_SITE_URL=https://vadalkar.com
NEXT_PUBLIC_SITE_INDEXABLE=true
```

Then rebuild and verify canonical tags, `/robots.txt`, `/sitemap.xml`, redirects, structured data, project images, and contact delivery on the apex domain.

The complete release gates and rollback procedure live in [`docs/pre-launch-hardening-checklist.md`](docs/pre-launch-hardening-checklist.md).
