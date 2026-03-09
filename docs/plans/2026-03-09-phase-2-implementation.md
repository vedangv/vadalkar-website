# Phase 2: Feature Expansion — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add WhatsApp button, downloadable brochure, project detail pages, services pages, careers page, and project statistics to the Vadalkar & Associates website.

**Architecture:** Static-first Next.js App Router. All data in TypeScript files. New dynamic routes use `generateStaticParams` for SSG. WhatsApp button is a client component in the root layout. No CMS, no database.

**Tech Stack:** Next.js 16, TypeScript, React 19, Tailwind CSS 4, Framer Motion 12

**Note:** This project has no test framework. Verification is via `npm run build` (catches type/build errors) and visual check in dev server (`npm run dev`).

---

### Task 1: WhatsApp Floating Button

**Files:**
- Create: `src/components/WhatsAppButton.tsx`
- Modify: `src/app/layout.tsx:78` (add component before ScrollToTop)

**Step 1: Create the WhatsApp button component**

```tsx
// src/components/WhatsAppButton.tsx
"use client";

import { useState, useEffect } from "react";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed this session
    if (sessionStorage.getItem("wa-dismissed")) {
      setDismissed(true);
      return;
    }
    // Show after 2s delay
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      {/* Dismiss button */}
      <button
        onClick={() => {
          setDismissed(true);
          sessionStorage.setItem("wa-dismissed", "1");
        }}
        className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs hover:bg-slate-700 transition-colors"
        aria-label="Dismiss WhatsApp button"
      >
        ✕
      </button>
      {/* WhatsApp link */}
      <a
        href="https://wa.me/919322532578?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20structural%20engineering%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#25D366] text-white pl-5 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        aria-label="Contact us on WhatsApp"
      >
        <span className="text-sm font-semibold hidden sm:inline">Chat with us</span>
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
```

**Step 2: Add to layout**

In `src/app/layout.tsx`, add import and component:
- Add: `import WhatsAppButton from "@/components/WhatsAppButton";`
- Insert `<WhatsAppButton />` right before `<ScrollToTop />`

**Step 3: Verify**

Run: `npm run build`
Expected: Build succeeds with no errors.

Run: `npm run dev` — check bottom-right corner on any page. WhatsApp button should appear after 2s. Dismiss should hide it. Clicking opens WhatsApp.

**Step 4: Commit**

```bash
git add src/components/WhatsAppButton.tsx src/app/layout.tsx
git commit -m "feat: add WhatsApp floating contact button"
```

---

### Task 2: Downloadable Company Brochure

**Files:**
- Create: `public/brochure/vadalkar-associates-brochure.pdf` (copy from `docs/`)
- Modify: `src/app/page.tsx` (add download CTA in the existing CTA section)

**Step 1: Copy brochure to public directory**

```bash
mkdir -p public/brochure
cp "docs/1321- Urban analysis-VA Intro.pdf" public/brochure/vadalkar-associates-brochure.pdf
```

**Step 2: Add brochure download button to the CTA section on home page**

In `src/app/page.tsx`, find the CTA section (the dark section near the bottom with "Ready to Start Your Next Project?"). Add a secondary download button next to the existing "Get in Touch" link:

```tsx
<a
  href="/brochure/vadalkar-associates-brochure.pdf"
  download
  className="group border-2 border-slate-600 text-white px-8 py-4 font-semibold hover:border-accent-400 hover:text-accent-400 transition-all inline-flex items-center gap-2"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  Download Brochure
</a>
```

**Step 3: Verify**

Run: `npm run build`
Run: `npm run dev` — scroll to CTA section on home page. "Download Brochure" button should trigger PDF download.

**Step 4: Commit**

```bash
git add public/brochure/ src/app/page.tsx
git commit -m "feat: add downloadable company brochure"
```

---

### Task 3: Extend Project Data Model for Detail Pages

**Files:**
- Modify: `src/data/projects.ts:1-9` (extend Project type)
- Create: `src/data/featured-projects.ts` (featured project details)

**Step 1: Extend the Project type**

In `src/data/projects.ts`, update the type:

```ts
export type Project = {
  title: string;
  category: string;
  client: string;
  architect?: string;
  year: string;
  cost?: string;
  image?: string;
  slug?: string;
  featured?: boolean;
  description?: string;
  gallery?: string[];
};
```

