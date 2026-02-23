import type { Metadata } from "next";
import Link from "next/link";

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
  "Indian Society of Structural Engineers - Advisory Trustee",
  "Member of American Concrete Institute - India Chapter",
  "Associate (Life) Member of the Institution of Valuers",
  "Life Member of the Practicing Engineers, Architects and Town Planners Association",
];

const career = [
  {
    period: "2006 - Present",
    role: "Principal Consultant",
    company: "Vadalkar & Associates",
    description:
      "Leading the firm independently, managing all structural engineering projects and expanding into new sectors.",
  },
  {
    period: "1994 - 2006",
    role: "Partner",
    company: "Vartak - Vadalkar & Associates",
    description:
      "Co-founded the consulting firm. Designed many civil engineering projects including industrial, commercial, housing, and utility projects.",
  },
  {
    period: "1989 - 1994",
    role: "Senior Design Engineer",
    company: "Shirish Patel & Associates Consultants Pvt. Ltd., Mumbai",
    description:
      "Handled STAAD analysis, design, detailing, estimating, and occasional site supervision for various industrial and commercial projects.",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-primary-500 to-slate-800 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Our Team
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Led by Experience,
            <br />
            Driven by Excellence
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Our team of qualified engineers brings decades of hands-on experience
            in structural design and analysis.
          </p>
        </div>
      </section>

      {/* Principal */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Photo / Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 rounded-2xl p-8 sticky top-28">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-slate-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">HV</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 text-center mb-1">
                  Hemant S. Vadalkar
                </h2>
                <p className="text-accent-500 font-semibold text-center text-sm mb-6">
                  Principal Consultant & Founder
                </p>

                <div className="space-y-3">
                  {credentials.map((cred, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <svg
                        className="w-4 h-4 text-accent-500 shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                        />
                      </svg>
                      <span className="text-sm text-slate-600">{cred}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              {/* Career */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Professional Career
                </h3>
                <div className="space-y-6">
                  {career.map((item, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-primary-200 pl-6 py-2"
                    >
                      <p className="text-sm text-accent-500 font-semibold mb-1">
                        {item.period}
                      </p>
                      <h4 className="text-lg font-semibold text-slate-900">
                        {item.role}
                      </h4>
                      <p className="text-sm text-primary-500 font-medium mb-2">
                        {item.company}
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memberships */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  Professional Memberships
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {memberships.map((membership, i) => (
                    <div
                      key={i}
                      className="bg-slate-50 rounded-xl p-4 flex gap-3 items-start"
                    >
                      <svg
                        className="w-5 h-5 text-primary-500 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-sm text-slate-600">
                        {membership}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-slate-500 mb-8">
            We&apos;re always looking for talented structural engineers, design
            engineers, and draughtsmen to join our growing team.
          </p>
          <Link
            href="/contact"
            className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
