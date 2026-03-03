import NewsletterForm from './NewsletterForm'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-border)]">
      {/* Newsletter Section */}
      <div className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-20 md:py-24">
          <div className="max-w-xl mx-auto text-center">
            {/* Decorative line */}
            <div className="flex items-center justify-center mb-8">
              <span className="block w-8 h-[1.5px] bg-[var(--color-accent)]" />
            </div>

            <h3
              className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
            >
              Join the Journey
            </h3>
            <p className="text-[var(--color-muted)] text-base md:text-lg mb-8 leading-relaxed">
              Stories, reflections, and little moments of beauty
              — delivered to your&nbsp;inbox.
            </p>

            <div className="flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[var(--color-background)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Blog name */}
            <span
              className="text-lg font-bold tracking-tight text-[var(--color-primary)]"
              style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
            >
              Reflections
            </span>

            {/* Copyright */}
            <p className="text-xs text-[var(--color-muted)] tracking-wide">
              &copy; {currentYear} Reflections. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
