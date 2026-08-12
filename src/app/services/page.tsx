import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { DEFAULT_SERVICES, serviceSlug } from "@/data/services";
import { getHomePage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Structural Engineering Services | Vadalkar And Associates",
  description:
    "Structural design, analysis, audits, repair consulting, proof checking, and STAADPro consulting for projects in Mumbai and across India.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

export default async function ServicesPage() {
  const homeData = await getHomePage();
  const services = homeData?.services?.length
    ? homeData.services
    : [...DEFAULT_SERVICES];

  return (
    <>
      <section className="relative bg-slate-900 pb-24 pt-40">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-12 bg-accent-400" />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent-400">Services</span>
          </div>
          <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Engineering Support Through Every Project Stage
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-slate-300">
            Structural and civil engineering consultancy for new construction,
            existing structures, independent reviews, and repair programmes.
          </p>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 md:grid-cols-2">
            {services.map((service, index) => (
              <FadeIn key={service.title} delay={Math.min(index * 0.08, 0.32)}>
                <article id={serviceSlug(service.title)} className="h-full scroll-mt-28 bg-white p-8 lg:p-12">
                  <span className="text-sm font-bold text-accent-500">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="mt-4 text-2xl font-bold text-slate-900">{service.title}</h2>
                  <p className="mt-4 leading-relaxed text-slate-600">{service.description}</p>
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-accent-600"
                  >
                    Discuss this service <span aria-hidden="true">→</span>
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Need help defining the right scope?</h2>
          <p className="mt-4 text-slate-400">
            Share the project stage, structure type, location, and the decision
            you need to make. We can start from there.
          </p>
          <Link href="/contact" className="mt-8 inline-flex bg-accent-400 px-8 py-4 font-semibold text-slate-900 hover:bg-accent-300">
            Start a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
