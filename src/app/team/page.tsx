import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Our Team | Vadalkar And Associates",
  description:
    "Meet the experienced engineers behind Vadalkar And Associates, led by Hemant Vadalkar, M.E. (Structures) Gold Medalist.",
};

const credentials = [
  "B.E. (Civil) - 1986, College of Engineering, Poona",
  "M.E. (Structures) - 1989, V.J.T.I., Mumbai",
  'M.E. (Structures) Gold Medal for 1989 - University of Bombay',
];

const memberships = [
  "Member of the Institution of Engineers (India)",
  "Indian Society of Structural Engineers — President",
  "Member of American Concrete Institute - India Chapter",
  "Associate (Life) Member of the Institution of Valuers",
  "Life Member of the Practicing Engineers, Architects and Town Planners Association",
  "Member of Indian Geotechnical Society, India (IGS)",
];

const career = [
  { period: "2006 - Present", role: "Principal Consultant", company: "Vadalkar & Associates", description: "Leading the firm independently, designing high-rise and complex structures including industrial plants, residential and commercial towers, mass housing, treatment plants, jetties, and marine works. Computer analysis consultants for many projects." },
  { period: "1994 - 2006", role: "Partner", company: "Vartak - Vadalkar & Associates", description: "Co-founded the consulting firm. Designed many civil engineering projects including industrial, commercial, housing, and utility projects." },
  { period: "1989 - 1994", role: "Senior Design Engineer", company: "Shirish Patel & Associates Consultants Pvt. Ltd., Mumbai", description: "Handled STAAD analysis, design, detailing, estimating, and occasional site supervision for various industrial and commercial projects." },
  { period: "1986 - 1987", role: "Site Engineer", company: "Dharamsi Morarji Chemicals Co. Ltd., Ambernath", description: "Supervised construction of 36m high Silo. Design and estimation for factory building extensions. Site engineer for new plant construction at Dhari, Gujarat." },
];

const publications = [
  { title: "Innovative Designs for Platform Covers at New Mumbai Railway Stations", journal: "Indian Concrete Journal", date: "May 1992" },
  { title: "Designing with Spread Sheets on Your Own", journal: "National Seminar, Nagpur", date: "February 1993" },
  { title: "Off the Beaten Track — New Mumbai Railway Stations", journal: "Indian Architect and Builder", date: "December 1995" },
  { title: "Structural Damage during Gujarat Earthquake — A Case Study for Ahmedabad City", journal: "Lecture at Max Muller Bhavan", date: "March 2001" },
  { title: "Various Technical Articles", journal: "Journal of Indian Society of Structural Engineers", date: "Various" },
  { title: "Articles on Civil and Structural Engineering", journal: "Loksatta (Marathi newspaper)", date: "Various" },
];

