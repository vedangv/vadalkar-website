import Link from 'next/link'

interface AdjacentPost {
  _id: string
  title: string
  slug: { current: string }
}

interface PostNavigationProps {
  prev: AdjacentPost | null
  next: AdjacentPost | null
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav
      className="mt-14 pt-8 border-t border-[var(--color-border)]"
      aria-label="Post navigation"
    >
      <div className={`grid gap-4 ${prev && next ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {/* Previous post */}
        {prev ? (
          <Link
            href={`/posts/${prev.slug.current}`}
            className="
              group flex flex-col p-5 rounded-sm
              border border-[var(--color-border)]
              hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]
              transition-all duration-200
            "
          >
            <span className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-[var(--color-muted)] mb-2 font-sans">
              &larr; Previous
            </span>
            <span className="text-sm font-bold leading-snug text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200 line-clamp-2">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {/* Next post */}
        {next ? (
          <Link
            href={`/posts/${next.slug.current}`}
            className="
              group flex flex-col p-5 rounded-sm text-right
              border border-[var(--color-border)]
              hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]
              transition-all duration-200
            "
          >
            <span className="text-[0.65rem] font-semibold tracking-[0.15em] uppercase text-[var(--color-muted)] mb-2 font-sans">
              Next &rarr;
            </span>
            <span className="text-sm font-bold leading-snug text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200 line-clamp-2">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
