# Blog Design Document

**Date:** 2026-03-03
**Status:** Phase 1 Complete
**Last Updated:** 2026-03-03

## Purpose
A personal/lifestyle blog for Vedang's mother. Standalone site, not connected to the Vadalkar & Associates business website.

## Requirements
- Beautiful, polished design (top priority)
- Reader engagement: comments and newsletter
- Easy for a tech-savvy non-developer to write and publish posts
- Entirely free tech stack
- Vedang handles initial setup and maintenance

## Tech Stack

| Component | Tool | Tier | Limits |
|-----------|------|------|--------|
| Framework | Next.js + TypeScript + Tailwind CSS 4 | Open source | None |
| CMS | Sanity | Free | 3 users, 500K API req/mo, 5GB assets |
| Hosting | Vercel | Free (Hobby) | 100GB bandwidth/mo |
| Comments | Cusdis (self-hosted) | Free | Self-hosted on home laptop |
| Newsletter | Kit (ConvertKit) | Free | Up to 10,000 subscribers |
| Domain | TBD | ~$10-15/yr | Only non-free cost |

## Architecture

```
[Mother writes post in Sanity Studio]
        |
        v
[Sanity CMS API] --> [Next.js on Vercel] --> [Reader sees blog]
                                                  |
                                          [Cusdis comments]
                                          [Kit newsletter signup]
```

### Content Flow
1. Mother logs into Sanity Studio (hosted by Sanity, free)
2. Writes/edits a post using the rich text editor
3. Publishes the post
4. Sanity webhook triggers Vercel rebuild (or ISR handles it)
5. Blog updates with the new post

### Comments Flow (Phase 2 - after reverse proxy setup)
1. Reader writes a comment on a blog post (no account needed)
2. Comment goes to self-hosted Cusdis server
3. Mother gets notified and can moderate via Cusdis dashboard
4. Approved comments appear on the post

### Newsletter Flow
1. Reader enters email on blog (Kit embed form)
2. Kit manages the subscriber list
3. New posts can be sent as emails via Kit (manual or automated)

## Infrastructure

### Vercel (Blog hosting)
- Auto-deploys from GitHub on push to main
- Free SSL, CDN, serverless functions
- No server management

### Home Laptop (Comments + Immich)
- Already runs Immich (local only)
- Will add Cusdis as another Docker container
- Cloudflare Tunnel for reverse proxy (free, no port forwarding)
- Covers both Cusdis and Immich external access

## Pages
1. **Home** - Latest posts, featured posts, newsletter signup
2. **Post page** - Full article, comments section, share buttons, related posts
3. **About** - About the author
4. **Categories/Tags** - Browse posts by topic
5. **Newsletter** - Dedicated signup page (optional)

## Sanity CMS Schema
- **Post**: title, slug, author, publishedAt, body (rich text), categories, mainImage, excerpt
- **Category**: title, slug, description
- **Author**: name, bio, image

## Deployment
- **Blog**: https://blog-seven-murex-93.vercel.app
- **Sanity Studio**: https://blog-seven-murex-93.vercel.app/studio
- **GitHub**: https://github.com/vedangv/reflections-blog
- **Sanity Project**: k6e4jp5z (dataset: production)

## Current Content
- **Author**: कीर्ती वडाळकर (Mumbai-based Marathi travel writer)
- **Posts**: 15 live (letters 111–125 from "जगाच्या पाठीवर..." series)
- **Categories**: प्रवास पत्रे, Travel
- **Remaining**: 110 letters (1–110) to be uploaded from .eml exports

## Phases
1. **Phase 1 (COMPLETE)**: Built Next.js blog + Sanity CMS, deployed to Vercel, uploaded 15 real Marathi posts, author bio, categories, SEO.
2. **Phase 2 (PENDING — on home laptop)**: Set up Cloudflare Tunnel + Cusdis Docker on home laptop. Wire comments into blog. Set up Kit newsletter account.
3. **Ongoing**: Upload remaining 110 letters, add photos, custom domain.
