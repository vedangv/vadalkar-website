export default function Home() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="flex items-center justify-center mb-8">
          <span className="block w-8 h-[1.5px] bg-[var(--color-accent)]" />
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
        >
          Coming Soon
        </h1>
        <p className="text-lg text-[var(--color-muted)] leading-relaxed">
          Stories, reflections, and little moments worth sharing.
        </p>
      </div>
    </div>
  )
}
