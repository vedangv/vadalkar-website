# Sprint 1: Make It Functional — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the live site (https://vadalkar-website.vercel.app) fully functional with a working contact form, analytics, proper favicon, and SEO essentials.

**Architecture:** Resend for email delivery via Next.js API route, Google Sheets integration via Apps Script webhook, Vercel Analytics as a one-line SDK addition, and Next.js built-in metadata/sitemap APIs for SEO.

**Tech Stack:** Next.js 16 App Router, Resend SDK, Vercel Analytics, Next.js Metadata API

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install Resend and Vercel Analytics**

```bash
npm install resend @vercel/analytics
```

**Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add resend and vercel-analytics dependencies"
```

---

### Task 2: Add Vercel Analytics

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add Analytics component to root layout**

Add import at top:
```tsx
import { Analytics } from "@vercel/analytics/next";
```

Add `<Analytics />` after `<Footer />` inside `<body>`:
```tsx
<body className={`${inter.variable} antialiased`}>
  <Header />
  <main>{children}</main>
  <Footer />
  <Analytics />
</body>
```

**Step 2: Verify build succeeds**

```bash
npm run build
```

**Step 3: Commit and push**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Vercel Analytics"
git push origin main
```

---

### Task 3: Create contact form API route (Resend)

**Files:**
- Create: `src/app/api/contact/route.ts`

**Step 1: Create the API route**

The route accepts POST with JSON body `{ name, email, phone, service, message }`. It:
1. Validates required fields (name, email, message)
2. Sends notification email via Resend to vadalkar@gmail.com
3. Optionally posts to Google Sheets webhook (if env var set)
4. Returns success/error JSON

```typescript
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Send email notification
    const { error } = await resend.emails.send({
      from: "Vadalkar Website <onboarding@resend.dev>",
      to: "vadalkar@gmail.com",
      replyTo: email,
      subject: `New Enquiry: ${service || "General"} — ${name}`,
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }

    // Post to Google Sheets (optional)
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, message, timestamp: new Date().toISOString() }),
      }).catch(console.error);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/contact/route.ts
git commit -m "feat: add contact form API route with Resend"
```

---

### Task 4: Wire up contact form with client-side submission

**Files:**
- Modify: `src/app/contact/page.tsx`

**Step 1: Extract form into a client component**

Create `src/components/ContactForm.tsx` as a "use client" component that:
1. Manages form state with useState
2. Handles submission via fetch to `/api/contact`
3. Shows loading state on submit button
4. Shows success message after submission
5. Shows error message on failure
6. Resets form after success

**Step 2: Update contact page to use the new component**

Replace the inline `<form>` in contact/page.tsx with `<ContactForm />`.

**Step 3: Build and verify**

```bash
npm run build
```

**Step 4: Commit and push**

```bash
git add src/components/ContactForm.tsx src/app/contact/page.tsx
git commit -m "feat: wire contact form with submission handling and UX states"
git push origin main
```

---

### Task 5: Generate proper favicon from VA logo

**Files:**
- Replace: `src/app/favicon.ico`
- Modify: `src/app/layout.tsx` (add icons metadata)

**Step 1: Create favicon from the banner**

Use the original VA logo to generate a proper favicon. The banner.gif from the original site has the "VA" monogram. Extract or create a clean 32x32 and 16x16 icon.

Since we have the banner, create a simple text-based favicon using the site's primary color (#1e3a5f) with "VA" text. Use an SVG favicon for modern browsers.

Create `public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#1e3a5f"/>
  <text x="16" y="22" font-family="Inter,system-ui,sans-serif" font-size="14" font-weight="700" fill="#f59e0b" text-anchor="middle">VA</text>
</svg>
```

**Step 2: Add icon metadata to layout**

Add to metadata in layout.tsx:
```typescript
icons: {
  icon: "/favicon.svg",
},
```

**Step 3: Commit**

```bash
git add public/favicon.svg src/app/layout.tsx
git commit -m "feat: add VA-branded SVG favicon"
```

---

### Task 6: Add sitemap.xml

**Files:**
- Create: `src/app/sitemap.ts`

**Step 1: Create sitemap route**

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vadalkar-website.vercel.app";

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
  ];
}
```

**Step 2: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add sitemap.xml for SEO"
```

---

### Task 7: Add robots.txt

**Files:**
- Create: `src/app/robots.ts`

**Step 1: Create robots route**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://vadalkar-website.vercel.app/sitemap.xml",
  };
}
```

**Step 2: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat: add robots.txt for SEO"
```

---

### Task 8: Add JSON-LD structured data

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Add Organization schema to root layout**

Add a `<script type="application/ld+json">` in the `<head>` (or body) with LocalBusiness/Organization schema:

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Vadalkar And Associates",
  description: "Structural & Civil Engineering Consultants in Mumbai since 1994",
  url: "https://vadalkar-website.vercel.app",
  telephone: "+912224308872",
  email: "vadalkar@gmail.com",
  foundingDate: "1994",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-703, New Samadhan CHS Ltd, Senapati Bapat Road, Opp. Dadar Stn. (W)",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400028",
    addressCountry: "IN",
  },
  areaServed: "Mumbai, Maharashtra, India",
  serviceType: [
    "Structural Design",
    "Structural Analysis",
    "Structural Audit",
    "Repair Consulting",
    "Proof Checking",
    "STAADPro Consulting",
  ],
};
```

Add inside `<body>` before `<Header />`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

**Step 2: Commit and push**

```bash
git add src/app/layout.tsx
git commit -m "feat: add JSON-LD structured data for SEO"
git push origin main
```

---

### Task 9: Set up Resend API key on Vercel

**Manual step — guide user:**

1. Sign up at https://resend.com (free tier: 100 emails/day)
2. Get API key from dashboard
3. Add to Vercel project settings:
   - Go to https://vercel.com → vadalkar-website → Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `re_xxxxx`
4. Optionally add `GOOGLE_SHEETS_WEBHOOK_URL` later

---

### Task 10: Final build verification and push

**Step 1: Full build test**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Push all remaining changes**

```bash
git push origin main
```

**Step 3: Verify deployment at https://vadalkar-website.vercel.app**
