import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import ProjectStats from "@/components/ProjectStats";

export const metadata: Metadata = {
  title: "About Us | Vadalkar And Associates",
  description:
    "Learn about Vadalkar And Associates - a leading civil and structural engineering consultancy in Mumbai since 1994.",
};

const milestones = [
  { year: "1994", title: "Founded as Vartak-Vadalkar & Associates", description: "Established the consulting practice as a partnership firm in Mumbai." },
  { year: "1996", title: "Major High-Rise Projects", description: "Took on landmark projects including Videocon Towers (S+25, two towers) in Kandivali." },
  { year: "2000s", title: "Expanded Portfolio", description: "Grew into industrial, commercial, infrastructure, and institutional projects across Maharashtra." },
  { year: "2006", title: "Rebranded as Vadalkar & Associates", description: "Continued independently under the leadership of Hemant Vadalkar, expanding the firm's capabilities." },
  { year: "Today", title: "35+ Years of Excellence", description: "Over 200 projects completed spanning 14+ sectors, with offices in Dadar and Vashi." },
];

const activities = [
  "Designing, detailing, estimating, and occasional site supervision for industrial, commercial, residential, and utility projects",
  "Structural audit and assessment of existing buildings",
  "Repair and rehabilitation consulting for aging structures",
  "STAADPro software consulting, training, and technical support",
  "Proof checking and independent design verification",
  "Tender scrutiny and contractor selection recommendations",
  "Shuttering design and construction supervision",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">About Us</span>
            </div>
          </div>
          <h1 className="hero-animate text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8" style={{ animationDelay: "0.2s" }}>
            Three Decades of
            <br />
            <span className="text-accent-400">Structural</span> Excellence
          </h1>
          <p className="hero-animate text-xl text-slate-300 max-w-2xl leading-relaxed" style={{ animationDelay: "0.3s" }}>
            From our office opposite Dadar Station to projects across India, we
            have been shaping Mumbai&apos;s skyline since 1994.
          </p>
        </div>
      </section>

      {/* Company Intro — Editorial 2-column */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">Who We Are</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-8">
                  A Legacy of
                  <br />
                  Engineering
                  <br />
                  Excellence
                </h2>
              </FadeIn>
            </div>
            <div className="lg:col-span-7">
              <FadeIn delay={0.2}>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-900">Vadalkar And Associates</strong> is a civil and structural consultancy conveniently located opposite Dadar Station (West), Mumbai. From 1994 till March 2006, the firm operated as &ldquo;Vartak &ndash; Vadalkar And Associates&rdquo; before continuing independently.
                  </p>
                  <p>
                    We have a well-experienced design team of qualified engineers and very senior structural engineers as advisers. We have successfully handled hundreds of projects to the entire satisfaction of our clients.
                  </p>
                  <p>
                    Beyond structural consulting, we provide training and technical support for STAADPro software package for many consultancy firms in Mumbai and work as software consultants to structural consultancy firms.
                  </p>
                  <a
                    href="/brochure.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-primary-500 font-semibold hover:text-accent-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    View Our Corporate Brochure
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Activities — Numbered list */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">What We Do</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-16">
              Activities of the Firm
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 [&>*]:h-full">
            {activities.map((activity, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white p-8 lg:p-10 flex gap-6 items-start group hover:bg-slate-50 transition-colors border border-slate-200 -mt-px -ml-px h-full">
                  <span className="text-4xl font-bold text-slate-100 group-hover:text-accent-200 transition-colors shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-slate-600 leading-relaxed pt-2">{activity}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities & Resources */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">Infrastructure</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-16">
              Facilities &amp; Resources
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Office */}
            <FadeIn delay={0}>
              <div className="p-8 rounded-2xl border border-slate-100 hover:border-accent-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors">
                  <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Office Space</h3>
                <p className="text-slate-500 leading-relaxed">Well-furnished office at Dadar, conveniently located opposite Dadar Station (W).</p>
              </div>
            </FadeIn>

            {/* Computing */}
            <FadeIn delay={0.08}>
              <div className="p-8 rounded-2xl border border-slate-100 hover:border-accent-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors">
                  <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Computing Infrastructure</h3>
                <p className="text-slate-500 leading-relaxed">10 workstations equipped with STAADPro and other structural analysis software.</p>
              </div>
            </FadeIn>

            {/* Software */}
            <FadeIn delay={0.16}>
              <div className="p-8 rounded-2xl border border-slate-100 hover:border-accent-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors">
                  <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Analysis Software</h3>
                <p className="text-slate-500 leading-relaxed">STAADPro, ETABS, and other industry-standard structural analysis packages.</p>
              </div>
            </FadeIn>

            {/* Equipment */}
            <FadeIn delay={0.24}>
              <div className="p-8 rounded-2xl border border-slate-100 hover:border-accent-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors">
                  <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M9.75 8.25h.008v.008H9.75V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Equipment</h3>
                <p className="text-slate-500 leading-relaxed">A1 size plotter and printers for producing large-format drawings and documentation.</p>
              </div>
            </FadeIn>

            {/* Team */}
            <FadeIn delay={0.32}>
              <div className="p-8 rounded-2xl border border-slate-100 hover:border-accent-200 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors">
                  <svg className="w-6 h-6 text-accent-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Expert Team</h3>
                <p className="text-slate-500 leading-relaxed">Well-experienced design team of qualified engineers with senior structural engineers as advisers.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">Our Journey</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-16">
              Key Milestones
            </h2>
          </FadeIn>
          <div className="space-y-0">
            {milestones.map((milestone, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="grid grid-cols-12 gap-6 py-8 border-b border-slate-100 group">
                  <div className="col-span-3 sm:col-span-2">
                    <span className="text-2xl font-bold text-accent-500">{milestone.year}</span>
                  </div>
                  <div className="col-span-9 sm:col-span-10">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-primary-500 transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Project Statistics */}
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
    </>
  );
}
