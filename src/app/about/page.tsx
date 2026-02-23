import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Vadalkar And Associates",
  description:
    "Learn about Vadalkar And Associates - a leading civil and structural engineering consultancy in Mumbai since 1994.",
};

const milestones = [
  {
    year: "1994",
    title: "Founded as Vartak-Vadalkar & Associates",
    description:
      "Established the consulting practice as a partnership firm in Mumbai.",
  },
  {
    year: "1996",
    title: "Major High-Rise Projects",
    description:
      "Took on landmark projects including Videocon Towers (S+25, two towers) in Kandivali.",
  },
  {
    year: "2000s",
    title: "Expanded Portfolio",
    description:
      "Grew into industrial, commercial, infrastructure, and institutional projects across Maharashtra.",
  },
  {
    year: "2006",
    title: "Rebranded as Vadalkar & Associates",
    description:
      "Continued independently under the leadership of Hemant Vadalkar, expanding the firm's capabilities.",
  },
  {
    year: "Today",
    title: "30+ Years of Excellence",
    description:
      "Over 500 projects completed spanning 16+ sectors, with offices in Dadar and Vashi.",
  },
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
      <section className="bg-gradient-to-br from-slate-900 via-primary-500 to-slate-800 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Three Decades of
            <br />
            Structural Excellence
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            From our office opposite Dadar Station to projects across India, we
            have been shaping Mumbai&apos;s skyline since 1994.
          </p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900">
                    Vadalkar And Associates
                  </strong>{" "}
                  is a civil and structural consultancy conveniently located
                  opposite Dadar Station (West), Mumbai. From 1994 till March
                  2006, the firm operated as &ldquo;Vartak &ndash; Vadalkar And
                  Associates&rdquo; before continuing independently.
                </p>
                <p>
                  We have a well-experienced design team of qualified engineers
                  and very senior structural engineers as advisers. We have
                  successfully handled hundreds of projects to the entire
                  satisfaction of our clients.
                </p>
                <p>
                  Beyond structural consulting, we provide training and technical
                  support for STAADPro software package for many consultancy
                  firms in Mumbai and work as software consultants to structural
                  consultancy firms.
                </p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-10">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Activities of the Firm
              </h3>
              <ul className="space-y-4">
                {activities.map((activity, i) => (
                  <li key={i} className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-accent-500 shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-slate-600">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent-500 uppercase tracking-widest mb-2">
              Our Journey
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Key Milestones
            </h2>
          </div>
          <div className="space-y-8">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">
                      {milestone.year}
                    </span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-slate-200 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {milestone.title}
                  </h3>
                  <p className="text-slate-500">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
