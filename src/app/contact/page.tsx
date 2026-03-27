import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Vadalkar And Associates",
  description:
    "Get in touch with Vadalkar And Associates for structural and civil engineering consultations. Offices in Dadar and Vashi, Mumbai.",
};

import { getContactPage, getSiteSettings } from "@/sanity/lib/queries";

export default async function ContactPage() {
  const contactData = await getContactPage();
  const settings = await getSiteSettings();

  const offices = contactData?.offices || [];
  const heroTitleLines = (contactData?.heroTitle || "Let's Build\nSomething Together").split('\n');
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Contact</span>
            </div>
          </div>
          <h1 className="hero-animate text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8" style={{ animationDelay: "0.2s" }}>
            {heroTitleLines.map((line: string, i: number) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === heroTitleLines.length - 1 ? <span className="text-accent-400">{line}</span> : line}
              </span>
            ))}
          </h1>
          <p className="hero-animate text-xl text-slate-300 max-w-2xl leading-relaxed" style={{ animationDelay: "0.3s" }}>
            {contactData?.heroDescription || "Whether you need a structural consultation, audit, or have a project in mind — we'd love to hear from you."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Form */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Enquiry</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-10">
                  Send Us a Message
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <ContactForm />
              </FadeIn>
            </div>

            {/* Office Info */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.2}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Offices</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-10">
                  Visit Us
                </h2>
              </FadeIn>

              <div className="space-y-8">
                {offices.map((office: any, i: number) => (
                  <FadeIn key={office.name} delay={0.3 + i * 0.1}>
                    <div className="border-l-2 border-slate-700 pl-8 py-2 hover:border-accent-400 transition-colors">
                      <h3 className="text-lg font-semibold text-white mb-3">{office.name}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-3">{office.address}</p>
                      {office.phone && (
                        <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="block text-sm text-slate-300 hover:text-accent-400 transition-colors mb-1">
                          Tel: {office.phone}
                        </a>
                      )}
                      {office.cell && (
                        <a href={`tel:${office.cell.replace(/\s/g, "")}`} className="block text-sm text-slate-300 hover:text-accent-400 transition-colors">
                          Cell: {office.cell}
                        </a>
                      )}
                    </div>
                  </FadeIn>
                ))}

                <FadeIn delay={0.5}>
                  <div className="bg-slate-800 p-8 mt-8 border border-slate-700">
                    <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                    <p className="text-slate-400 text-sm mb-4">For enquiries and project discussions</p>
                    <a href={`mailto:${settings?.email || "vadalkar@gmail.com"}`} className="text-accent-400 font-semibold hover:text-accent-300 transition-colors text-lg">
                      {settings?.email || "vadalkar@gmail.com"}
                    </a>
                    <p className="text-slate-500 text-sm mt-4">
                      Contact: Hemant Vadalkar / Kirty Vadalkar
                    </p>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Location</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-10">
              Find Us
            </h2>
          </FadeIn>
        </div>
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={0.1}>
            <iframe
              src="https://maps.google.com/maps?q=New+Samadhan+CHS+Senapati+Bapat+Road+Dadar+Mumbai&output=embed"
              width="100%"
              className="h-[300px] sm:h-[400px] border-0"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vadalkar And Associates Head Office — Dadar, Mumbai"
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
