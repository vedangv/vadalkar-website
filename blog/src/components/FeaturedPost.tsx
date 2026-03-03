import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface FeaturedPostProps {
  post: {
    _id: string
    title: string
    slug: { current: string }
    mainImage?: any
    excerpt?: string
    publishedAt?: string
    categories?: Array<{ _id: string; title: string; slug: { current: string } }>
    author?: { name: string; image?: any }
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const hasImage = post.mainImage?.asset

  return (
    <section className="relative">
      {/* Full-width hero container */}
      <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden">
        {/* Background image or gradient fallback */}
        {hasImage ? (
          <>
            <Image
              src={urlFor(post.mainImage).width(1920).height(1080).quality(85).url()}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/40 to-transparent" />
          </>
        ) : (
          /* Elegant gradient fallback when no image */
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#2a2a4e] to-[#1a1a2e]">
            {/* Decorative accent elements */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
            <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-[var(--color-accent)]/5 blur-2xl" />
          </div>
        )}

        {/* Content overlay */}
        <div className="relative z-10 w-full pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            {/* Category badges */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {post.categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug.current}`}
                    className="
                      text-[0.7rem] font-semibold tracking-[0.2em] uppercase
                      text-[var(--color-accent)] bg-[var(--color-accent)]/10
                      px-4 py-1.5 rounded-sm
                      border border-[var(--color-accent)]/20
                      hover:bg-[var(--color-accent)]/20
                      transition-colors duration-300
                    "
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1
              className="
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                font-bold tracking-tight leading-[1.1]
                text-white mb-6
                max-w-4xl
              "
            >
              <Link
                href={`/posts/${post.slug.current}`}
                className="hover:text-[var(--color-accent)] transition-colors duration-500"
              >
                {post.title}
              </Link>
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p
                className="
                  text-base md:text-lg lg:text-xl
                  text-white/75 leading-relaxed
                  max-w-2xl mb-8
                  font-sans
                "
              >
                {post.excerpt}
              </p>
            )}

            {/* Meta row: author + date + read more */}
            <div className="flex flex-wrap items-center gap-6">
              {/* Author */}
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image?.asset && (
                    <Image
                      src={urlFor(post.author.image).width(40).height(40).url()}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover ring-2 ring-white/20"
                    />
                  )}
                  <span className="text-sm text-white/80 font-medium">
                    {post.author.name}
                  </span>
                </div>
              )}

              {/* Date */}
              {post.publishedAt && (
                <time
                  dateTime={post.publishedAt}
                  className="text-sm text-white/50 font-sans"
                >
                  {formatDate(post.publishedAt)}
                </time>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Read more link */}
              <Link
                href={`/posts/${post.slug.current}`}
                className="
                  group inline-flex items-center gap-2
                  text-sm font-semibold tracking-[0.15em] uppercase
                  text-[var(--color-accent)]
                  hover:text-[var(--color-accent-hover)]
                  transition-colors duration-300
                "
              >
                Read Story
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative accent line */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
    </section>
  )
}
