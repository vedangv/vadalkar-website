import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import FadeIn from "@/components/FadeIn";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers | Vadalkar And Associates",
  description:
    "Career enquiries for Vadalkar And Associates in Mumbai. There are no advertised vacancies at present; general introductions are welcome by form or email.",
  alternates: { canonical: "/careers" },
  openGraph: { url: "/careers" },
};

export default function CareersPage() {
  return (
    <>
      <section className="relative bg-slate-900 pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">
                Careers
              </span>
            </div>
          </div>
          <h1
            className="hero-animate text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8"
            style={{ animationDelay: "0.2s" }}
          >
            Career
            <br />
            <span className="text-accent-400">Enquiries</span>
          </h1>
          <p
            className="hero-animate text-xl text-slate-300 max-w-2xl leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            We are not advertising any vacancies at present. You are welcome to send a
            general introduction for future consideration.
          </p>
        </div>
      </section>

      <section className="py-28 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">
                    Get in touch
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                  Introduce yourself
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed mb-10">
                  Tell us about your discipline, experience, and the kind of work you are
                  looking for. Please do not include sensitive personal documents in the form.
                </p>
                <div className="border border-slate-700 bg-slate-800 p-7">
                  <p className="text-sm text-slate-400 mb-3">Prefer email?</p>
                  <a
                    href={`mailto:${SITE_EMAIL}?subject=Career%20Enquiry`}
                    className="text-xl font-semibold text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    {SITE_EMAIL}
                  </a>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.1}>
                <ContactForm
                  source="Careers page"
                  showService={false}
                  messageLabel="Career Introduction"
                  messagePlaceholder="Tell us about your discipline, experience, and the type of opportunity you would like to be considered for..."
                  submitLabel="Send Career Enquiry"
                />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
