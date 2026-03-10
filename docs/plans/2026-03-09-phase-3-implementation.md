# Phase 3: SEO & Polish — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Extract a real favicon from the company logo, add auto-generated OG images for social sharing, and complete a full SEO audit with canonical URLs, breadcrumb structured data, and project-level JSON-LD.

**Architecture:** Static Next.js App Router. OG images use Next.js `ImageResponse` (edge runtime, file-based convention). Favicon generated from banner.gif using Python PIL. Structured data via JSON-LD in page components. No test framework — verification via `npm run build`.

**Tech Stack:** Next.js 16, TypeScript, React 19, Tailwind CSS 4, Python/PIL (one-time favicon generation)

**Note:** This project has no test framework. Verification is via `npm run build` (catches type/build errors) and visual check in dev server.

---

### Task 1: Extract Favicon from Banner Logo

**Files:**
- Modify: `public/favicon.ico` (generate)
- Create: `public/icon-192.png`
- Create: `public/icon-512.png`
- Create: `public/apple-touch-icon.png`
- Modify: `public/favicon.svg` (replace)
- Modify: `src/app/layout.tsx:21-23` (update icons metadata)

**Step 1: Extract and generate favicon images using Python**

Run this Python script to extract the VA mark from the left side of banner.gif and generate all favicon sizes:

```python
# Run: python3 generate-favicons.py
from PIL import Image, ImageDraw

# Open the banner
banner = Image.open("public/banner.gif").convert("RGBA")

# The VA mark is roughly the left 25% of the banner
w, h = banner.size
mark_width = int(w * 0.22)
mark = banner.crop((0, 0, mark_width, h))

# Create a square canvas with navy background
size = max(mark.size)
padding = int(size * 0.1)
canvas_size = size + padding * 2

# For each target size, create a padded square with the mark centered
sizes = {
    "public/icon-512.png": 512,
    "public/icon-192.png": 192,
    "public/apple-touch-icon.png": 180,
}

navy = (30, 58, 95, 255)  # #1e3a5f

for path, target_size in sizes.items():
    canvas = Image.new("RGBA", (canvas_size, canvas_size), navy)
    # Center the mark
    x_offset = (canvas_size - mark.width) // 2
    y_offset = (canvas_size - mark.height) // 2
    canvas.paste(mark, (x_offset, y_offset), mark)
    # Resize to target
    canvas = canvas.resize((target_size, target_size), Image.LANCZOS)
    canvas.save(path)
    print(f"Created {path} ({target_size}x{target_size})")

# Generate favicon.ico with multiple sizes
canvas_large = Image.new("RGBA", (canvas_size, canvas_size), navy)
x_offset = (canvas_size - mark.width) // 2
y_offset = (canvas_size - mark.height) // 2
canvas_large.paste(mark, (x_offset, y_offset), mark)

icon_32 = canvas_large.resize((32, 32), Image.LANCZOS)
icon_16 = canvas_large.resize((16, 16), Image.LANCZOS)
icon_32.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32)])
print("Created public/favicon.ico (16x16 + 32x32)")

# Update the SVG to match — simple navy square with "VA" as fallback
svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#1e3a5f"/>
  <text x="16" y="22" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="700" fill="#f59e0b" text-anchor="middle">VA</text>
</svg>'''
# Keep SVG as-is since we now have proper ICO/PNG favicons
print("Done!")
```

Run: `python3 generate-favicons.py`
Expected: 4 files created in `public/`

**Step 2: Update layout.tsx icons metadata**

In `src/app/layout.tsx`, replace the existing `icons` in the metadata export (line 21-23):

```tsx
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
```

**Step 3: Verify**

Run: `npm run build`
Expected: Build succeeds.

Run: `npm run dev` — check browser tab. Favicon should show the VA mark instead of generic "VA" text.

**Step 4: Commit**

