import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import FeaturedPost from '@/components/FeaturedPost'
import PostCard from '@/components/PostCard'
import NewsletterForm from '@/components/NewsletterForm'

export const revalidate = 60

export default async function HomePage() {
  let posts: any[] = []

  try {
    posts = await client.fetch(postsQuery)
  } catch {
    // Sanity not configured yet or unreachable — show empty state gracefully
  }

  if (!posts || posts.length === 0) {
    return <EmptyState />
  }

  const [featured, ...rest] = posts

  return (
    <>
      {/* Hero / Featured Post */}
      {featured && <FeaturedPost post={featured} />}

      {/* Recent Posts Grid */}
      {rest.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-14">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
                Recent Stories
              </h2>
              <span className="flex-1 h-[1px] bg-[var(--color-border)]" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {rest.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA Section */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl mx-auto text-center">
            {/* Decorative element */}
            <div className="flex items-center justify-center mb-8">
              <span className="block w-5 h-5 border border-[var(--color-accent)] rotate-45 opacity-60" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Never Miss a Story
            </h2>
            <p className="text-[var(--color-muted)] text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto font-sans">
              Subscribe for thoughtful essays, personal reflections, and quiet
              moments worth sharing — delivered straight to your inbox.
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

/* ============================================
   Empty State — shown when no posts exist yet
   ============================================ */

function EmptyState() {
  return (
    <>
      {/* Hero empty state */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-surface)] to-[var(--color-background)]">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-60 h-60 rounded-full bg-[var(--color-accent)]/3 blur-2xl" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          {/* Decorative line */}
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

          <p className="text-base text-[var(--color-muted)]/70 font-sans">
            In the meantime, why not subscribe to be the first to know?
          </p>

          {/* Decorative dots */}
          <div className="flex items-center justify-center gap-2 mt-12 mb-4">
            <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]/40" />
            <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]/60" />
            <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]" />
            <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]/60" />
            <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]/40" />
          </div>
        </div>
      </section>

      {/* Newsletter CTA — extra important when there are no posts */}
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
