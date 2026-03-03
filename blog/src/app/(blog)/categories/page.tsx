import { client } from '@/sanity/lib/client'
import { categoriesQuery } from '@/sanity/lib/queries'
import { groq } from 'next-sanity'
import Link from 'next/link'

export const revalidate = 60

export const metadata = {
  title: 'Categories',
  description: 'Browse posts by category.',
}

/* ============================================
   Types
   ============================================ */

interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  postCount: number
}

/* ============================================
   Page Component
   ============================================ */

export default async function CategoriesPage() {
  let categories: Category[] = []

  try {
    // Fetch categories with post counts
    categories = await client.fetch(
      groq`*[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        description,
        "postCount": count(*[_type == "post" && references(^._id)])
      }`
    )
  } catch {
    // Graceful fallback if Sanity is unreachable
  }

  return (
    <>
      {/* ============================================
          Page Header
          ============================================ */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[var(--color-background)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm font-sans text-[var(--color-muted)]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="text-[var(--color-border)]">/</span>
              </li>
              <li className="text-[var(--color-primary)] font-medium">
                Categories
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1
            className="
              text-3xl sm:text-4xl md:text-5xl
              font-bold tracking-tight leading-[1.1]
              text-[var(--color-primary)] mb-4
            "
          >
            Categories
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed max-w-2xl font-sans">
            Browse stories by topic. Each category groups related essays,
            reflections, and insights.
          </p>

          {/* Decorative separator */}
          <div className="mt-10 h-[2px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/40 to-transparent" />
        </div>
      </section>

      {/* ============================================
          Categories Grid
          ============================================ */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </>
  )
}

/* ============================================
   Category Card Component
   ============================================ */

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug.current}`}
      className="
        group relative flex flex-col
        p-7 rounded-sm
        border border-[var(--color-border)]
        bg-[var(--color-background)]
        hover:border-[var(--color-accent)]/50
        hover:shadow-sm
        transition-all duration-300
      "
    >
      {/* Accent top bar on hover */}
      <div
        className="
          absolute top-0 left-0 right-0 h-[2px]
          bg-[var(--color-accent)]
          scale-x-0 group-hover:scale-x-100
          transition-transform duration-500 origin-left
        "
      />

      {/* Category title */}
      <h2
        className="
          text-xl font-bold tracking-tight
          text-[var(--color-primary)]
          group-hover:text-[var(--color-accent)]
          transition-colors duration-300
          mb-2
        "
      >
        {category.title}
      </h2>

      {/* Description */}
      {category.description && (
        <p className="text-sm text-[var(--color-muted)] leading-relaxed font-sans mb-4 flex-1">
          {category.description}
        </p>
      )}

      {/* Post count and arrow */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-border)]/60">
        <span className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--color-muted)] font-sans">
          {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
        </span>

        {/* Arrow icon */}
        <svg
          className="
            w-4 h-4 text-[var(--color-muted)]
            group-hover:text-[var(--color-accent)]
            group-hover:translate-x-1
            transition-all duration-300
          "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </div>
    </Link>
  )
}

/* ============================================
   Empty State
   ============================================ */

function EmptyState() {
  return (
    <div className="text-center py-20">
      {/* Decorative element */}
      <div className="flex items-center justify-center mb-8">
        <span className="block w-5 h-5 border border-[var(--color-accent)] rotate-45 opacity-60" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-primary)] mb-4">
        No Categories Yet
      </h2>
      <p className="text-[var(--color-muted)] text-base md:text-lg leading-relaxed max-w-md mx-auto font-sans mb-8">
        Categories will appear here once they are created. Check back soon for
        organized collections of stories.
      </p>

      <Link
        href="/"
        className="
          inline-flex items-center gap-2
          text-sm font-semibold tracking-[0.1em] uppercase
          text-[var(--color-accent)]
          hover:text-[var(--color-primary)]
          transition-colors duration-300
          font-sans
        "
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        Back to Home
      </Link>
    </div>
  )
}
