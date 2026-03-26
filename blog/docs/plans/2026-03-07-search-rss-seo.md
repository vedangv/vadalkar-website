# Search, RSS & SEO Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add client-side search, RSS feed, and per-post SEO with dynamic OG images to the blog.

**Architecture:** Three independent features. Search is a client component (modal + header icon) that fetches all post titles/excerpts from Sanity and filters in-browser. RSS is a Next.js route handler generating XML. SEO enhances existing `generateMetadata()` and adds a dynamic OG image endpoint using `next/og` ImageResponse.

**Tech Stack:** Next.js 16 App Router, Sanity GROQ, next/og (ImageResponse), Tailwind CSS 4

---

### Task 1: Search — GROQ Query

**Files:**
- Modify: `src/sanity/lib/queries.ts`

**Step 1: Add lightweight search query**

Add to the end of `queries.ts`:

```typescript
export const searchPostsQuery = groq`
  *[_type == "post"] | order(publishedAt asc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt
  }
`
```

**Step 2: Verify build**

Run: `npm run build 2>&1 | tail -5`
Expected: Build succeeds

---

### Task 2: Search — SearchModal Component

**Files:**
- Create: `src/components/SearchModal.tsx`

**Step 1: Create the search modal**

Client component with:
- Full-screen overlay with backdrop blur
- Input field with autofocus, styled to match blog aesthetic
- Fetches all posts from Sanity on mount using `searchPostsQuery`
- Filters posts by title and excerpt as user types (case-insensitive)
- Shows filtered results as clickable links
- Closes on Escape key, clicking backdrop, or navigating to a result
- Shows "No results" message when nothing matches
- Keyboard shortcut listener for Cmd/Ctrl+K to open (handled in Header)

Key design:
- Cream background, Playfair Display for result titles
- Gold accent on hover for results
- Max 10 results shown at a time
- Search input: large font, no border, just a bottom accent line
- Uses `next/navigation` `useRouter` for navigation on result click

---

### Task 3: Search — Wire into Header

**Files:**
- Modify: `src/components/Header.tsx`

**Step 1: Add search icon button and modal to Header**

- Import `SearchModal`
- Add `searchOpen` state
- Add search icon button (magnifying glass SVG) in desktop nav (after nav links) and mobile menu
- Add Cmd/Ctrl+K keyboard shortcut via useEffect
- Render `<SearchModal>` conditionally when `searchOpen` is true
- Pass `onClose` callback to modal

Desktop: search icon after the nav links
Mobile: search icon in mobile menu items

**Step 2: Verify**

Run: `npm run build 2>&1 | tail -5`
Expected: Build succeeds

---

### Task 4: RSS Feed

**Files:**
- Create: `src/app/feed.xml/route.ts`
- Modify: `src/app/layout.tsx` (add RSS link tag)

**Step 1: Create RSS route handler**

```typescript
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

const SITE_URL = 'https://blog-seven-murex-93.vercel.app'

export async function GET() {
  let posts: any[] = []
  try {
    posts = await client.fetch(postsQuery)
  } catch {
    posts = []
  }

  const rssItems = posts.map((post: any) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/posts/${post.slug.current}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${post.slug.current}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Reflections — कीर्ती वडाळकर</title>
    <link>${SITE_URL}</link>
    <description>जगाच्या पाठीवर... कधीतरी कुठेतरी — Marathi travel letters by कीर्ती वडाळकर</description>
    <language>mr</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
```

**Step 2: Add RSS link to root layout**

In `src/app/layout.tsx`, add to `<head>` (inside body or via metadata):

Add `alternates` to the metadata export:
```typescript
alternates: {
  types: {
    'application/rss+xml': '/feed.xml',
  },
},
```

**Step 3: Verify**

Run: `npm run build 2>&1 | tail -10`
Expected: Build succeeds, `/feed.xml` appears as a route

---

### Task 5: SEO — Per-Post OG Meta Tags

**Files:**
- Modify: `src/app/(blog)/posts/[slug]/page.tsx`

**Step 1: Enhance generateMetadata**

Replace the current return in `generateMetadata` with full OG tags:

```typescript
const siteUrl = 'https://blog-seven-murex-93.vercel.app'
const ogImageUrl = `${siteUrl}/og?title=${encodeURIComponent(post.title)}`
const postUrl = `${siteUrl}/posts/${slug}`
const mainImageUrl = post.mainImage?.asset
  ? urlFor(post.mainImage).width(1200).height(630).url()
  : null

return {
  title: post.title,
  description: post.excerpt || '',
  openGraph: {
    title: post.title,
    description: post.excerpt || '',
    url: postUrl,
    type: 'article',
    publishedTime: post.publishedAt,
    images: [{ url: mainImageUrl || ogImageUrl, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.excerpt || '',
    images: [mainImageUrl || ogImageUrl],
  },
}
```

**Step 2: Verify build**

Run: `npm run build 2>&1 | tail -5`

---

### Task 6: SEO — Dynamic OG Image Endpoint

**Files:**
- Create: `src/app/og/route.tsx`

**Step 1: Create OG image route**

Uses `next/og` `ImageResponse` to generate a 1200x630 image:
- Cream background (#faf9f6)
- Gold accent line at top
- Post title centered in large font
- "Reflections" branding at bottom
- Supports Devanagari via Google Fonts fetch at runtime

```typescript
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get('title') || 'Reflections'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#faf9f6',
          padding: '60px',
        }}
      >
        {/* Gold accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#c9a96e' }} />

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 40 ? 48 : 60,
            fontWeight: 700,
            color: '#1a1a2e',
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: 24,
            color: '#c9a96e',
            letterSpacing: '0.15em',
          }}
        >
          REFLECTIONS
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

**Step 2: Verify build**

Run: `npm run build 2>&1 | tail -10`
Expected: Build succeeds, `/og` route appears

---

### Task 7: Update metadataBase & Deploy

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/sitemap.ts`

**Step 1: Update metadataBase to actual Vercel URL**

In `layout.tsx`, change `metadataBase` from `https://reflections.blog` to `https://blog-seven-murex-93.vercel.app`.

In `sitemap.ts`, change `baseUrl` from `https://reflections.blog` to `https://blog-seven-murex-93.vercel.app`.

**Step 2: Final build + deploy**

Run: `npm run build` — verify all routes present
Run: `npx vercel --prod --yes` — deploy

**Step 3: Verify live**

- Visit `/feed.xml` — should render RSS XML
- Visit `/og?title=Test` — should render OG image
- Check any post page source for og: meta tags
- Test Cmd+K search on homepage
