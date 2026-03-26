'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { searchPostsQuery } from '@/sanity/lib/queries'

interface SearchPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string | null
  publishedAt: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState<SearchPost[]>([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  // Fetch all posts on mount / when modal opens
  useEffect(() => {
    if (!isOpen) return

    let cancelled = false
    setLoading(true)

    client
      .fetch<SearchPost[]>(searchPostsQuery)
      .then((data) => {
        if (!cancelled) setPosts(data || [])
      })
      .catch(() => {
        if (!cancelled) setPosts([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isOpen])

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to let the modal render
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Filter posts by query
  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return posts
      .filter(
        (post) =>
          post.title?.toLowerCase().includes(q) ||
          post.excerpt?.toLowerCase().includes(q)
      )
      .slice(0, 10)
  }, [query, posts])

  // Click backdrop to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="
        fixed inset-0 z-[100]
        bg-[var(--color-primary)]/60 backdrop-blur-sm
        flex items-start justify-center
        pt-[10vh]
      "
    >
      <div
        className="
          w-full max-w-2xl mx-4
          bg-[var(--color-background)] rounded-xl
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Search Input */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            {/* Magnifying glass icon */}
            <svg
              className="w-5 h-5 text-[var(--color-muted)] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="
                w-full text-lg
                bg-transparent
                text-[var(--color-primary)]
                placeholder:text-[var(--color-muted)]
                outline-none border-none
              "
              style={{ fontFamily: 'var(--font-source-sans-3), sans-serif' }}
            />
            {/* Escape hint */}
            <kbd
              className="
                hidden sm:inline-block
                px-2 py-0.5 text-xs
                text-[var(--color-muted)]
                bg-[var(--color-surface)]
                border border-[var(--color-border)]
                rounded
                shrink-0
              "
            >
              ESC
            </kbd>
          </div>
          <div className="mt-3 h-[1.5px] bg-[var(--color-accent)]" />
        </div>

        {/* Results */}
        <div className="px-6 pb-6 max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="py-8 text-center text-[var(--color-muted)]">
              Loading posts...
            </div>
          )}

          {!loading && query.trim() && results.length === 0 && (
            <div className="py-8 text-center text-[var(--color-muted)]">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {!loading && query.trim() && results.length > 0 && (
            <ul className="space-y-1">
              {results.map((post) => (
                <li key={post._id}>
                  <Link
                    href={`/posts/${post.slug.current}`}
                    onClick={onClose}
                    className="
                      block px-4 py-3 -mx-2 rounded-lg
                      transition-colors duration-200
                      hover:bg-[var(--color-surface)]
                      group
                    "
                  >
                    <span
                      className="
                        block text-[var(--color-primary)] font-semibold
                        group-hover:text-[var(--color-accent)]
                        transition-colors duration-200
                      "
                      style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
                    >
                      {post.title}
                    </span>
                    {post.excerpt && (
                      <span
                        className="
                          block mt-1 text-sm text-[var(--color-muted)]
                          line-clamp-2
                        "
                      >
                        {post.excerpt}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!loading && !query.trim() && (
            <div className="py-8 text-center text-[var(--color-muted)] text-sm">
              Start typing to search across all posts
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