```bash
git add public/favicon.ico public/icon-192.png public/icon-512.png public/apple-touch-icon.png src/app/layout.tsx
git commit -m "feat: extract real VA logo mark as favicon"
```

---

### Task 2: Add metadataBase for Canonical URLs

**Files:**
- Modify: `src/app/layout.tsx:15` (add metadataBase)

**Step 1: Add metadataBase to root layout metadata**

In `src/app/layout.tsx`, add `metadataBase` to the metadata export. Find this block:

```tsx
export const metadata: Metadata = {
  title: "Vadalkar And Associates | Structural & Civil Engineering Consultants",
```

Add `metadataBase` right before `title`:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://vadalkar-website.vercel.app"),
  title: "Vadalkar And Associates | Structural & Civil Engineering Consultants",
```

This automatically generates canonical URLs, resolves relative OG image URLs, and sets the base for sitemap references across all pages.

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds. No warnings about missing metadataBase.

**Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add metadataBase for canonical URL generation"
```

---

### Task 3: Default OG Image

**Files:**
- Create: `src/app/opengraph-image.tsx`

**Step 1: Create the default OG image route**

```tsx
// src/app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vadalkar And Associates — Structural & Civil Engineering Consultants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#1e3a5f",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            width: 80,
            height: 4,
            backgroundColor: "#d97706",
            marginBottom: 32,
          }}
        />
        {/* Company name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Vadalkar And Associates
        </div>
        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            lineHeight: 1.4,
            marginBottom: 40,
          }}
        >
          Structural &amp; Civil Engineering Consultants
        </div>
        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: "#d97706",
              fontWeight: 600,
            }}
          >
            Mumbai, India
          </div>
          <div style={{ fontSize: 20, color: "#475569" }}>•</div>
          <div
            style={{
              fontSize: 20,
              color: "#d97706",
              fontWeight: 600,
            }}
          >
            Since 1994
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds. The OG image route is auto-detected by Next.js file convention.

Run: `npm run dev` — visit `http://localhost:3000/opengraph-image` to see the generated image.

**Step 3: Commit**

```bash
git add src/app/opengraph-image.tsx
git commit -m "feat: add default OG image for social sharing"
```

---

### Task 4: Category Page OG Images

**Files:**
- Create: `src/app/projects/[category]/opengraph-image.tsx`

**Step 1: Create the category OG image route**

```tsx
// src/app/projects/[category]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { categories, categorySlug, projects } from "@/data/projects";

export const runtime = "edge";
export const alt = "Project Category — Vadalkar And Associates";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return categories
    .filter((c) => c !== "All")
    .map((cat) => ({ category: categorySlug(cat) }));
}

export default async function OGImage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = categories.find((c) => categorySlug(c) === slug) || slug;
  const count = projects.filter((p) => p.category === category).length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#1e3a5f",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#d97706",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 24,
          }}
        >
          Project Portfolio
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {category}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            marginBottom: 40,
          }}
        >
          {count} project{count !== 1 ? "s" : ""} completed
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: "auto",
          }}
        >
          <div style={{ fontSize: 22, color: "#d97706", fontWeight: 600 }}>
            Vadalkar And Associates
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds. OG images generated for each category page.

**Step 3: Commit**

```bash
git add src/app/projects/\[category\]/opengraph-image.tsx
git commit -m "feat: add OG images for category pages"
```

---

### Task 5: Project Detail Page OG Images

**Files:**
- Create: `src/app/projects/[category]/[slug]/opengraph-image.tsx`

**Step 1: Create the project detail OG image route**

```tsx
// src/app/projects/[category]/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { projects, categorySlug } from "@/data/projects";

export const runtime = "edge";
export const alt = "Project — Vadalkar And Associates";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const featuredProjects = projects.filter((p) => p.featured && p.slug);

