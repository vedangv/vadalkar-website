import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Reflections',
    template: '%s | Reflections',
  },
  description: 'A personal lifestyle blog — stories, reflections, and little moments of beauty.',
  metadataBase: new URL('https://blog-seven-murex-93.vercel.app'),
  openGraph: {
    title: 'Reflections',
    description: 'A personal lifestyle blog — stories, reflections, and little moments of beauty.',
    siteName: 'Reflections',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