**Step 2: Add slug and featured flag to ~10 projects in projects.ts**

Find each featured project in the array and add `slug` and `featured: true`. The slugs:

- `"nagpur-transmission-tower"` — Transmission Line Tower Testing Station at Nagpur
- `"ghansoli-cidco-housing"` — Mass Housing Project for CIDCO at Sector-7, Ghansoli
- `"plastindia-exhibition"` — Theme Pavilion for Plast India Exhibition
- `"iit-bombay-hostel-18"` — Hostel 18 Building for IIT Bombay
- `"agasan-towers"` — G+16 Towers at Agasan, Thane
- `"nashik-indoor-stadium"` — Indoor Stadium at Nashik
- `"tuticorin-piling-gantry"` — Piling Gantry at Tuticorin
- `"taloja-midc-shed"` — Industrial Shed at Plot J37, Taloja MIDC
- `"videocon-towers"` — Videocon Towers S+25 at Kandivli
- `"girgaon-tower"` — Residential 22 Storey Tower at Girgaon
- `"bsel-infotech"` — BSEL Infotech Park at Vashi

**Step 3: Create featured-projects.ts with descriptions**

```ts
// src/data/featured-projects.ts
export const featuredDescriptions: Record<string, { description: string; highlights?: string[] }> = {
  "nagpur-transmission-tower": {
    description: "Design of a full-scale testing facility for 100m tall transmission line towers at Nagpur for KEC International. This unique facility enables structural testing of complete tower assemblies under simulated loading conditions, ensuring reliability for India's power transmission infrastructure.",
    highlights: ["100m tall testing facility", "Full-scale structural testing", "Power transmission infrastructure"],
  },
  "iit-bombay-hostel-18": {
    description: "Structural design of Hostel 18 at IIT Bombay, accommodating 1100 students. A multi-storey residential building designed to meet the demanding requirements of an institutional campus, with earthquake-resistant design and modern amenities.",
    highlights: ["1100 student capacity", "IIT Bombay campus", "Earthquake-resistant design"],
  },
  "ghansoli-cidco-housing": {
    description: "Structural design of a mass housing project at Sector-7, Ghansoli, Navi Mumbai for CIDCO, comprising 2400 tenement units. One of the largest mass housing projects undertaken by the firm, designed for Simplex Infrastructure with architecture by Hafeez Contractor.",
    highlights: ["2400 tenement units", "Mass housing for CIDCO", "Architecture by Hafeez Contractor"],
  },
  "tuticorin-piling-gantry": {
    description: "Design of a piling gantry for marine jetty construction at Tuticorin port for ITD Cementation. The gantry enables pile driving operations in open sea conditions, requiring careful analysis of wave loads, wind loads, and dynamic effects during pile driving.",
    highlights: ["Marine construction", "Open sea pile driving", "Dynamic load analysis"],
  },
  "agasan-towers": {
    description: "Structural design of twin 16-storey residential towers at Agasan, Thane for Anantnath Developers. The towers feature a modern architectural design by Sameer Lotke with optimized structural systems for the Thane region's seismic requirements.",
    highlights: ["Twin 16-storey towers", "Modern residential design", "Seismic-resistant structure"],
  },
  "nashik-indoor-stadium": {
    description: "Design of a large-span indoor stadium at Nashik for the Nashik Municipal Corporation. The stadium features a clear-span roof structure enabling unobstructed views for spectators, designed for multi-sport use.",
    highlights: ["Large clear-span roof", "Multi-sport facility", "Municipal infrastructure"],
  },
  "plastindia-exhibition": {
    description: "Design of the theme pavilion structure for the Plast India exhibition at Pragati Maidan, New Delhi. A unique tensile fabric structure designed to create a dramatic exhibition space, showcasing innovative structural engineering for temporary structures.",
    highlights: ["Tensile fabric structure", "Exhibition pavilion", "Innovative structural form"],
  },
  "taloja-midc-shed": {
    description: "Design of an industrial shed at Plot J37, Taloja MIDC. A steel-framed industrial structure designed for manufacturing operations with clear-span portal frames, crane gantry provisions, and efficient column-free interior space.",
    highlights: ["Steel portal frame", "Clear-span design", "Industrial manufacturing facility"],
  },
  "videocon-towers": {
    description: "Structural design of two S+25 storey residential towers at Kandivli (E), Mumbai for Videocon Properties. One of the firm's earliest landmark high-rise projects, designed with architecture by Hafeez Contractor. A defining project in the firm's portfolio.",
    highlights: ["Twin 25-storey towers", "Landmark high-rise", "Architecture by Hafeez Contractor"],
  },
  "girgaon-tower": {
    description: "Structural design of a 22-storey residential tower at Girgaon, Mumbai for Samir Natu Developers. A slender high-rise in the dense urban fabric of South Mumbai, requiring careful analysis for wind loads and foundation design on challenging soil conditions.",
    highlights: ["22-storey slender tower", "South Mumbai location", "Challenging foundation conditions"],
  },
  "bsel-infotech": {
    description: "Structural design of the BSEL Infotech Park at Vashi, Navi Mumbai — a large commercial IT park with modern office spaces. Designed with architecture by Nitin Killawala, the project features long-span floor plates suitable for flexible office layouts.",
    highlights: ["IT Park development", "Long-span floor plates", "Commercial office complex"],
  },
};
```

