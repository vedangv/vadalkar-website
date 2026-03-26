import { client } from '@/sanity/lib/client'
import { featuredPostQuery, paginatedPostsQuery, postCountQuery } from '@/sanity/lib/queries'
import FeaturedPost from '@/components/FeaturedPost'
import PostCard from '@/components/PostCard'
import NewsletterForm from '@/components/NewsletterForm'
import Pagination from '@/components/Pagination'

export const revalidate = 60

const PER_PAGE_OPTIONS = [10, 25, 50]
const DEFAULT_PER_PAGE = 10

interface HomePageProps {
  searchParams: Promise<{ page?: string; per?: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const perPage = PER_PAGE_OPTIONS.includes(Number(params.per)) ? Number(params.per) : DEFAULT_PER_PAGE
  const currentPage = Math.max(1, Number(params.page) || 1)

  let featured: any = null
  let posts: any[] = []
  let totalCount = 0

  try {
    ;[featured, totalCount] = await Promise.all([
      client.fetch(featuredPostQuery),
      client.fetch(postCountQuery),
    ])

    // Remaining posts (excluding the featured/first one)
    const remainingCount = totalCount - 1
    const start = 1 + (currentPage - 1) * perPage // skip featured (index 0)
    const end = start + perPage

    posts = await client.fetch(paginatedPostsQuery, { start, end })
  } catch {
    // Sanity not configured yet or unreachable
  }

  if (!featured && (!posts || posts.length === 0)) {
    return <EmptyState />
  }

  const remainingCount = Math.max(0, totalCount - 1)
  const totalPages = Math.ceil(remainingCount / perPage)

  return (
    <>
      {/* Hero / Featured Post (Prastavana) */}
      {featured && <FeaturedPost post={featured} />}

      {/* Posts Grid with Pagination */}
      {remainingCount > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            {/* Section header with per-page selector */}
            <div className="flex items-center gap-4 mb-14">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
                प्रवास पत्रे
              </h2>
              <span className="flex-1 h-[1px] bg-[var(--color-border)]" />
              <div className="flex items-center gap-2 text-sm font-sans">
                <span className="text-[var(--color-muted)] hidden sm:inline">Show:</span>
                {PER_PAGE_OPTIONS.map((opt) => (
                  <a
                    key={opt}
                    href={`/?per=${opt}&page=1`}
                    className={`
                      px-3 py-1.5 rounded-sm text-xs font-semibold tracking-wide transition-colors duration-200
                      ${opt === perPage
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-primary)]'
                      }
                    `}
                  >
                    {opt}
                  </a>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={perPage}
              />
            )}
          </div>
        </section>
      )}
    </>
  )
}

/* ============================================
   Empty State — shown when no posts exist yet
   ============================================ */

function EmptyState() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)]">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-60 h-60 rounded-full bg-[var(--color-accent)]/3 blur-2xl" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <span className="block w-12 h-[1.5px] bg-[var(--color-accent)]" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Stories Are
            <br />
            <span className="text-[var(--color-accent)]">On Their Way</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed mb-4 font-sans">
            This space is being thoughtfully prepared. Soon it will be filled
            with reflections, essays, and moments worth lingering on.
          </p>
        </div>
      </section>
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Be the First to Read
            </h2>
            <p className="text-[var(--color-muted)] text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto font-sans">
              Leave your email and you&apos;ll receive each new story the moment
              it&apos;s published.
            </p>
            <div className="flex justify-center">
              <NewsletterForm />
            </div>
            <p className="mt-6 text-xs text-[var(--color-muted)]/60 font-sans">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
