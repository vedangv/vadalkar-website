# Reflections Blog — कीर्ती वडाळकर

Personal blog for Vedang's mother (कीर्ती वडाळकर), featuring her "जगाच्या पाठीवर... कधीतरी कुठेतरी" series of 125 Marathi travel letters.

## Live URLs
- **Blog**: https://blog-seven-murex-93.vercel.app
- **Sanity Studio**: https://blog-seven-murex-93.vercel.app/studio
- **GitHub**: https://github.com/vedangv/reflections-blog

## Tech Stack
- Next.js 16 + TypeScript + Tailwind CSS 4
- Sanity CMS v3 (free tier, project ID: k6e4jp5z, dataset: production)
- Vercel hosting (free Hobby tier)
- Kit (formerly ConvertKit) for newsletter (form ID: 9157764)
- Cusdis for comments (cloud free tier, app ID: 3cdbff6d-86e1-430f-a30d-375632e81f88)

## Architecture
- Standalone Next.js app (NOT part of the Vadalkar & Associates website)
- Sanity Studio embedded at /studio route
- Route groups: (blog) for public pages, (studio) for Sanity Studio
- ISR with 60s revalidation for content freshness
- GROQ queries in src/sanity/lib/queries.ts
- Client-side search via SearchModal (fetches all posts, filters in-browser)
- RSS feed at /feed.xml (route handler)
- Dynamic OG images at /og (edge runtime, Noto Sans Devanagari font)
- Cusdis comments via iframe embed (not react-cusdis, which requires styled-components)

## Content
- **Author**: कीर्ती वडाळकर (author-mom) — Mumbai-based Marathi travel writer
- **Categories**: प्रवास पत्रे (cat-pravas-patre), Travel (cat-travel)
- **Posts**: 126 live (प्रस्तावना + letters 1–125), all uploaded from .eml Gmail exports
- Post IDs follow pattern: post-patra-{number} (e.g. post-patra-125)

## Uploading Posts from .eml Files
- Drop .eml files in posts/ folder (Devanagari filenames like "पत्र क्र १२५.eml")
- Parse with Python: email module + base64 decode for Marathi content
- Split on * markers (Gmail bold) to get paragraphs
- Push to Sanity via Mutations API (POST to /data/mutate/production)
- IMPORTANT: Strip email signatures (Sent from iPhone, STADD Engineers block, email threads)
- Redeploy: `npx vercel --prod --yes`

## Design System
- Fonts: Playfair Display (headings), Source Sans 3 (body)
- Colors: #1a1a2e (navy), #c9a96e (gold accent), #faf9f6 (cream bg)
- Warm, editorial aesthetic

## Development
- `npm run dev` — Start dev server (localhost:3000)
- `npm run build` — Production build
- `npx vercel --prod --yes` — Deploy to production

## Sanity Auth
- Token location: ~/.config/sanity/config.json
- API: https://k6e4jp5z.api.sanity.io/v2024-01-01/

## Phase 2 (Pending)
- Custom domain (~$10.46/yr via Cloudflare Registrar)
- Tailscale for Immich (family-only photo sharing on home laptop)
- Cusdis Pro ($12/yr) if free tier limit (100 comments/mo) is hit
