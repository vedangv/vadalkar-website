import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects | Vadalkar And Associates",
  description:
    "Explore our portfolio of 500+ structural engineering projects across residential, commercial, industrial, and infrastructure sectors.",
};

const categories = [
  "All",
  "Residential",
  "Commercial",
  "Industrial",
  "Infrastructure",
  "Institutional",
  "Special",
];

const projects = [
  {
    title: "Videocon Towers",
    category: "Residential",
    location: "Kandivali (E), Mumbai",
    detail: "Two towers, S+25 storeys",
    client: "Videocon Properties Ltd.",
    architect: "Hafeez Contractor",
    year: "1996",
    value: "3000",
  },
  {
    title: "Sterling Diamond Apartments",
    category: "Residential",
    location: "Mount Mary, Bandra",
    detail: "S+7 premium apartments",
    client: "Shapoorji Pallonji & Co. Ltd.",
    architect: "In-house",
    year: "1997",
    value: "150",
  },
  {
    title: "Mass Housing Project",
    category: "Residential",
    location: "Delhi",
    detail: "Large-scale housing development",
    client: "Government of Delhi",
    architect: "Various",
    year: "2000",
    value: "5000",
  },
  {
    title: "Residential Building at Pali Hill",
    category: "Residential",
    location: "Bandra, Mumbai",
    detail: "G+7 storey building",
    client: "Western Railway",
    architect: "In-house",
    year: "1995",
    value: "150",
  },
  {
    title: "Residential Complex at Kondivita",
    category: "Residential",
    location: "Andheri (E), Mumbai",
    detail: "G+5 storey building",
    client: "Mistry Builders",
    architect: "In-house",
    year: "1994",
    value: "115",
  },
  {
    title: "Western Railway Staff Quarters",
    category: "Residential",
    location: "Pali Hill, Bandra",
    detail: "G+7 staff quarters",
    client: "Western Railway",
    architect: "S.N. Bhobe & Associates",
    year: "1996",
    value: "280",
  },
  {
    title: "Industrial Complex",
    category: "Industrial",
    location: "Thane, Mumbai",
    detail: "Multi-unit industrial facility",
    client: "Various",
    architect: "In-house",
    year: "2002",
    value: "800",
  },
  {
    title: "Commercial Office Building",
    category: "Commercial",
    location: "Lower Parel, Mumbai",
    detail: "Modern commercial complex",
    client: "Private Developer",
    architect: "Various",
    year: "2005",
    value: "1200",
  },
  {
    title: "Infrastructure Bridge Project",
    category: "Infrastructure",
    location: "Navi Mumbai",
    detail: "Road over bridge",
    client: "CIDCO",
    architect: "In-house",
    year: "2004",
    value: "500",
  },
  {
    title: "Educational Campus",
    category: "Institutional",
    location: "Pune",
    detail: "Multi-building campus",
    client: "Education Trust",
    architect: "Various",
    year: "2003",
    value: "600",
  },
  {
    title: "Hospital Complex",
    category: "Institutional",
    location: "Mumbai",
    detail: "Multi-specialty hospital",
    client: "Healthcare Trust",
    architect: "Various",
    year: "2007",
    value: "900",
  },
  {
    title: "Communication Tower",
    category: "Special",
    location: "Various, Maharashtra",
    detail: "Telecom tower structures",
    client: "Telecom Operators",
    architect: "In-house",
    year: "2001",
    value: "200",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-primary-500 to-slate-800 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Our Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Projects That Stand
            <br />
            The Test of Time
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Over 500 projects across 16+ sectors — from high-rise residential
            towers to industrial complexes and infrastructure.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  cat === "All"
                    ? "bg-primary-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-primary-500/90 to-slate-700 relative flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-white/20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z"
                    />
                  </svg>
                  <div className="absolute top-3 left-3">
                    <span className="bg-accent-400 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
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
                    {project.location}
                  </p>
                  <p className="text-sm text-slate-600 mb-4">
                    {project.detail}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                    <span>Client: {project.client}</span>
                    {project.value && (
                      <>
                        <span>&middot;</span>
                        <span>Rs. {project.value} Lakhs</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
