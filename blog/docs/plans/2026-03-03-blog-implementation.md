# Mom's Blog — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Use superpowers:frontend-design for all UI component tasks (Tasks 5-9).

**Goal:** Build a beautiful personal/lifestyle blog with Sanity CMS, deploy to Vercel, with Kit newsletter integration.

**Architecture:** Next.js app with Sanity CMS embedded studio at `/studio`. Content is fetched at build time via Sanity's GROQ queries and rendered as static pages with ISR. Newsletter signup uses Kit's embed form. Comments (Cusdis) will be added in Phase 2.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS 4, Sanity v3, Kit (newsletter), Vercel

---

## Task 1: Scaffold Next.js App

**Files:**
- Create: `blog/package.json`
- Create: `blog/tsconfig.json`
- Create: `blog/next.config.ts`
- Create: `blog/postcss.config.mjs`
- Create: `blog/src/app/layout.tsx`
- Create: `blog/src/app/page.tsx`
- Create: `blog/src/app/globals.css`
- Create: `blog/.gitignore`
- Create: `blog/.env.local` (gitignored)

**Step 1: Initialize Next.js project**

Run from `/blog` directory:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

If the directory isn't empty, it may prompt — say yes to overwrite. The CLAUDE.md and docs/ should survive.

**Step 2: Verify scaffold works**

```bash
cd /Users/vedangvadalkar/Documents/Claude/vadalkar-website/blog
npm run dev
```

Expected: Next.js dev server starts on localhost:3000 with the default page.

**Step 3: Clean up default content**

- Replace `src/app/page.tsx` with a simple "Blog coming soon" placeholder
- Clean `globals.css` to only keep Tailwind imports
- Remove default Next.js SVGs from `/public`

**Step 4: Commit**

```bash
git add -A
git commit -m "scaffold: initialize Next.js blog app"
```

---

## Task 2: Set Up Sanity Project & Schemas

**Files:**
- Create: `blog/sanity.config.ts`
- Create: `blog/sanity.cli.ts`
- Create: `blog/src/sanity/schemas/post.ts`
- Create: `blog/src/sanity/schemas/category.ts`
- Create: `blog/src/sanity/schemas/author.ts`
- Create: `blog/src/sanity/schemas/index.ts`
- Create: `blog/src/sanity/lib/client.ts`
- Create: `blog/src/sanity/lib/queries.ts`
- Create: `blog/src/sanity/lib/image.ts`
- Modify: `blog/package.json` (add sanity dependencies)
- Modify: `blog/.env.local` (add Sanity project ID + dataset)

**Step 1: Install Sanity dependencies**

```bash
npm install sanity @sanity/vision @sanity/image-url next-sanity
```

**Step 2: Create Sanity project**

```bash
npx sanity init --env .env.local
```

This will prompt to:
- Log in to Sanity (browser opens)
- Create a new project (name it "Mom's Blog" or similar)
- Choose dataset: "production"
- It writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to `.env.local`

**Step 3: Create Post schema**

Create `src/sanity/schemas/post.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'mainImage' },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author ? `by ${author}` : '' }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
```

**Step 4: Create Category schema**

Create `src/sanity/schemas/category.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
```

**Step 5: Create Author schema**

Create `src/sanity/schemas/author.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
```

**Step 6: Create schema index**

Create `src/sanity/schemas/index.ts`:

```typescript
import post from './post'
import category from './category'
import author from './author'

export const schemaTypes = [post, category, author]
```

**Step 7: Create Sanity config**

Create `sanity.config.ts` at project root:

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: "Mom's Blog",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
})
```

**Step 8: Create Sanity client utilities**

Create `src/sanity/lib/client.ts`:

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

Create `src/sanity/lib/image.ts`:

```typescript
import createImageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

Create `src/sanity/lib/queries.ts`:

```typescript
import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, image }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, image, bio }
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const postsByCategoryQuery = groq`
  *[_type == "post" && $categoryId in categories[]->_id] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, image }
  }
`
```

**Step 9: Verify Sanity Studio access**

Check that the Sanity project was created at https://www.sanity.io/manage

**Step 10: Commit**

```bash
git add -A
git commit -m "feat: add Sanity CMS schemas and client utilities"
```

---

## Task 3: Embed Sanity Studio in Next.js

**Files:**
- Create: `blog/src/app/studio/[[...tool]]/page.tsx`
- Modify: `blog/next.config.ts` (add Sanity image hostname)

**Step 1: Create Studio route**

Create `src/app/studio/[[...tool]]/page.tsx`:

```typescript
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

**Step 2: Update next.config.ts**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

**Step 3: Verify Studio works**

```bash
npm run dev
```

Navigate to `http://localhost:3000/studio`. Expected: Sanity Studio loads, shows Post/Category/Author document types.

**Step 4: Add seed content**

