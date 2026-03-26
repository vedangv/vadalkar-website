import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  perPage: number
}

export default function Pagination({ currentPage, totalPages, perPage }: PaginationProps) {
  function pageUrl(page: number) {
    return `/?per=${perPage}&page=${page}`
  }

  // Build page number array with ellipsis
  function getPageNumbers(): (number | '...')[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | '...')[] = [1]

    if (currentPage > 3) {
      pages.push('...')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    pages.push(totalPages)
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav
      className="flex items-center justify-center gap-2 mt-20 font-sans"
      aria-label="Pagination"
    >
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={pageUrl(currentPage - 1)}
          className="
            px-4 py-2 text-sm font-medium
            text-[var(--color-muted)] hover:text-[var(--color-primary)]
            border border-[var(--color-border)] rounded-sm
            hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]
            transition-all duration-200
          "
        >
          &larr; Prev
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-[var(--color-border)] border border-[var(--color-border)]/50 rounded-sm cursor-not-allowed">
          &larr; Prev
        </span>
      )}

      {/* Page numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {pageNumbers.map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 py-2 text-sm text-[var(--color-muted)]">
              &hellip;
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              className="
                px-3.5 py-2 text-sm font-semibold
                bg-[var(--color-accent)] text-white rounded-sm
              "
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={pageUrl(page)}
              className="
                px-3.5 py-2 text-sm font-medium
                text-[var(--color-muted)] hover:text-[var(--color-primary)]
                hover:bg-[var(--color-surface)] rounded-sm
                transition-colors duration-200
              "
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Mobile page indicator */}
      <span className="sm:hidden text-sm text-[var(--color-muted)] font-medium px-3">
        {currentPage} / {totalPages}
      </span>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={pageUrl(currentPage + 1)}
          className="
            px-4 py-2 text-sm font-medium
            text-[var(--color-muted)] hover:text-[var(--color-primary)]
            border border-[var(--color-border)] rounded-sm
            hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]
            transition-all duration-200
          "
        >
          Next &rarr;
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-medium text-[var(--color-border)] border border-[var(--color-border)]/50 rounded-sm cursor-not-allowed">
          Next &rarr;
        </span>
      )}
    </nav>
  )
}
