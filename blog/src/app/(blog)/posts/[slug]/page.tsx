import { client } from '@/sanity/lib/client'
import { postBySlugQuery, adjacentPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import ShareButtons from '@/components/ShareButtons'
import PostNavigation from '@/components/PostNavigation'
import Comments from '@/components/Comments'

export const revalidate = 60

/* ============================================
   Static Params Generation
   ============================================ */

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(groq`*[_type == "post"]{ slug }`)
    return posts.map((post: any) => ({ slug: post.slug.current }))
  } catch {
    return []
  }
}

/* ============================================
   Metadata
   ============================================ */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const post = await client.fetch(postBySlugQuery, { slug })
    if (!post) return { title: 'Post Not Found' }

    const siteUrl = 'https://blog-seven-murex-93.vercel.app'
    const ogImageUrl = `${siteUrl}/og?title=${encodeURIComponent(post.title)}`
    const postUrl = `${siteUrl}/posts/${slug}`
    const mainImageUrl = post.mainImage?.asset
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : null

    return {
      title: post.title,
      description: post.excerpt || '',
      openGraph: {
        title: post.title,
        description: post.excerpt || '',
        url: postUrl,
        type: 'article',
        publishedTime: post.publishedAt,
        images: [{ url: mainImageUrl || ogImageUrl, width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || '',
        images: [mainImageUrl || ogImageUrl],
      },
    }
  } catch {
    return { title: 'Post Not Found' }
  }
}

/* ============================================
   Helper
   ============================================ */

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function estimateReadTime(body: any[]): number {
  if (!body) return 1
  const text = body
    .filter((block: any) => block._type === 'block')
    .map((block: any) =>
      block.children?.map((child: any) => child.text || '').join('') || ''
    )
    .join(' ')
  const wordCount = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 230))
}

