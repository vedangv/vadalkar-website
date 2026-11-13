import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[75svh] bg-slate-900 px-4 pb-24 pt-40 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">404 — Page not found</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          We couldn’t find that page
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
          The address may have changed or the page may no longer be available.
          Explore our work, or get in touch to discuss your project.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/projects" className="bg-accent-400 px-7 py-4 text-center font-semibold text-slate-900 hover:bg-accent-300">
            Explore our projects
          </Link>
          <Link href="/contact" className="border border-slate-500 px-7 py-4 text-center font-semibold text-white hover:bg-slate-800">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
