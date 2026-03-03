import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface RelatedPost {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  publishedAt?: string
  excerpt?: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="mt-20 pt-16 border-t border-[var(--color-border)]">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
          You Might Also Enjoy
        </h2>
        <span className="flex-1 h-[1px] bg-[var(--color-border)]" />
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(0, 3).map((post) => {
          const hasImage = post.mainImage?.asset

          return (
            <article key={post._id} className="group">
              <Link href={`/posts/${post.slug.current}`} className="block">
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden rounded-sm mb-4 bg-[var(--color-surface)]">
                  {hasImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(480).height(320).quality(80).url()}
                      alt={post.title}
                      fill
                      className="
                        object-cover
                        transition-transform duration-700 ease-out
                        group-hover:scale-105
                      "
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-border)]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-10 h-10 text-[var(--color-border)]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Date */}
                {post.publishedAt && (
                  <time
                    dateTime={post.publishedAt}
                    className="
                      text-[0.7rem] font-medium tracking-[0.1em] uppercase
                      text-[var(--color-muted)] mb-2 block
                      font-sans
                    "
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                )}

                {/* Title */}
                <h3
                  className="
                    text-lg font-bold leading-snug
                    text-[var(--color-primary)] mb-2
                    transition-colors duration-300
                    group-hover:text-[var(--color-accent)]
                  "
                >
                  {post.title}
                </h3>

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed line-clamp-2 font-sans">
                    {post.excerpt}
                  </p>
                )}
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