**Step 4: Add a helper to generate category slugs**

Add to bottom of `src/data/projects.ts`:

```ts
export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function getCategoryDescription(category: string): string {
  const descriptions: Record<string, string> = {
    "Residential": "High-rise towers, mass housing, bungalows, and staff quarters across Mumbai and beyond.",
    "Industrial": "Factory buildings, industrial sheds, chemical plants, and manufacturing facilities.",
    "Commercial": "Office complexes, IT parks, showrooms, and commercial developments.",
    "Infrastructure": "Railway stations, bridges, jetties, and public infrastructure projects.",
    "Educational": "Schools, college buildings, and institutional campus structures.",
    "Repair": "Structural repair, rehabilitation, and restoration of aging buildings.",
    "Structural Audit": "Comprehensive structural safety audits for residential and commercial buildings.",
    "Computer Aided Analysis": "Advanced STAADPro analysis, finite element analysis, and computational design.",
    "Hospitals": "Healthcare facility design including hospitals and medical centres.",
    "Hotels": "Hospitality structures including hotels and resorts.",
    "Sports Complex": "Indoor stadiums, sports facilities, and recreational structures.",
    "Communication Towers": "Telecom towers, antenna structures, and communication infrastructure.",
    "Shuttering Design": "Formwork and shuttering design for high-rise construction.",
    "Special Projects": "Marine works, exhibition structures, transmission towers, and unique engineering challenges.",
    "Proof Checking": "Independent verification and peer review of structural designs.",
    "SPA Tenure": "Projects completed during tenure at Shirish Patel & Associates.",
  };
  return descriptions[category] || `Projects in the ${category} category.`;
}
```

**Step 5: Verify**

Run: `npm run build`
Expected: Build succeeds.

**Step 6: Commit**

```bash
git add src/data/projects.ts src/data/featured-projects.ts
git commit -m "feat: extend project data model with slugs and featured descriptions"
```

---

### Task 4: Category Landing Pages

**Files:**
- Create: `src/app/projects/[category]/page.tsx`

**Step 1: Create the category landing page**

