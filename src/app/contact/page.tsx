import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contact Us | Vadalkar And Associates",
  description:
    "Get in touch with Vadalkar And Associates for structural and civil engineering consultations. Offices in Dadar and Vashi, Mumbai.",
};

const offices = [
  {
    name: "Head Office — Dadar",
    address: "B-703, New Samadhan CHS Ltd, Senapati Bapat Road, Near Zarapkar, Opp. Dadar Stn. (W), Mumbai - 400 028",
    phone: "+91 22 2430 8872",
    cell: "+91 93225 32578",
  },
  {
    name: "Vashi Office",
    address: "C-482, II Floor, Vashi Plaza, Sector 17, Vashi, Navi Mumbai - 400 705",
    phone: null,
    cell: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-40 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-400" />
              <span className="text-accent-400 font-medium text-sm uppercase tracking-[0.2em]">Contact</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight mb-8">
              Let&apos;s Build
              <br />
              Something <span className="text-accent-400">Together</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Whether you need a structural consultation, audit, or have a project
              in mind — we&apos;d love to hear from you.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Form */}
            <div className="lg:col-span-7">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.2em]">Enquiry</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-10">
                  Send Us a Message
                </h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                      <input type="text" id="name" name="name" required className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                      <input type="email" id="email" name="email" required className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <input type="tel" id="phone" name="phone" className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-2">Service Required</label>
                      <select id="service" name="service" className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent">
                        <option value="">Select a service</option>
                        <option value="structural-design">Structural Design</option>
                        <option value="structural-analysis">Structural Analysis</option>
                        <option value="structural-audit">Structural Audit</option>
                        <option value="repair-consulting">Repair Consulting</option>
                        <option value="proof-checking">Proof Checking</option>
                        <option value="staadpro">STAADPro Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Project Details *</label>
                    <textarea id="message" name="message" required rows={5} className="w-full px-0 py-3 border-0 border-b-2 border-slate-200 focus:border-primary-500 outline-none transition-colors text-base bg-transparent resize-none" placeholder="Tell us about your project or enquiry..." />
                  </div>
                  <button type="submit" className="group bg-primary-500 text-white px-10 py-4 font-semibold hover:bg-primary-600 transition-all inline-flex items-center gap-2 mt-4">
                    Send Message
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              </FadeIn>
            </div>

            {/* Office Info */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.2}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-500 font-medium text-sm uppercase tracking-[0.2em]">Offices</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-10">
                  Visit Us
                </h2>
              </FadeIn>

              <div className="space-y-8">
                {offices.map((office, i) => (
                  <FadeIn key={office.name} delay={0.3 + i * 0.1}>
                    <div className="border-l-2 border-slate-200 pl-8 py-2 hover:border-primary-500 transition-colors">
                      <h3 className="text-lg font-semibold text-slate-900 mb-3">{office.name}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-3">{office.address}</p>
                      {office.phone && (
                        <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="block text-sm text-slate-600 hover:text-primary-500 transition-colors mb-1">
                          Tel: {office.phone}
                        </a>
                      )}
                      {office.cell && (
                        <a href={`tel:${office.cell.replace(/\s/g, "")}`} className="block text-sm text-slate-600 hover:text-primary-500 transition-colors">
                          Cell: {office.cell}
                        </a>
                      )}
                    </div>
                  </FadeIn>
                ))}

                <FadeIn delay={0.5}>
                  <div className="bg-slate-900 p-8 mt-8">
                    <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                    <p className="text-slate-400 text-sm mb-4">For enquiries and project discussions</p>
                    <a href="mailto:vadalkar@gmail.com" className="text-accent-400 font-semibold hover:text-accent-300 transition-colors text-lg">
                      vadalkar@gmail.com
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
    </>
  );
}
