import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-14 -mx-4 md:-mx-16 lg:-mx-24">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            width={1200}
            height={675}
            className="rounded-lg w-full"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-[var(--color-muted)] italic font-sans">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-[1.8] text-[var(--color-primary)]/90 font-sans">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold mt-16 mb-6 tracking-tight text-[var(--color-primary)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-[1.75rem] font-bold mt-12 mb-5 tracking-tight text-[var(--color-primary)]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-[1.35rem] font-bold mt-10 mb-4 tracking-tight text-[var(--color-primary)]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="
          relative my-10 pl-8 pr-4 py-2
          border-l-[3px] border-[var(--color-accent)]
          bg-[var(--color-surface)]/50
          rounded-r-sm
        "
      >
        <div className="text-xl md:text-[1.35rem] leading-[1.7] italic text-[var(--color-primary)]/80 font-serif">
          {children}
        </div>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--color-primary)]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline decoration-[var(--color-accent)]/40 underline-offset-4">
        {children}
      </span>
    ),
    link: ({ children, value }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')
      return (
        <a
          href={href}
          className="
            text-[var(--color-accent)] font-medium
            underline decoration-[var(--color-accent)]/30 underline-offset-3
            hover:decoration-[var(--color-accent)] hover:text-[var(--color-accent-hover)]
            transition-colors duration-200
          "
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 space-y-3 pl-1 font-sans">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 space-y-3 pl-1 font-sans list-none counter-reset-list">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-7 text-lg leading-[1.8] text-[var(--color-primary)]/90 before:content-[''] before:absolute before:left-0 before:top-[0.75em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[var(--color-accent)]">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="relative pl-7 text-lg leading-[1.8] text-[var(--color-primary)]/90 list-decimal list-inside">
        {children}
      </li>
    ),
  },
}

interface PortableTextRendererProps {
  value: any
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null

  return (
    <div className="portable-text">
      <PortableText value={value} components={components} />
    </div>
  )
}