```tsx
// src/app/projects/[category]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { projects, categories, categorySlug, getCategoryDescription } from "@/data/projects";

const categoryList = categories.filter((c) => c !== "All");

export function generateStaticParams() {
  return categoryList.map((cat) => ({ category: categorySlug(cat) }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = categoryList.find((c) => categorySlug(c) === params.category);
  if (!category) return {};
  return {
    title: `${category} Projects | Vadalkar And Associates`,
    description: getCategoryDescription(category),
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categoryList.find((c) => categorySlug(c) === params.category);
  if (!category) notFound();

  const categoryProjects = projects.filter((p) => p.category === category);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
            <Link href="/projects" className="inline-flex items-center gap-2 text-accent-400 text-sm font-medium mb-8 hover:text-accent-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Projects
            </Link>
          </div>
          <h1 className="hero-animate text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8" style={{ animationDelay: "0.2s" }}>
            {category}
          </h1>
          <p className="hero-animate text-xl text-slate-300 max-w-2xl leading-relaxed" style={{ animationDelay: "0.3s" }}>
            {getCategoryDescription(category)}
          </p>
          <p className="hero-animate text-accent-400 font-semibold mt-4" style={{ animationDelay: "0.4s" }}>
            {categoryProjects.length} project{categoryProjects.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProjects.map((project, i) => (
              <FadeIn key={i} delay={Math.min(i * 0.05, 0.3)}>
                {project.slug && project.featured ? (
                  <Link href={`/projects/${categorySlug(category)}/${project.slug}`} className="block group">
                    <ProjectCard project={project} />
                  </Link>
                ) : (
                  <ProjectCard project={project} />
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="bg-slate-900 overflow-hidden border border-slate-800 hover:border-accent-400/50 transition-all duration-300 h-full">
      <div className="aspect-[4/3] relative bg-gradient-to-br from-primary-500/90 to-slate-700 flex items-center justify-center overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" />
          </svg>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 z-[1]" />
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 uppercase tracking-tight">{project.year}</span>
        </div>
        {project.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-accent-400 text-slate-900 text-[10px] font-black px-3 py-1 uppercase tracking-tight">Featured</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h2 className="text-base font-semibold text-white uppercase tracking-tight mb-2 leading-snug">{project.title}</h2>
        <p className="text-sm text-slate-400 mb-1">Client: {project.client}</p>
        {project.architect && <p className="text-sm text-slate-400">Architect: {project.architect}</p>}
        {project.cost && (
          <div className="pt-3 mt-3 border-t border-slate-800">
            <span className="text-accent-400 font-black text-sm">Rs. {project.cost} Lakhs</span>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds, category pages appear in routes (e.g., `/projects/residential`, `/projects/industrial`).

**Step 3: Commit**

```bash
git add src/app/projects/\[category\]/page.tsx
git commit -m "feat: add category landing pages for projects"
```

---

### Task 5: Featured Project Detail Pages

**Files:**
- Create: `src/app/projects/[category]/[slug]/page.tsx`

**Step 1: Create the featured project detail page**

```tsx
// src/app/projects/[category]/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { projects, categories, categorySlug } from "@/data/projects";
import { featuredDescriptions } from "@/data/featured-projects";

const featuredProjects = projects.filter((p) => p.featured && p.slug);

export function generateStaticParams() {
  return featuredProjects.map((p) => ({
    category: categorySlug(p.category),
    slug: p.slug!,
  }));
}

