import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'

export const revalidate = 60

/* ============================================
   GROQ Query
   ============================================ */

const categoryWithPostsQuery = groq`{
  "category": *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description
  },
  "posts": *[_type == "post" && references(*[_type == "category" && slug.current == $slug][0]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, image }
  }
}`

/* ============================================
   Static Params Generation
   ============================================ */

export async function generateStaticParams() {
  try {
    const categories = await client.fetch(
      groq`*[_type == "category"]{ slug }`
    )
    return categories.map((cat: any) => ({ slug: cat.slug.current }))
  } catch {
    return []
  }
}

/* ============================================
   Metadata
   ============================================ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  try {
    const category = await client.fetch(
      groq`*[_type == "category" && slug.current == $slug][0] {
        title,
        description
      }`,
      { slug }
    )

    if (!category) {
      return { title: 'Category Not Found' }
    }

    return {
      title: `${category.title} — Categories`,
      description:
        category.description || `Browse posts in the ${category.title} category.`,
    }
  } catch {
    return { title: 'Category Not Found' }
  }
}

/* ============================================
   Page Component
   ============================================ */

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let category: any = null
  let posts: any[] = []

  try {
    const result = await client.fetch(categoryWithPostsQuery, { slug })
    category = result?.category
    posts = result?.posts || []
  } catch {
    // Sanity unreachable — fall through to notFound
  }

  if (!category) {
    notFound()
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
              <li>
                <Link
                  href="/categories"
                  className="hover:text-[var(--color-accent)] transition-colors duration-300"
                >
                  Categories
                </Link>
              </li>
              <li>
                <span className="text-[var(--color-border)]">/</span>
              </li>
              <li className="text-[var(--color-primary)] font-medium">
                {category.title}
              </li>
            </ol>
          </nav>

          {/* Category label */}
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3 font-sans">
            Category
          </p>

          {/* Title */}
          <h1
            className="
              text-3xl sm:text-4xl md:text-5xl
              font-bold tracking-tight leading-[1.1]
              text-[var(--color-primary)] mb-4
            "
          >
            {category.title}
          </h1>

          {/* Description */}
          {category.description && (
            <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed max-w-2xl font-sans">
              {category.description}
            </p>
          )}

          {/* Post count */}
          <p className="mt-6 text-sm text-[var(--color-muted)] font-sans">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this
            category
          </p>

          {/* Decorative separator */}
          <div className="mt-10 h-[2px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/40 to-transparent" />
        </div>
      </section>

      {/* ============================================
          Posts Grid
          ============================================ */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <EmptyCategory categoryTitle={category.title} />
          )}
        </div>
      </section>
    </>
  )
}

/* ============================================
   Empty Category State
   ============================================ */

function EmptyCategory({ categoryTitle }: { categoryTitle: string }) {
  return (
    <div className="text-center py-20">
      {/* Decorative element */}
      <div className="flex items-center justify-center mb-8">
        <span className="block w-5 h-5 border border-[var(--color-accent)] rotate-45 opacity-60" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-primary)] mb-4">
        No Posts Yet
      </h2>
      <p className="text-[var(--color-muted)] text-base md:text-lg leading-relaxed max-w-md mx-auto font-sans mb-8">
        There are no posts in <span className="font-medium text-[var(--color-primary)]">{categoryTitle}</span> yet.
        New stories will appear here once they are published.
      </p>

      <div className="flex items-center justify-center gap-6">
        <Link
          href="/categories"
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
          All Categories
        </Link>

        <span className="text-[var(--color-border)]">|</span>

        <Link
          href="/"
          className="
            inline-flex items-center gap-2
            text-sm font-semibold tracking-[0.1em] uppercase
            text-[var(--color-muted)]
            hover:text-[var(--color-accent)]
            transition-colors duration-300
            font-sans
          "
        >
          Home
        </Link>
      </div>
    </div>
  )
}