export function generateStaticParams() {
  return featuredProjects.map((p) => ({
    category: categorySlug(p.category),
    slug: p.slug!,
  }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);
  if (!project) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", backgroundColor: "#1e3a5f" }} />,
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#1e3a5f",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "#1e3a5f",
              fontWeight: 700,
              backgroundColor: "#d97706",
              padding: "8px 20px",
              textTransform: "uppercase",
            }}
          >
            {project.category}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "white",
              fontWeight: 700,
              backgroundColor: "#334155",
              padding: "8px 20px",
            }}
          >
            {project.year}
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#94a3b8",
            marginBottom: 16,
          }}
        >
          Client: {project.client}
        </div>
        {project.cost && (
          <div
            style={{
              fontSize: 24,
              color: "#d97706",
              fontWeight: 700,
            }}
          >
            Rs. {project.cost} Lakhs
          </div>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <div style={{ fontSize: 20, color: "#64748b" }}>
            Vadalkar And Associates
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds. OG images generated for each featured project page.

**Step 3: Commit**

```bash
git add src/app/projects/\[category\]/\[slug\]/opengraph-image.tsx
git commit -m "feat: add OG images for project detail pages"
```

---

### Task 6: BreadcrumbList JSON-LD on Category Pages

**Files:**
- Modify: `src/app/projects/[category]/page.tsx`

**Step 1: Add breadcrumb structured data**

In `src/app/projects/[category]/page.tsx`, add a JSON-LD script tag inside the returned JSX, right after the opening `<>` fragment:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vadalkar-website.vercel.app" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://vadalkar-website.vercel.app/projects" },
        { "@type": "ListItem", position: 3, name: category },
      ],
    }),
  }}
/>
```

Insert this right after `return (` and before `<>` — actually, place it as the first child inside the `<>` fragment.

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/projects/\[category\]/page.tsx
git commit -m "feat: add BreadcrumbList JSON-LD to category pages"
```

---

### Task 7: BreadcrumbList + Project JSON-LD on Detail Pages

**Files:**
- Modify: `src/app/projects/[category]/[slug]/page.tsx`

**Step 1: Add breadcrumb and project structured data**

In `src/app/projects/[category]/[slug]/page.tsx`, add JSON-LD script tags as the first children inside the `<>` fragment:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://vadalkar-website.vercel.app" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://vadalkar-website.vercel.app/projects" },
        { "@type": "ListItem", position: 3, name: project.category, item: `https://vadalkar-website.vercel.app/projects/${catSlug}` },
        { "@type": "ListItem", position: 4, name: project.title },
      ],
    }),
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: details?.description || `Structural engineering for ${project.title}`,
      dateCreated: project.year,
      creator: {
        "@type": "Organization",
        name: "Vadalkar And Associates",
        url: "https://vadalkar-website.vercel.app",
      },
      ...(project.cost && { estimatedCost: { "@type": "MonetaryAmount", currency: "INR", value: parseInt(project.cost) * 100000 } }),
    }),
  }}
/>
```

Note: `catSlug` and `project` are already available as variables in the component. `details` comes from `featuredDescriptions[slug]`.

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/app/projects/\[category\]/\[slug\]/page.tsx
git commit -m "feat: add BreadcrumbList and CreativeWork JSON-LD to project detail pages"
```

---

## Execution Summary

| Task | Feature | Effort |
|------|---------|--------|
| 1 | Favicon from banner.gif logo | ~15 min |
| 2 | metadataBase for canonical URLs | ~5 min |
| 3 | Default OG image | ~10 min |
| 4 | Category page OG images | ~10 min |
| 5 | Project detail page OG images | ~10 min |
| 6 | BreadcrumbList JSON-LD on category pages | ~5 min |
| 7 | BreadcrumbList + CreativeWork JSON-LD on detail pages | ~10 min |

**Total estimated: ~1 hour**

All tasks are independent except Task 2 (metadataBase) should come before Tasks 3-5 (OG images) since metadataBase helps Next.js resolve OG image URLs correctly.