export function generateMetadata({ params }: { params: { category: string; slug: string } }): Metadata {
  const project = featuredProjects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Vadalkar And Associates`,
    description: featuredDescriptions[params.slug]?.description || `${project.title} — structural engineering by Vadalkar And Associates.`,
  };
}

export default function ProjectDetailPage({ params }: { params: { category: string; slug: string } }) {
  const project = featuredProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const details = featuredDescriptions[params.slug];
  const relatedProjects = projects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero with image */}
      <section className="relative bg-slate-900 pt-32 pb-0">
        {project.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-20"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
          </div>
        )}
        {!project.image && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
            <Link
              href={`/projects/${categorySlug(project.category)}`}
              className="inline-flex items-center gap-2 text-accent-400 text-sm font-medium mb-8 hover:text-accent-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {project.category}
            </Link>
          </div>
          <h1 className="hero-animate text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6" style={{ animationDelay: "0.2s" }}>
            {project.title}
          </h1>
          <div className="hero-animate flex flex-wrap gap-4 text-sm" style={{ animationDelay: "0.3s" }}>
            <span className="bg-accent-400 text-slate-900 px-4 py-1.5 font-semibold">{project.category}</span>
            <span className="bg-slate-800 text-white px-4 py-1.5 font-semibold">{project.year}</span>
          </div>
        </div>
      </section>

      {/* Main image */}
      {project.image && (
        <section className="bg-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="aspect-[16/9] relative overflow-hidden border border-slate-700">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Description */}
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Overview</span>
                </div>
                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                  {details?.description || `Structural engineering design and consultancy for ${project.title} by Vadalkar And Associates.`}
                </p>
                {details?.highlights && (
                  <div className="space-y-3">
                    {details.highlights.map((h, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2.5 shrink-0" />
                        <span className="text-slate-400">{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </FadeIn>
            </div>

            {/* Specs sidebar */}
            <div>
              <FadeIn delay={0.1}>
                <div className="bg-slate-800 border border-slate-700 p-8 space-y-6">
                  <h3 className="text-lg font-bold text-white mb-6">Project Details</h3>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Client</p>
                    <p className="text-white font-medium">{project.client}</p>
                  </div>
                  {project.architect && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Architect</p>
                      <p className="text-white font-medium">{project.architect}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Year</p>
                    <p className="text-white font-medium">{project.year}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Category</p>
                    <p className="text-white font-medium">{project.category}</p>
                  </div>
                  {project.cost && (
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Project Cost</p>
                      <p className="text-accent-400 font-bold text-lg">Rs. {project.cost} Lakhs</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-slate-950 border-t border-slate-800">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-accent-400" />
                <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">More {project.category}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-12">Related Projects</h2>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProjects.map((rp, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-slate-900 border border-slate-800 p-5">
                    <span className="text-accent-400 text-xs font-bold">{rp.year}</span>
                    <h3 className="text-white font-semibold mt-2 leading-snug">{rp.title}</h3>
                    <p className="text-slate-500 text-sm mt-2">{rp.client}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-4">Have a Similar Project?</h2>
            <p className="text-slate-400 mb-8">Get in touch for a structural engineering consultation.</p>
            <Link
              href="/contact"
              className="bg-accent-400 text-slate-900 px-8 py-4 font-semibold hover:bg-accent-300 transition-all inline-flex items-center gap-2"
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
```

**Step 2: Verify**

Run: `npm run build`
Expected: Build succeeds, featured project pages appear in routes.

**Step 3: Commit**

```bash
git add src/app/projects/\[category\]/\[slug\]/page.tsx
git commit -m "feat: add featured project detail pages"
```

---

### Task 6: Link Category Pages from Main Projects Page

**Files:**
- Modify: `src/app/projects/ProjectsGrid.tsx` (add category links, make featured cards clickable)

**Step 1: Update ProjectsGrid to link categories and featured projects**

Add imports at top:
```tsx
import Link from "next/link";
import { projects, categories, categorySlug } from "@/data/projects";
```
(Replace the existing import from `@/data/projects`.)

Make category tab buttons link to category pages — add a "View all →" link next to each category filter when selected (not "All").

Make featured project cards wrap in a `<Link>` to their detail page.

In the project card rendering, check `project.featured && project.slug` — if true, wrap the card in `<Link href={/projects/${categorySlug(project.category)}/${project.slug}}>`.

**Step 2: Verify**

Run: `npm run build`
Run: `npm run dev` — on `/projects`, click a category tab, verify "View all" link goes to category page. Click a featured project card, verify it navigates to detail page.

**Step 3: Commit**

```bash
git add src/app/projects/ProjectsGrid.tsx
git commit -m "feat: link projects grid to category and detail pages"
```

---

### Task 7: Brochure Download on About Page

**Files:**
- Modify: `src/app/about/page.tsx` (add download CTA)

**Step 1: Add brochure download**

Find the appropriate section in about page (near the timeline or CTA area) and add:

```tsx
<a
  href="/brochure/vadalkar-associates-brochure.pdf"
  download
  className="group border-2 border-slate-200 text-slate-900 px-8 py-4 font-semibold hover:border-accent-400 hover:text-accent-500 transition-all inline-flex items-center gap-2"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  Download Company Brochure
</a>
```

**Step 2: Verify**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add brochure download link to about page"
```

---

### Task 8: Careers Page

**Files:**
- Create: `src/app/careers/page.tsx`
- Modify: `src/components/Footer.tsx` (add Careers link)

**Step 1: Create careers page**

Create `src/app/careers/page.tsx` with:
- Hero section (same pattern as other pages)
- Why work with us section (2-3 bullet points about the firm culture)
- Current openings: Structural Engineer, Design Engineer / Draughtsman, Site Engineer
- Each opening: title, brief description, requirements
- CTA: "Apply by emailing your resume to vadalkar@gmail.com"
- Use `hero-animate` for above-the-fold, `FadeIn` for below-the-fold

**Step 2: Add to footer navigation**

In `src/components/Footer.tsx`, find the navigation links section and add "Careers" link pointing to `/careers`.

**Step 3: Verify**

Run: `npm run build`
Expected: `/careers` route appears.

**Step 4: Commit**

```bash
git add src/app/careers/page.tsx src/components/Footer.tsx
git commit -m "feat: add careers page with openings and apply instructions"
```

---

### Task 9: Project Statistics Section on About Page

**Files:**
- Create: `src/components/ProjectStats.tsx`
- Modify: `src/app/about/page.tsx` (add stats section)

**Step 1: Create animated stats component**

```tsx
// src/components/ProjectStats.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { projects, categories } from "@/data/projects";

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

export default function ProjectStats() {
  // Compute stats from data
  const catCounts = categories
    .filter((c) => c !== "All")
    .map((c) => ({ name: c, count: projects.filter((p) => p.category === c).length }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  const decades = [
    { label: "1990s", count: projects.filter((p) => p.year >= "1993" && p.year <= "1999").length },
    { label: "2000s", count: projects.filter((p) => p.year >= "2000" && p.year <= "2009").length },
    { label: "2010s", count: projects.filter((p) => p.year >= "2010" && p.year <= "2019").length },
    { label: "2020s", count: projects.filter((p) => p.year >= "2020" && p.year <= "2029").length },
  ];

  const maxCatCount = Math.max(...catCounts.map((c) => c.count));

  const totalCounter = useCountUp(projects.length);
  const catCounter = useCountUp(catCounts.length);

  return (
    <div ref={totalCounter.ref} className="space-y-16">
      {/* Summary counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <p className="text-5xl font-bold text-accent-400">{totalCounter.count}+</p>
          <p className="text-slate-500 mt-2">Total Projects</p>
        </div>
        <div>
          <p className="text-5xl font-bold text-accent-400">{catCounter.count}</p>
          <p className="text-slate-500 mt-2">Sectors</p>
        </div>
      </div>

      {/* By category — horizontal bars */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-8">Projects by Sector</h3>
        <div className="space-y-3">
          {catCounts.map((cat) => (
            <div key={cat.name} className="flex items-center gap-4">
              <span className="text-sm text-slate-600 w-44 shrink-0 text-right">{cat.name}</span>
              <div className="flex-1 h-6 bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-1000"
                  style={{ width: `${(cat.count / maxCatCount) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-slate-900 w-8">{cat.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* By decade — simple blocks */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-8">Projects by Decade</h3>
        <div className="grid grid-cols-4 gap-4">
          {decades.map((d) => (
            <div key={d.label} className="bg-slate-50 border border-slate-200 p-6 text-center">
              <p className="text-3xl font-bold text-primary-500">{d.count}</p>
              <p className="text-sm text-slate-500 mt-1">{d.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Add to about page**

In `src/app/about/page.tsx`, import `ProjectStats` and add a new section:

```tsx
import ProjectStats from "@/components/ProjectStats";
```

Add a section after the timeline:
```tsx
<section className="py-32 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <FadeIn>
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-12 bg-accent-400" />
        <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">By the Numbers</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-16">
        Project Statistics
      </h2>
    </FadeIn>
    <ProjectStats />
  </div>
</section>
```

**Step 3: Verify**

Run: `npm run build`
Run: `npm run dev` — navigate to `/about`, scroll to stats section. Counters should animate on scroll. Bar chart should display correctly.

**Step 4: Commit**

```bash
git add src/components/ProjectStats.tsx src/app/about/page.tsx
git commit -m "feat: add animated project statistics to about page"
```

---

## Execution Summary

| Task | Feature | Effort |
|------|---------|--------|
| 1 | WhatsApp floating button | ~15 min |
| 2 | Brochure download (home page) | ~10 min |
| 3 | Extend project data model | ~15 min |
| 4 | Category landing pages | ~20 min |
| 5 | Featured project detail pages | ~20 min |
| 6 | Link projects grid to new pages | ~10 min |
| 7 | Brochure download (about page) | ~5 min |
| 8 | Careers page | ~20 min |
| 9 | Project statistics on about page | ~20 min |

**Total estimated: ~2-3 hours**

Services individual pages (Task 10) intentionally deferred — they need content writing and can be added after dad provides more material.
