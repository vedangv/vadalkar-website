import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeIn from "@/components/FadeIn";
import { categorySlug } from "@/data/projects";
import { featuredDescriptions } from "@/data/featured-projects";
import { getProjects, getProjectBySlug } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter((p) => p.featured && p.slug);
  return featuredProjects.map((p) => ({
    category: categorySlug(p.category),
    slug: p.slug!,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Vadalkar And Associates`,
    description: featuredDescriptions[slug]?.description || `${project.title} — structural engineering by Vadalkar And Associates.`,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category: catSlug, slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const details = featuredDescriptions[slug];
  const allProjects = await getProjects();
  const relatedProjects = allProjects
    .filter((p) => p.category === project.category && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
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
            ...(project.cost && {
              estimatedCost: {
                "@type": "MonetaryAmount",
                currency: "INR",
                value: parseInt(project.cost) * 100000,
              },
            }),
          }),
        }}
      />
      {/* Hero */}
      <section className="relative bg-slate-900 pt-32 pb-0">
        {project.image ? (
          <div className="absolute inset-0 z-0">
            <Image src={project.image} alt="" fill className="object-cover opacity-20" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
            <Link
              href={`/projects/${catSlug}`}
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