In the Studio:
1. Create an Author (mother's name, short bio)
2. Create 2-3 Categories (e.g., "Life", "Travel", "Thoughts")
3. Create 1-2 sample Posts with images, categories, and body text

This seed data is needed to design the pages.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: embed Sanity Studio at /studio route"
```

---

## Task 4: Build Shared Layout (Header + Footer)

**Files:**
- Create: `blog/src/components/Header.tsx`
- Create: `blog/src/components/Footer.tsx`
- Create: `blog/src/components/NewsletterForm.tsx`
- Modify: `blog/src/app/layout.tsx`
- Modify: `blog/src/app/globals.css`

> **REQUIRED:** Use `frontend-design` skill for this task. Design a beautiful, distinctive header and footer for a personal lifestyle blog. The aesthetic should feel warm, editorial, and personal — not corporate.

**Step 1: Design and build Header**

Header should include:
- Blog name/logo (text-based is fine)
- Navigation: Home, About, Categories
- Clean, minimal, responsive
- Mobile hamburger menu

**Step 2: Design and build Footer**

Footer should include:
- Newsletter signup form (Kit embed — placeholder for now)
- Copyright
- Simple, clean

**Step 3: Build NewsletterForm component**

Placeholder component that will be wired to Kit later:

```typescript
'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')

  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="/* styled by frontend-design */"
      />
      <button type="submit" className="/* styled by frontend-design */">
        Subscribe
      </button>
    </form>
  )
}
```

**Step 4: Update layout.tsx**

Wire Header + Footer into the root layout. Exclude them from the `/studio` route.

```typescript
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

Note: The studio route at `/studio` should NOT render Header/Footer. Use a route group or conditional check based on pathname.

**Step 5: Verify layout renders**

```bash
npm run dev
```

Check localhost:3000 — header and footer should render around the placeholder content.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add header, footer, and newsletter form components"
```

---

## Task 5: Build Home Page

**Files:**
- Modify: `blog/src/app/page.tsx`
- Create: `blog/src/components/PostCard.tsx`
- Create: `blog/src/components/FeaturedPost.tsx`

> **REQUIRED:** Use `frontend-design` skill. The home page is the most important page — it needs to be stunning. Think editorial lifestyle magazine. Show a featured/latest post prominently, then a grid of recent posts, and a newsletter CTA section.

**Step 1: Build PostCard component**

Displays a blog post preview in a card format:
- Main image
- Category badge(s)
- Title
- Excerpt (truncated)
- Date + author
- Links to `/posts/[slug]`

**Step 2: Build FeaturedPost component**

A larger, hero-style display for the latest/featured post:
- Large image
- Title overlay or adjacent
- Excerpt
- Read more link

**Step 3: Build Home page**

`src/app/page.tsx` should:
- Fetch posts from Sanity using `postsQuery`
- Display the latest post as FeaturedPost
- Display remaining posts as PostCard grid
- Include a newsletter signup CTA section

```typescript
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

export const revalidate = 60 // ISR: revalidate every 60 seconds

