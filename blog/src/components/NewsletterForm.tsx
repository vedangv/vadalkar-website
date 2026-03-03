'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Placeholder — will be wired to Kit (ConvertKit) in Task 9
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      {status === 'success' ? (
        <p className="text-sm text-[var(--color-accent)] font-medium tracking-wide animate-fade-in">
          Thank you! You&apos;ll hear from us soon.
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="
              flex-1 px-5 py-3
              bg-white/80 backdrop-blur-sm
              border border-[var(--color-border)]
              rounded-sm
              text-sm text-[var(--color-primary)]
              placeholder:text-[var(--color-muted)]/60
              focus:outline-none focus:border-[var(--color-accent)]
              focus:ring-1 focus:ring-[var(--color-accent)]/30
              transition-all duration-300
            "
          />
          <button
            type="submit"
            className="
              px-7 py-3
              bg-[var(--color-accent)] text-white
              text-sm font-semibold tracking-widest uppercase
              rounded-sm
              hover:bg-[var(--color-accent-hover)]
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:ring-offset-2 focus:ring-offset-[var(--color-background)]
              transition-all duration-300
              whitespace-nowrap
            "
          >
            Subscribe
          </button>
        </div>
      )}
    </form>
  )
}
