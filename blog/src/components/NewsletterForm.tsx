'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    const formId = process.env.NEXT_PUBLIC_KIT_FORM_ID

    if (!formId || formId === 'placeholder') {
      // No Kit form ID configured — show success for development
      console.warn(
        'NEXT_PUBLIC_KIT_FORM_ID is not configured. Newsletter signup is running in dev mode.'
      )
      setStatus('success')
      setEmail('')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch(
        `https://app.kit.com/forms/${formId}/subscriptions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email_address: email }),
        }
      )

      if (!response.ok) {
        throw new Error('Subscription failed. Please try again.')
      }

      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    }
  }

  if (status === 'success') {
    return (
      <form className="w-full max-w-md">
        <p className="text-sm text-[var(--color-accent)] font-medium tracking-wide animate-fade-in">
          Thank you! You&apos;ll hear from us soon.
        </p>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
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
          disabled={status === 'loading'}
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
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="
            px-7 py-3
            bg-[var(--color-accent)] text-white
            text-sm font-semibold tracking-widest uppercase
            rounded-sm
            hover:bg-[var(--color-accent-hover)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:ring-offset-2 focus:ring-offset-[var(--color-background)]
            transition-all duration-300
            whitespace-nowrap
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-500 animate-fade-in">
          {errorMessage}
        </p>
      )}
    </form>
  )
}
