import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface PostCardProps {
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
    month: 'short',
    day: 'numeric',
  })
}

export default function PostCard({ post }: PostCardProps) {
  const hasImage = post.mainImage?.asset

  return (
    <article className="group relative flex flex-col h-full">
      <Link
        href={`/posts/${post.slug.current}`}
        className="flex flex-col h-full"
      >
        {/* Image container */}
        <div className="relative aspect-[3/2] overflow-hidden rounded-sm mb-5 bg-[var(--color-surface)]">
          {hasImage ? (
            <Image
              src={urlFor(post.mainImage).width(720).height(480).quality(80).url()}
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
            /* Placeholder gradient when no image */
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-border)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-[var(--color-border)]"
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

          {/* Category badges overlaid on image */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category._id}
                  className="
                    text-[0.65rem] font-semibold tracking-[0.15em] uppercase
                    text-white bg-[var(--color-primary)]/70 backdrop-blur-sm
                    px-3 py-1 rounded-sm
                  "
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Date */}
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="
                text-[0.75rem] font-medium tracking-[0.1em] uppercase
                text-[var(--color-muted)] mb-2
                font-sans
              "
            >
              {formatDate(post.publishedAt)}
            </time>
          )}

          {/* Title */}
          <h3
            className="
              text-xl md:text-[1.35rem] font-bold leading-snug
              text-[var(--color-primary)] mb-3
              transition-colors duration-300
              group-hover:text-[var(--color-accent)]
            "
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p
              className="
                text-sm text-[var(--color-muted)] leading-relaxed
                line-clamp-3 mb-4 flex-1
                font-sans
              "
            >
              {post.excerpt}
            </p>
          )}

          {/* Author row */}
          {post.author && (
            <div className="flex items-center gap-2.5 mt-auto pt-4 border-t border-[var(--color-border)]/60">
              {post.author.image?.asset && (
                <Image
                  src={urlFor(post.author.image).width(28).height(28).url()}
                  alt={post.author.name}
                  width={28}
                  height={28}
                  className="rounded-full object-cover"
                />
              )}
              <span className="text-xs font-medium text-[var(--color-muted)] font-sans">
                {post.author.name}
              </span>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
