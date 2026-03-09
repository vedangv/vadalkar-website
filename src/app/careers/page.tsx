import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Careers | Vadalkar And Associates",
  description:
    "Join our team of structural engineers. Current openings for structural engineers, design engineers, and site engineers in Mumbai.",
};

const cultureCards = [
  {
    title: "35+ Years of Expertise",
    description:
      "Learn from one of Mumbai's most experienced structural engineers with a career spanning residential towers, industrial plants, and marine structures.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Diverse Project Portfolio",
    description:
      "Work across residential, industrial, marine, and infrastructure projects. No two assignments are the same — every project brings new challenges.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5M3.75 3v18m16.5-18v18M5.25 3h13.5M5.25 21h13.5M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    title: "Professional Growth",
    description:
      "Gain hands-on experience in design, analysis, and site supervision. Develop your skills under the guidance of seasoned professionals.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    title: "Industry Connections",
    description:
      "Collaborate with top architects and clients across India. Build a professional network spanning the construction and engineering industry.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const openings = [
  {
    title: "Structural Engineer",
    type: "Full-time",
    responsibilities: [
      "RCC design and detailing for residential, commercial, and industrial structures",
      "Steel structure design and connection detailing",
      "Structural analysis using STAADPro and equivalent software",
      "Coordination with architects and other consultants",
    ],
    qualifications: [
      "B.E. / M.E. in Civil or Structural Engineering",
      "2+ years of experience in structural design",
      "Proficiency in STAADPro, AutoCAD, and MS Office",
      "Strong fundamentals in RCC and steel design codes (IS 456, IS 800)",
    ],
  },
  {
    title: "Design Engineer / Draughtsman",
    type: "Full-time",
    responsibilities: [
      "Preparation of structural drawings in AutoCAD",
      "Detailing of RCC and steel structures",
      "Bar bending schedules and quantity estimation",
      "Coordination with design team for drawing revisions",
    ],
    qualifications: [
      "Diploma or B.E. in Civil Engineering",
      "Proficiency in AutoCAD (2D drafting and detailing)",
      "Knowledge of structural drawing conventions and IS codes",
      "Attention to detail and ability to work with deadlines",
    ],
  },
  {
    title: "Site Engineer",
    type: "Full-time",
    responsibilities: [
      "Construction supervision and quality control on site",
      "Ensuring structural work conforms to approved drawings and specifications",
      "Liaison with contractors, architects, and project managers",
      "Progress monitoring and site documentation",
    ],
    qualifications: [
      "B.E. in Civil Engineering",
      "Prior site experience preferred",
      "Knowledge of construction methods, materials, and safety practices",
      "Good communication and reporting skills",
    ],
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Careers</span>
            </div>
          </div>
          <h1 className="hero-animate text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8" style={{ animationDelay: "0.2s" }}>
            Build Your Career
            <br />
            With <span className="text-accent-400">Us</span>
          </h1>
          <p className="hero-animate text-xl text-slate-300 max-w-2xl leading-relaxed" style={{ animationDelay: "0.3s" }}>
            Join a team that has been shaping Mumbai&apos;s skyline for over three decades.
            We&apos;re looking for talented engineers ready to take on meaningful work.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">Why Join Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Why Work With Us
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-16">
              At Vadalkar &amp; Associates, you won&apos;t just be drafting plans — you&apos;ll
              be solving real engineering challenges alongside some of the best in the field.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 [&>*]:h-full">
            {cultureCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1}>
                <div className="bg-white p-8 border border-slate-200 -mt-px -ml-px h-full group hover:bg-slate-50 transition-colors">
                  <div className="w-12 h-12 bg-primary-50 flex items-center justify-center mb-6 text-primary-500">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-500 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">Openings</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Current Openings
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-16">
              We are looking for motivated professionals to join our Mumbai office.
              Explore the roles below and apply if you see a fit.
            </p>
          </FadeIn>
          <div className="space-y-6">
            {openings.map((role, i) => (
              <FadeIn key={role.title} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 p-8 sm:p-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">{role.title}</h3>
                    <span className="inline-flex items-center bg-primary-50 text-primary-600 text-sm font-semibold px-4 py-1.5 w-fit">
                      {role.type}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                        Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {role.responsibilities.map((item, j) => (
                          <li key={j} className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 shrink-0" />
                            <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                        Qualifications
                      </h4>
                      <ul className="space-y-3">
                        {role.qualifications.map((item, j) => (
                          <li key={j} className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 shrink-0" />
                            <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply CTA */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Apply Now</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Ready to
                  <br />
                  get started?
                </h2>
              </div>
              <div>
                <p className="text-lg text-slate-400 leading-relaxed mb-4">
                  Send your resume and cover letter to:
                </p>
                <a
                  href="mailto:vadalkar@gmail.com"
                  className="text-accent-400 font-semibold text-2xl hover:text-accent-300 transition-colors"
                >
                  vadalkar@gmail.com
                </a>
                <p className="text-slate-500 text-sm mt-4 mb-8">
                  Contact: Hemant Vadalkar / Kirty Vadalkar
                </p>
                <Link
                  href="/contact"
                  className="group bg-accent-400 text-slate-900 px-8 py-4 font-semibold hover:bg-accent-300 transition-all inline-flex items-center gap-2"
                >
                  Contact Us
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
