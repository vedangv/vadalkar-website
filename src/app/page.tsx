import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const services = [
  {
    title: "Structural Design",
    description: "Comprehensive design for residential, commercial, and industrial buildings using latest codes.",
  },
  {
    title: "Structural Analysis",
    description: "Advanced computer-aided analysis using STAADPro and industry-leading software.",
  },
  {
    title: "Structural Audit",
    description: "Thorough assessment of existing structures for safety and code compliance.",
  },
  {
    title: "Repair Consulting",
    description: "Expert consultation for repair and rehabilitation of aging structures.",
  },
  {
    title: "Proof Checking",
    description: "Independent verification of structural designs ensuring safety standards.",
  },
  {
    title: "STAADPro Consulting",
    description: "Training and technical support for STAADPro software across Mumbai.",
  },
];

const featuredProjects: {
  title: string;
  subtitle: string;
  location: string;
  category: string;
  year: string;
  cost: string;
  span: string;
  height: string;
  image?: string;
}[] = [
  {
    title: "Videocon Towers",
    subtitle: "S+25 Storeys, Two Towers",
    location: "Kandivali, Mumbai",
    category: "Residential",
    year: "1996",
    cost: "Rs. 3,000 Lakhs",
    span: "lg:col-span-2 lg:row-span-2",
    height: "h-80 lg:h-full",
    image: "/projects/residential/resi-videocon-tower.gif",
  },
  {
    title: "DESE & CESE Building, IIT Bombay",
    subtitle: "G+6 Research Facility",
    location: "Powai, Mumbai",
    category: "Educational",
    year: "2013",
    cost: "Rs. 4,000 Lakhs",
    span: "",
    height: "h-64",
    image: undefined,
  },
  {
    title: "Haji Ali — Worli Sea Face Beautification",
    subtitle: "Coastal Infrastructure",
    location: "Mumbai",
    category: "Infrastructure",
    year: "2009",
    cost: "Rs. 2,500 Lakhs",
    span: "",
    height: "h-64",
    image: undefined,
  },
];

const stats = [
  { value: "35+", label: "Years of Experience" },
  { value: "200+", label: "Projects Delivered" },
  { value: "14", label: "Sectors Served" },
  { value: "2", label: "Office Locations" },
];

const clients = [
  "CIDCO",
  "Western Railway",
  "Central Railway",
  "IIT Bombay",
  "MCGM",
  "Shapoorji Pallonji",
  "Simplex Infrastructure",
  "Reliance",
  "BEST Undertaking",
  "Delhi Development Authority",
];