/* ============================================
   Page Component
   ============================================ */

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let post: any = null
  let adjacentPosts: { prev: any; next: any } = { prev: null, next: null }

  try {
    post = await client.fetch(postBySlugQuery, { slug })
  } catch {
    // Sanity not configured or unreachable
  }

  if (!post) {
    notFound()
  }

  // Fetch previous and next posts in chronological order
  try {
    if (post.publishedAt) {
      adjacentPosts = await client.fetch(adjacentPostsQuery, {
        publishedAt: post.publishedAt,
      })
    }
  } catch {
    // Silently fail — navigation is not critical
  }

  const hasMainImage = post.mainImage?.asset
  const readTime = estimateReadTime(post.body)

  return (
    <article>
      {/* ============================================
          Hero Section
          ============================================ */}
      <header className="relative">
        {hasMainImage ? (
          /* Hero with background image */
          <div className="relative min-h-[50vh] md:min-h-[65vh] flex items-end overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(1920).height(1080).quality(85).url()}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/90 via-[#1a1a2e]/40 to-transparent" />

            {/* Content over image */}
            <div className="relative z-10 w-full pb-14 pt-32 md:pb-20 md:pt-40">
              <div className="mx-auto max-w-3xl px-6 lg:px-8">
                {/* Category badges */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-5">
                    {post.categories.map((category: any) => (
                      <Link
                        key={category._id}
                        href={`/categories/${category.slug.current}`}
                        className="
                          text-[0.65rem] font-semibold tracking-[0.2em] uppercase
                          text-[var(--color-accent)] bg-[var(--color-accent)]/10
                          px-3 py-1 rounded-sm
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
                    text-3xl sm:text-4xl md:text-5xl
                    font-bold tracking-tight leading-[1.1]
                    text-white mb-6
                  "
                >
                  {post.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                  {/* Author */}
                  {post.author && (
                    <div className="flex items-center gap-2.5">
                      {post.author.image?.asset && (
                        <Image
                          src={urlFor(post.author.image).width(36).height(36).url()}
                          alt={post.author.name}
                          width={36}
                          height={36}
                          className="rounded-full object-cover ring-2 ring-white/20"
                        />
                      )}
                      <span className="font-medium text-white/90">{post.author.name}</span>
                    </div>
                  )}

                  {post.author && post.publishedAt && (
                    <span className="text-white/30">|</span>
                  )}

                  {/* Date */}
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt} className="font-sans">
                      {formatDate(post.publishedAt)}
                    </time>
                  )}

                  <span className="text-white/30">|</span>

                  {/* Read time */}
                  <span className="font-sans">
                    {readTime} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Hero without image — clean typography-focused */
          <div className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[var(--color-background)]">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
              {/* Category badges */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {post.categories.map((category: any) => (
                    <Link
                      key={category._id}
                      href={`/categories/${category.slug.current}`}
                      className="
                        text-[0.65rem] font-semibold tracking-[0.2em] uppercase
                        text-[var(--color-accent)]
                        px-3 py-1 rounded-sm
                        border border-[var(--color-accent)]/30
                        hover:bg-[var(--color-accent)]/10
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
                  text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem]
                  font-bold tracking-tight leading-[1.1]
                  text-[var(--color-primary)] mb-6
                "
              >
                {post.title}
              </h1>

              {/* Excerpt / subtitle */}
              {post.excerpt && (
                <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed mb-8 max-w-2xl font-sans">
                  {post.excerpt}
                </p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
                {/* Author */}
                {post.author && (
                  <div className="flex items-center gap-2.5">
                    {post.author.image?.asset && (
                      <Image
                        src={urlFor(post.author.image).width(36).height(36).url()}
                        alt={post.author.name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover ring-2 ring-[var(--color-border)]"
                      />
                    )}
                    <span className="font-medium text-[var(--color-primary)]">{post.author.name}</span>
                  </div>
                )}

                {post.author && post.publishedAt && (
                  <span className="text-[var(--color-border)]">|</span>
                )}

                {/* Date */}
                {post.publishedAt && (
                  <time dateTime={post.publishedAt} className="font-sans">
                    {formatDate(post.publishedAt)}
                  </time>
                )}

                <span className="text-[var(--color-border)]">|</span>

                {/* Read time */}
                <span className="font-sans">
                  {readTime} min read
                </span>
              </div>

              {/* Decorative separator */}
              <div className="mt-12 h-[2px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/40 to-transparent" />
            </div>
          </div>
        )}

        {/* Accent line after hero image */}
        {hasMainImage && (
          <div className="h-[3px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />
        )}
      </header>

      {/* ============================================
          Article Body
          ============================================ */}
      <div className="py-16 md:py-20">
        <div className="mx-auto max-w-[680px] px-6 lg:px-8">
          {/* Portable text content */}
          {post.body ? (
            <PortableTextRenderer value={post.body} />
          ) : (
            <p className="text-[var(--color-muted)] italic text-center py-12 font-sans">
              This post has no content yet.
            </p>
          )}

          {/* ============================================
              Share Buttons
              ============================================ */}
          <div className="mt-14 pt-8 border-t border-[var(--color-border)]">
            <ShareButtons title={post.title} slug={post.slug.current} />
          </div>

          {/* ============================================
              Prev / Next Navigation
              ============================================ */}
          <PostNavigation prev={adjacentPosts.prev} next={adjacentPosts.next} />

          {/* ============================================
              Author Bio
              ============================================ */}
          {post.author && (
            <div className="mt-14 pt-10 border-t border-[var(--color-border)]">
              <div className="flex items-start gap-5">
                {post.author.image?.asset && (
                  <Image
                    src={urlFor(post.author.image).width(72).height(72).url()}
                    alt={post.author.name}
                    width={72}
                    height={72}
                    className="rounded-full object-cover flex-shrink-0 ring-2 ring-[var(--color-border)]"
                  />
                )}
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-muted)] mb-1 font-sans">
                    Written by
                  </p>
                  <p className="text-xl font-bold text-[var(--color-primary)] mb-2">
                    {post.author.name}
                  </p>
                  {post.author.bio && (
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed font-sans">
                      {typeof post.author.bio === 'string'
                        ? post.author.bio
                        : Array.isArray(post.author.bio)
                          ? post.author.bio
                              .map((block: any) =>
                                block.children?.map((child: any) => child.text || '').join('') || ''
                              )
                              .join(' ')
                          : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================
          Comments
          ============================================ */}
      <div className="mx-auto max-w-[680px] px-6 lg:px-8 pb-16">
        <Comments
          pageId={post._id}
          pageTitle={post.title}
          pageUrl={`https://blog-seven-murex-93.vercel.app/posts/${post.slug.current}`}
        />
      </div>
    </article>
  )
}