export default async function HomePage() {
  const posts = await client.fetch(postsQuery)
  const [featured, ...rest] = posts

  return (
    <>
      {featured && <FeaturedPost post={featured} />}
      <section>
        {rest.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </section>
      <NewsletterSection />
    </>
  )
}
```

**Step 4: Verify with seed data**

```bash
npm run dev
```

Check that seed posts from Sanity appear on the home page with images and proper formatting.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: build home page with featured post and post grid"
```

---

## Task 6: Build Post Page

**Files:**
- Create: `blog/src/app/posts/[slug]/page.tsx`
- Create: `blog/src/components/PortableTextRenderer.tsx`
- Create: `blog/src/components/ShareButtons.tsx`
- Create: `blog/src/components/RelatedPosts.tsx`

> **REQUIRED:** Use `frontend-design` skill. The post reading experience should be beautiful — generous whitespace, elegant typography, comfortable reading width. Think Medium-level reading comfort.

**Step 1: Install Portable Text renderer**

```bash
npm install @portabletext/react
```

**Step 2: Build PortableTextRenderer**

Renders Sanity's rich text blocks with custom styling for headings, images, links, blockquotes, etc.

```typescript
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components = {
  types: {
    image: ({ value }: any) => (
      <figure>
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          width={800}
          height={450}
          className="rounded-lg"
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
  },
}

export default function PortableTextRenderer({ value }: { value: any }) {
  return <PortableText value={value} components={components} />
}
```

**Step 3: Build post page**

`src/app/posts/[slug]/page.tsx`:
- Fetch post by slug using `postBySlugQuery`
- Render: title, author, date, categories, main image, body, share buttons
- Add a placeholder div for Cusdis comments (Phase 2)
- Show related posts at the bottom

**Step 4: Add generateStaticParams for static generation**

```typescript
export async function generateStaticParams() {
  const posts = await client.fetch(groq`*[_type == "post"]{ slug }`)
  return posts.map((post: any) => ({ slug: post.slug.current }))
}
```

**Step 5: Build ShareButtons component**

Simple share links for Twitter/X, WhatsApp, copy link. No external dependencies.

**Step 6: Build RelatedPosts component**

Show 2-3 posts from the same category at the bottom of the post.

**Step 7: Verify**

```bash
npm run dev
```

Click a post from the home page — it should navigate to `/posts/[slug]` and render the full post.

**Step 8: Commit**

```bash
git add -A
git commit -m "feat: build post page with portable text, share buttons, related posts"
```

---

## Task 7: Build About Page

**Files:**
- Create: `blog/src/app/about/page.tsx`

> **REQUIRED:** Use `frontend-design` skill. A warm, personal about page. Author photo, bio, maybe a personal touch (favorite quote, what the blog is about).

**Step 1: Build About page**

Fetch author data from Sanity and render:
- Author photo
- Bio (rendered with PortableText)
- A personal intro section

**Step 2: Verify**

```bash
npm run dev
```

Navigate to `/about` — should show the author info from Sanity.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: build about page"
```

---

## Task 8: Build Categories Page

**Files:**
- Create: `blog/src/app/categories/page.tsx`
- Create: `blog/src/app/categories/[slug]/page.tsx`

> **REQUIRED:** Use `frontend-design` skill.

**Step 1: Build categories listing page**

`/categories` — shows all categories as cards/links with descriptions.

**Step 2: Build category detail page**

`/categories/[slug]` — shows all posts in a category, reusing PostCard component.

**Step 3: Add generateStaticParams for categories**

```typescript
export async function generateStaticParams() {
  const categories = await client.fetch(groq`*[_type == "category"]{ slug }`)
  return categories.map((cat: any) => ({ slug: cat.slug.current }))
}
```

**Step 4: Verify**

```bash
npm run dev
```

Navigate to `/categories` and click a category — should show filtered posts.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: build categories listing and detail pages"
```

---

## Task 9: Wire Up Kit Newsletter

**Files:**
- Modify: `blog/src/components/NewsletterForm.tsx`

**Step 1: Get Kit form embed code**

1. Go to https://app.kit.com
2. Create a free account (or log in)
3. Create a Form → choose "Inline" type
4. Copy the form action URL

**Step 2: Update NewsletterForm to use Kit**

Replace the placeholder with Kit's form action:

```typescript
'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Kit form action URL from .env
    const formId = process.env.NEXT_PUBLIC_KIT_FORM_ID
    await fetch(`https://app.kit.com/forms/${formId}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_address: email }),
    })
    setSubmitted(true)
  }

  if (submitted) return <p>Thanks for subscribing!</p>

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
      />
      <button type="submit">Subscribe</button>
    </form>
  )
}
```

**Step 3: Add env variable**

Add to `.env.local`:
```
NEXT_PUBLIC_KIT_FORM_ID=your_form_id_here
```

**Step 4: Verify**

Test the form in dev mode — should POST to Kit and show success message.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: wire Kit newsletter signup form"
```

---

## Task 10: Polish, SEO & Deploy

**Files:**
- Modify: `blog/src/app/layout.tsx` (metadata)
- Create: `blog/src/app/sitemap.ts`
- Create: `blog/src/app/robots.ts`
- Modify: various pages (add metadata)

**Step 1: Add metadata to all pages**

Each page should export metadata with title, description, OpenGraph tags.

**Step 2: Create dynamic sitemap**

```typescript
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export default async function sitemap() {
  const posts = await client.fetch(groq`*[_type == "post"]{ slug, publishedAt }`)
  const postUrls = posts.map((post: any) => ({
    url: `https://yourdomain.com/posts/${post.slug.current}`,
    lastModified: post.publishedAt,
  }))

  return [
    { url: 'https://yourdomain.com', lastModified: new Date() },
    { url: 'https://yourdomain.com/about', lastModified: new Date() },
    { url: 'https://yourdomain.com/categories', lastModified: new Date() },
    ...postUrls,
  ]
}
```

**Step 3: Create robots.txt**

```typescript
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/studio/' },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

**Step 4: Build and verify**

```bash
npm run build
```

Expected: Build succeeds with no errors. All pages statically generated.

**Step 5: Deploy to Vercel**

Option A — if blog is its own repo:
```bash
cd /Users/vedangvadalkar/Documents/Claude/vadalkar-website/blog
git init
git remote add origin <new-repo-url>
git push -u origin main
```
Then connect to Vercel.

Option B — if staying in monorepo:
Connect the vadalkar-website repo to Vercel, set root directory to `blog/`.

**Step 6: Verify deployment**

Check the Vercel URL — all pages should work, Studio should be accessible at `/studio`.

**Step 7: Commit any final changes**

```bash
git add -A
git commit -m "feat: add SEO metadata, sitemap, robots.txt"
```

---

## Phase 2 (Later — on home laptop)

These tasks are NOT for today. Documented here for reference.

### Task 11: Set Up Cloudflare Tunnel
- Install cloudflared on home laptop
- Create tunnel for Cusdis + Immich
- Configure DNS

### Task 12: Deploy Cusdis
- Docker compose with Cusdis + Postgres
- Configure behind Cloudflare Tunnel

### Task 13: Wire Cusdis into Blog
- Add Cusdis embed component to post pages
- Set `data-host` to Cusdis server URL