export default function Home() {
  return (
    <>
      {/* Hero — Full viewport, editorial style */}
      <section className="relative min-h-screen flex items-end bg-slate-900">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30 z-10" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent z-10" aria-hidden="true" />
          {/* Geometric pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] z-10"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Gradient mesh background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-800 to-primary-800" aria-hidden="true" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-40 w-full">
          <div className="max-w-4xl">
            <div className="hero-animate" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-accent-400/20 bg-accent-400/5 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
                <span className="text-accent-400 font-semibold text-xs uppercase tracking-[0.2em]">
                  Established 1994
                </span>
              </div>
            </div>

            <h1 className="hero-animate text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-8" style={{ animationDelay: "0.2s" }}>
              Building
              <br />
              Stronger
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-300 via-accent-400 to-accent-600">Foundations</span>
            </h1>

            <p className="hero-animate text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl mb-12" style={{ animationDelay: "0.35s" }}>
              A premier structural and civil engineering consultancy in Mumbai,
              delivering safe, innovative, and cost-effective solutions for
              over three decades.
            </p>

            <div className="hero-animate flex flex-col sm:flex-row gap-4" style={{ animationDelay: "0.45s" }}>
              <Link
                href="/projects"
                className="group bg-accent-400 text-slate-900 px-8 py-4 font-semibold text-base hover:bg-accent-300 transition-all text-center inline-flex items-center justify-center gap-2"
              >
                Explore Our Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="border border-white/30 text-white px-8 py-4 font-semibold text-base hover:bg-white/10 transition-all text-center"
              >
                Start a Consultation
              </Link>
            </div>
          </div>

          <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-accent-400/20 to-transparent" />

          {/* Stats strip at bottom of hero */}
          <div className="hero-animate mt-4 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8" style={{ animationDelay: "0.6s" }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl lg:text-5xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Clean editorial style */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-12 bg-accent-400" />
                    <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">
                      Services
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                    Scope of
                    <br />
                    Services
                  </h2>
                  <p className="text-lg text-slate-500 leading-relaxed">
                    From preliminary design to construction supervision, we
                    provide end-to-end structural engineering solutions across
                    every project phase.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 [&>*]:h-full">
                {services.map((service, i) => (
                  <FadeIn key={service.title} delay={i * 0.1}>
                    <div className="bg-white p-8 lg:p-10 group border border-slate-200 hover:border-accent-400/30 transition-all duration-300 -mt-px -ml-px h-full">
                      <span className="text-4xl font-black italic text-slate-200 group-hover:text-accent-400 transition-colors mb-4 block">
                        0{i + 1}
                      </span>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-primary-500 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects — Asymmetric WSP-style grid */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-accent-400" />
                  <span className="text-accent-600 font-medium text-sm uppercase tracking-[0.2em]">
                    Portfolio
                  </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  Featured
                  <br />
                  Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="group text-primary-500 font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all"
              >
                View all 200+ projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.15} className={project.span}>
                <div
                  className={`group relative ${project.height} bg-gradient-to-br from-primary-500 to-slate-700 overflow-hidden cursor-pointer`}
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
                  <div className="absolute inset-0 bg-primary-500/20 group-hover:bg-transparent transition-colors duration-500 z-10" />

                  {/* Geometric texture */}
                  <div
                    className="absolute inset-0 opacity-5"
                    aria-hidden="true"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 20h40M20 0v40' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-20 h-full flex flex-col justify-between p-8">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-medium text-white/60 uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="text-xs font-medium text-white/60">
                        {project.year}
                      </span>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-2">{project.location}</p>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-2 group-hover:text-accent-300 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm">{project.subtitle}</p>
                      <div className="mt-4 flex items-center gap-4">
                        <span className="text-accent-400 text-sm font-semibold">{project.cost}</span>
                        <svg className="w-5 h-5 text-white/40 group-hover:text-accent-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By — Dark marquee */}
      <section className="py-16 bg-slate-900 overflow-hidden" aria-label="Trusted by leading organizations">
        <FadeIn>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10" />
            <style>{`
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
            <div className="flex whitespace-nowrap" style={{ animation: 'marquee 35s linear infinite' }}>
              {[...clients, ...clients].map((client, i) => (
                <span
                  key={i}
                  className="text-white/15 font-black text-3xl lg:text-4xl uppercase tracking-tight mx-10 hover:text-accent-400 transition-colors cursor-default"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA — Editorial, bold */}
      <section className="relative py-32 bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Have a project
                <br />
                in mind?
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div>
                <p className="text-xl text-slate-400 leading-relaxed mb-10">
                  Whether it&apos;s a new construction, structural audit, or repair
                  consultation — we&apos;re here to help you build with confidence.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="group bg-accent-400 text-slate-900 px-8 py-4 font-semibold text-base hover:bg-accent-300 transition-all inline-flex items-center justify-center gap-2"
                  >
                    Start a Conversation
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href="/brochure/vadalkar-associates-brochure.pdf"
                    download
                    className="group border-2 border-slate-600 text-white px-8 py-4 font-semibold hover:border-accent-400 hover:text-accent-400 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Brochure
                  </a>
                  <a
                    href="tel:+912224308872"
                    className="border border-white/20 text-white px-8 py-4 font-semibold text-base hover:bg-white/5 transition-all text-center"
                  >
                    +91 22 2430 8872
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
