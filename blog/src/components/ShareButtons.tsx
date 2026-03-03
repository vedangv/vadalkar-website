'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  // Build full URL (will use window.location.origin on client)
  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/posts/${slug}`
    }
    return `/posts/${slug}`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = getUrl()
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = typeof window !== 'undefined' ? encodeURIComponent(getUrl()) : ''

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-muted)] mr-1 font-sans">
        Share
      </span>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-1.5 px-3 py-1.5
          text-xs font-medium tracking-wide
          text-[var(--color-muted)] hover:text-[var(--color-accent)]
          border border-[var(--color-border)] rounded-sm
          hover:border-[var(--color-accent)]/40
          transition-all duration-200 font-sans
        "
        aria-label="Share on Twitter"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span>X</span>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-1.5 px-3 py-1.5
          text-xs font-medium tracking-wide
          text-[var(--color-muted)] hover:text-[var(--color-accent)]
          border border-[var(--color-border)] rounded-sm
          hover:border-[var(--color-accent)]/40
          transition-all duration-200 font-sans
        "
        aria-label="Share on WhatsApp"
      >
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span>WhatsApp</span>
      </a>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodedTitle}&body=I thought you might enjoy this article: ${encodedUrl}`}
        className="
          inline-flex items-center gap-1.5 px-3 py-1.5
          text-xs font-medium tracking-wide
          text-[var(--color-muted)] hover:text-[var(--color-accent)]
          border border-[var(--color-border)] rounded-sm
          hover:border-[var(--color-accent)]/40
          transition-all duration-200 font-sans
        "
        aria-label="Share via Email"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
        <span>Email</span>
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="
          inline-flex items-center gap-1.5 px-3 py-1.5
          text-xs font-medium tracking-wide
          border rounded-sm
          transition-all duration-200 font-sans cursor-pointer
          data-[copied=true]:text-[var(--color-accent)] data-[copied=true]:border-[var(--color-accent)]/40
          data-[copied=false]:text-[var(--color-muted)] data-[copied=false]:border-[var(--color-border)]
          hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40
        "
        data-copied={copied}
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.02a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.25 8.81" />
            </svg>
            <span>Copy Link</span>
          </>
        )}
      </button>
    </div>
  )
}
