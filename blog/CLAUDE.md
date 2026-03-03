# Blog Project

Personal/lifestyle blog for Vedang's mother.

## Tech Stack
- Next.js + TypeScript + Tailwind CSS 4
- Sanity CMS (free tier) for content management
- Vercel for hosting (free tier)
- Cusdis for comments (self-hosted on home server, setup pending)
- Kit (formerly ConvertKit) for newsletter (free tier, up to 10K subscribers)

## Architecture
- Blog is a standalone Next.js app (NOT part of the Vadalkar & Associates website)
- Sanity provides the CMS dashboard where posts are written
- Vercel hosts the frontend
- Cusdis runs as a Docker container on a home laptop (same as Immich server)
- Cloudflare Tunnel will expose Cusdis + Immich to the internet (setup pending)

## Design Priorities
1. Beautiful, polished design
2. Reader engagement (comments + newsletter)
3. Easy post creation via Sanity dashboard
4. 100% free stack

## Development
- `npm run dev` - Start dev server
- `npm run build` - Production build
- Deploy: Push to main branch, Vercel auto-deploys
