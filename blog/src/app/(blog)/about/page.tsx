import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import PortableTextRenderer from '@/components/PortableTextRenderer'

const authorQuery = groq`*[_type == "author"][0] {
  name,
  image,
  bio
}`

export const revalidate = 60

export const metadata = {
  title: 'About',
  description: 'Learn more about the author and this blog.',
}

export default async function AboutPage() {
  let author: any = null
  try {
    author = await client.fetch(authorQuery)
  } catch {
    // Graceful fallback if Sanity is not configured
  }

  return (
    <>
      {/* ============================================
          Hero Section
          ============================================ */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Decorative accent line */}
          <div className="flex items-center mb-10">
            <span className="block w-12 h-[1.5px] bg-[var(--color-accent)]" />
          </div>

          <h1
            className="
              text-4xl sm:text-5xl md:text-6xl
              font-bold tracking-tight leading-[1.1]
              text-[var(--color-primary)] mb-6
            "
          >
            The Story Behind
            <br />
            <span className="text-[var(--color-accent)]">the Words</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed max-w-2xl font-sans">
            Every piece of writing carries a world within it &mdash; the quiet
            observations, the lived moments, and the gentle hope that
            words might connect us.
          </p>

          {/* Decorative separator */}
          <div className="mt-14 h-[2px] bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-accent)]/40 to-transparent" />
        </div>
      </section>

      {/* ============================================
          Author Section
          ============================================ */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {author ? (
            <AuthorSection author={author} />
          ) : (
            <AuthorPlaceholder />
          )}
        </div>
      </section>

      {/* ============================================
          Personal Touch / Mission Section
          ============================================ */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl mx-auto">
            {/* Section heading */}
            <div className="flex items-center gap-4 mb-12">
              <span className="block w-5 h-5 border border-[var(--color-accent)] rotate-45 opacity-60" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                This Space
              </h2>
              <span className="flex-1 h-[1px] bg-[var(--color-border)]" />
            </div>

            <div className="space-y-6 text-lg leading-[1.8] text-[var(--color-primary)]/90 font-sans">
              <p>
                This is a space for slowing down. In a world that moves
                relentlessly forward, these pages are an invitation to pause
                &mdash; to sit with a thought, to linger over a feeling, to find
                beauty in the small and the overlooked.
              </p>
              <p>
                Here you will find reflections on everyday life, quiet essays on
                what it means to be present, and stories drawn from the textures
                of ordinary days. Some pieces are deeply personal; others reach
                outward, hoping to touch something universal.
              </p>
              <p>
                Writing, for me, has always been a way of understanding &mdash;
                of making sense of the world by turning experience into words.
                If even one sentence resonates with you, if it makes you feel a
                little less alone in your own experience, then these words have
                found their purpose.
              </p>
            </div>

            {/* Decorative dots */}
            <div className="flex items-center gap-2 mt-14">
              <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]/40" />
              <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]/60" />
              <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]" />
              <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]/60" />
              <span className="block w-1 h-1 rounded-full bg-[var(--color-accent)]/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Values / Closing Section
          ============================================ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Thank You for Being Here
            </h2>
            <p className="text-[var(--color-muted)] text-base md:text-lg leading-relaxed font-sans mb-8 max-w-md mx-auto">
              Whether you stumbled upon this corner of the internet or were
              led here by a friend, I&apos;m grateful you chose to stay
              and read.
            </p>
            <div className="flex items-center justify-center">
              <span className="block w-16 h-[1.5px] bg-[var(--color-accent)]" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ============================================
   Author Section — with Sanity data
   ============================================ */

function AuthorSection({ author }: { author: any }) {
  const hasImage = author.image?.asset
  const hasBio = author.bio && Array.isArray(author.bio) && author.bio.length > 0

  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
      {/* Author photo */}
      {hasImage && (
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
          <div className="relative">
            <Image
              src={urlFor(author.image).width(400).height(480).quality(85).url()}
              alt={author.name || 'Author'}
              width={400}
              height={480}
              className="rounded-sm object-cover w-[280px] h-[340px] md:w-[320px] md:h-[400px]"
            />
            {/* Decorative frame offset */}
            <div
              className="
                absolute -bottom-3 -right-3 w-full h-full
                border border-[var(--color-accent)]/30
                rounded-sm -z-10
              "
            />
          </div>
        </div>
      )}

      {/* Author text content */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3 font-sans">
          About the Author
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-primary)] mb-6">
          {author.name || 'The Author'}
        </h2>

        {/* Bio from Sanity portable text */}
        {hasBio ? (
          <div className="prose-about">
            <PortableTextRenderer value={author.bio} />
          </div>
        ) : (
          <p className="text-lg leading-[1.8] text-[var(--color-primary)]/90 font-sans">
            {author.name ? `${author.name} is` : 'The author is'} the heart
            and voice behind this blog &mdash; a writer, thinker, and quiet
            observer of life&apos;s tender moments. More details coming soon.
          </p>
        )}
      </div>
    </div>
  )
}

/* ============================================
   Author Placeholder — when Sanity has no data
   ============================================ */

function AuthorPlaceholder() {
  return (
    <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
      {/* Placeholder image area */}
      <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
        <div className="relative">
          <div
            className="
              w-[280px] h-[340px] md:w-[320px] md:h-[400px]
              bg-[var(--color-surface)] rounded-sm
              flex items-center justify-center
            "
          >
            {/* Decorative placeholder content */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-16 h-16 text-[var(--color-accent)]/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={0.8}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501
                    20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676
                    0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <p className="text-sm text-[var(--color-muted)]/60 font-sans italic">
                Photo coming soon
              </p>
            </div>
          </div>
          {/* Decorative frame offset */}
          <div
            className="
              absolute -bottom-3 -right-3 w-full h-full
              border border-[var(--color-accent)]/30
              rounded-sm -z-10
            "
          />
        </div>
      </div>

      {/* Placeholder text */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3 font-sans">
          About the Author
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-primary)] mb-6">
          The Author
        </h2>
        <div className="space-y-5 text-lg leading-[1.8] text-[var(--color-primary)]/90 font-sans">
          <p>
            Behind every word on this blog is someone who believes in the
            power of quiet reflection &mdash; someone who finds meaning in
            the pauses between life&apos;s grand moments.
          </p>
          <p>
            The full story is still being written, and this page will soon be
            filled with a proper introduction. Until then, let the writing
            speak for itself.
          </p>
        </div>
      </div>
    </div>
  )
}
