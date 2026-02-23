import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Vadalkar And Associates",
  description:
    "Get in touch with Vadalkar And Associates for structural and civil engineering consultations. Offices in Dadar and Vashi, Mumbai.",
};

const offices = [
  {
    name: "Head Office - Dadar",
    address: [
      "B-703, New Samadhan CHS Ltd",
      "Senapati Bapat Road, Near Zarapkar",
      "Opp. Dadar Stn. (W)",
      "Mumbai - 400 028, India",
    ],
    phone: "+91 22 2430 8872",
    cell: "+91 93225 32578",
  },
  {
    name: "Vashi Office",
    address: [
      "C-482, II Floor",
      "Vashi Plaza, Sector 17",
      "Vashi, Navi Mumbai - 400 705",
      "India",
    ],
    phone: null,
    cell: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-primary-500 to-slate-800 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Contact Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Let&apos;s Build
            <br />
            Something Together
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Whether you need a structural consultation, audit, or have a project
            in mind — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Service Required
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="structural-design">
                        Structural Design
                      </option>
                      <option value="structural-analysis">
                        Structural Analysis
                      </option>
                      <option value="structural-audit">Structural Audit</option>
                      <option value="repair-consulting">
                        Repair Consulting
                      </option>
                      <option value="proof-checking">Proof Checking</option>
                      <option value="staadpro">STAADPro Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-sm resize-none"
                    placeholder="Tell us about your project or enquiry..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-500 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-600 transition-colors w-full sm:w-auto"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Office Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">
                Our Offices
              </h2>
              <div className="space-y-8">
                {offices.map((office) => (
                  <div
                    key={office.name}
                    className="bg-slate-50 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      {office.name}
                    </h3>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex gap-3">
                        <svg
                          className="w-5 h-5 text-slate-400 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        <span>
                          {office.address.map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < office.address.length - 1 && <br />}
                            </span>
                          ))}
                        </span>
                      </div>
                      {office.phone && (
                        <div className="flex gap-3 items-center">
                          <svg
                            className="w-5 h-5 text-slate-400 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            />
                          </svg>
                          <a
                            href={`tel:${office.phone.replace(/\s/g, "")}`}
                            className="hover:text-primary-500 transition-colors"
                          >
                            {office.phone}
                          </a>
                        </div>
                      )}
                      {office.cell && (
                        <div className="flex gap-3 items-center">
                          <svg
                            className="w-5 h-5 text-slate-400 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                            />
                          </svg>
                          <a
                            href={`tel:${office.cell.replace(/\s/g, "")}`}
                            className="hover:text-primary-500 transition-colors"
                          >
                            {office.cell}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Email */}
                <div className="bg-primary-500 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                  <p className="text-primary-100 text-sm mb-3">
                    For enquiries and project discussions
                  </p>
                  <a
                    href="mailto:vadalkar@gmail.com"
                    className="text-white font-semibold hover:text-accent-300 transition-colors"
                  >
                    vadalkar@gmail.com
                  </a>
                  <p className="text-primary-200 text-sm mt-4">
                    Contact: Hemant Vadalkar / Kirty Vadalkar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
