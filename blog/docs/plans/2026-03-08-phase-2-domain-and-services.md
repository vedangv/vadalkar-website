# Phase 2: Domain Setup & Services Plan

## Domain: vadalkar.com

**Already owned** by Hemant Vadalkar / Vadalkar And Associates.
- Registrar: PublicDomainRegistry.com
- Registered: Dec 2006, expires Dec 2027
- Current state: Parked (NS1/NS2.DNS-PARKING.COM — not in use)

### Subdomain Plan

| Subdomain | Service | Hosting | How to connect |
|-----------|---------|---------|----------------|
| `vadalkar.com` | Vadalkar & Associates website | Vercel | CNAME → `cname.vercel-dns.com` |
| `kirty.vadalkar.com` | Mom's blog (Reflections) | Vercel | CNAME → `cname.vercel-dns.com` |
| `vedang.vadalkar.com` | Vedang's personal site (future) | Vercel | CNAME → `cname.vercel-dns.com` |
| `photos.vadalkar.com` | Immich (family photos) | Home laptop via Tailscale | See Tailscale Funnel or Cloudflare Tunnel |

### Cost: $0 additional
The domain is already paid through Dec 2027. Subdomains are free DNS records.

---

## Step 1: Move DNS to Cloudflare (free)

Moving DNS management to Cloudflare gives you a better dashboard, free SSL, and easy Tunnel setup later.

1. Create free Cloudflare account at dash.cloudflare.com
2. Add site `vadalkar.com`
3. Cloudflare gives you two nameservers (e.g. `anna.ns.cloudflare.com`, `bob.ns.cloudflare.com`)
4. Log into PublicDomainRegistry → change nameservers from `DNS-PARKING.COM` to the Cloudflare ones
5. Wait for propagation (up to 24 hours, usually faster)

## Step 2: Connect Vadalkar & Associates site to vadalkar.com

1. In Cloudflare DNS, add: `CNAME @ cname.vercel-dns.com` (proxied)
2. In Vercel dashboard for vadalkar-website project → Settings → Domains → Add `vadalkar.com`
3. Vercel auto-provisions SSL

## Step 3: Connect blog to kirty.vadalkar.com

1. In Cloudflare DNS, add: `CNAME kirty cname.vercel-dns.com` (proxied)
2. In Vercel dashboard for blog project → Settings → Domains → Add `kirty.vadalkar.com`
3. Update metadataBase in `src/app/layout.tsx` to `https://kirty.vadalkar.com`
4. Update sitemap baseUrl in `src/app/sitemap.ts`
5. Update SITE_URL in `src/app/feed.xml/route.ts`
6. Update siteUrl in `src/app/(blog)/posts/[slug]/page.tsx` generateMetadata
7. Update pageUrl in `src/app/(blog)/posts/[slug]/page.tsx` Comments component
8. Redeploy: `npx vercel --prod --yes`

## Step 4: Tailscale for Immich (family-only)

Immich is for family photo sharing — doesn't need to be public.

1. Install Tailscale on home laptop: `curl -fsSL https://tailscale.com/install.sh | sh`
2. Install Tailscale on family members' phones/devices
3. Run Immich via Docker on home laptop
4. Access via Tailscale IP or MagicDNS (e.g. `laptop.tailnet-name.ts.net:2283`)
5. No domain/subdomain needed — Tailscale handles private networking

**Optional**: If you want `photos.vadalkar.com` accessible publicly:
- Use Cloudflare Tunnel instead: `cloudflared tunnel create immich`
- Route `photos.vadalkar.com` → `localhost:2283`

## Step 5: Cusdis upgrade (if needed)

Current: Free tier (100 approved comments/month, 1 site)
If limit is hit: Upgrade to Cusdis Pro ($12/year) for unlimited

No infrastructure change needed — same cloud hosted setup.

---

## Summary

| Item | Cost | Status |
|------|------|--------|
| vadalkar.com domain | $0 (owned through 2027) | Parked, needs DNS move |
| Cloudflare DNS | Free | Not yet set up |
| Vercel hosting (3 sites) | Free (Hobby tier) | Blog live, VA site live |
| Tailscale (Immich) | Free (personal) | Not yet set up |
| Cusdis comments | Free (cloud tier) | Live |
| Kit newsletter | Free | Live |
| **Total** | **$0** | |

## Credentials Needed

To execute this plan, you'll need:
- [ ] PublicDomainRegistry login (to change nameservers) — ask dad (Hemant)
- [ ] Cloudflare account (create new, free)
- [ ] Tailscale account (create new, free)
- [ ] Home laptop access (for Immich Docker setup)