const acknowledgements = [
  { name: "Prof. V. N. Sundaram", description: "Formerly Professor, Indian Institute of Technology, Mumbai (IIT Bombay)" },
  { name: "Shri Shirish Patel", description: "Shirish Patel & Associates Consultants Pvt. Ltd., Mumbai" },
  { name: "Dr. V. V. Nori", description: "Formerly of Shirish Patel & Associates — Precast Concrete Expert" },
  { name: "Shri Kamal Hadker", description: "Formerly Director, M/s Shirish Patel & Associates Consultants Pvt. Ltd., Mumbai" },
  { name: "Shri A. B. Karnik", description: "Consulting Structural Engineer, Mumbai" },
  { name: "Shri P. H. Srinivasachar", description: "Consulting Structural Engineer, Bangalore" },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Our Team</span>
            </div>
          </div>
          <h1 className="hero-animate text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8" style={{ animationDelay: "0.2s" }}>
            Led by Experience,
            <br />
            Driven by <span className="text-accent-400">Excellence</span>
          </h1>
          <p className="hero-animate text-xl text-slate-300 max-w-2xl leading-relaxed" style={{ animationDelay: "0.3s" }}>
            Our team of qualified engineers brings decades of hands-on experience
            in structural design and analysis.
          </p>
        </div>
      </section>

      {/* Principal — Editorial layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Profile card */}
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="lg:sticky lg:top-28">
                  <div className="w-full aspect-[3/4] max-w-xs relative overflow-hidden mb-8">
                    <Image
                      src="/team/hemant-vadalkar-new.jpg"
                      alt="Hemant S. Vadalkar"
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-1">
                    Hemant S. Vadalkar
                  </h2>
                  <p className="text-accent-500 font-semibold text-sm mb-8">
                    Principal Consultant & Founder
                  </p>
                  <div className="space-y-4">
                    {credentials.map((cred, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 bg-accent-400 rounded-full mt-2 shrink-0" />
                        <span className="text-sm text-slate-600">{cred}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Career + Memberships */}
            <div className="lg:col-span-8">
              {/* Career */}
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">Career</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-12">
                  Professional Journey
                </h3>
              </FadeIn>
              <div className="space-y-0 mb-20">
                {career.map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="py-8 border-b border-slate-100 group">
                      <span className="text-sm text-accent-500 font-semibold tracking-wide">{item.period}</span>
                      <h4 className="text-2xl font-bold text-slate-900 mt-2 group-hover:text-primary-500 transition-colors">
                        {item.role}
                      </h4>
                      <p className="text-primary-500 font-medium mt-1 mb-3">{item.company}</p>
                      <p className="text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Memberships */}
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">Affiliations</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-12">
                  Professional Memberships
                </h3>
              </FadeIn>
              <div className="grid grid-cols-1 sm:grid-cols-2 [&>*]:h-full">
                {memberships.map((membership, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className="bg-white p-6 flex gap-4 items-start border border-slate-100 -mt-px -ml-px h-full">
                      <div className="w-8 h-8 bg-primary-50 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-600 leading-relaxed">{membership}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Publications */}
              <FadeIn>
                <div className="flex items-center gap-3 mb-8 mt-20">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">Research</span>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-12">
                  Publications
                </h3>
              </FadeIn>
              <div className="space-y-0">
                {publications.map((pub, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="py-6 border-b border-slate-100 group">
                      <h4 className="text-lg font-semibold text-slate-900 group-hover:text-primary-500 transition-colors">
                        {pub.title}
                      </h4>
                      <p className="text-sm text-slate-500 mt-1">
                        {pub.journal} &middot; {pub.date}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acknowledgements */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">Acknowledgements</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Our Mentors &amp; Guides
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-16">
              We are deeply grateful to these distinguished engineers and academics
              whose guidance and mentorship have shaped our practice and philosophy.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 [&>*]:h-full">
            {acknowledgements.map((person, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white p-8 border border-slate-200 -mt-px -ml-px h-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{person.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{person.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Want to join
                <br />
                our team?
              </h2>
              <div>
                <p className="text-lg text-slate-400 leading-relaxed mb-8">
                  We&apos;re always looking for talented structural engineers, design
                  engineers, and draughtsmen to join our growing team.
                </p>
                <Link
                  href="/contact"
                  className="group bg-accent-400 text-slate-900 px-8 py-4 font-semibold hover:bg-accent-300 transition-all inline-flex items-center gap-2"
                >
                  Get in Touch
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* In Memoriam */}
      <section className="py-32 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">In Memoriam</span>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="w-full aspect-[3/4] max-w-xs relative overflow-hidden">
                  <Image
                    src="/team/ab-karnik.jpg"
                    alt="Shri A. B. Karnik"
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover grayscale"
                  />
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-8">
              <FadeIn delay={0.1}>
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-2">
                  Shri A. B. Karnik
                </h2>
                <p className="text-accent-500 font-semibold text-sm mb-8">
                  Senior Consulting Structural Engineer, Mumbai
                </p>
                <div className="max-w-2xl space-y-6 text-slate-600 leading-relaxed">
                  <p>
                    Shri A. B. Karnik served as a Senior Consulting Structural Engineer
                    and a valued advisor to our firm. His deep expertise, principled approach
                    to engineering, and generous mentorship left an enduring mark on our
                    practice and on all who had the privilege of working with him.
                  </p>
                  <p>
                    We honour his memory with profound gratitude and respect.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
