import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

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
  { year: "Today", title: "30+ Years of Excellence", description: "Over 100 projects completed spanning 14+ sectors, with offices in Dadar and Vashi." },
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
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">About Us</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8">
              Three Decades of
              <br />
              <span className="text-accent-400">Structural</span> Excellence
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              From our office opposite Dadar Station to projects across India, we
              have been shaping Mumbai&apos;s skyline since 1994.
            </p>
          </FadeIn>
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
                  <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.2em]">Who We Are</span>
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
              <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.2em]">What We Do</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-16">
              Activities of the Firm
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200">
            {activities.map((activity, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white p-8 lg:p-10 flex gap-6 items-start group hover:bg-slate-50 transition-colors">
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

      {/* Timeline */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.2em]">Our Journey</span>
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
    </>
  );
}
