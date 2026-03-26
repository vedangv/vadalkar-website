import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'

const SITE_URL = 'https://blog-seven-murex-93.vercel.app'

export async function GET() {
  let posts: any[] = []
  try {
    posts = await client.fetch(postsQuery)
  } catch {
    posts = []
  }

  const escapeCdata = (s: string) => s.replace(/]]>/g, ']]]]><![CDATA[>')

  const rssItems = posts.map((post: any) => `
    <item>
      <title><![CDATA[${escapeCdata(post.title || '')}]]></title>
      <link>${SITE_URL}/posts/${post.slug.current}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${post.slug.current}</guid>
      <description><![CDATA[${escapeCdata(post.excerpt || '')}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Reflections — कीर्ती वडाळकर</title>
    <link>${SITE_URL}</link>
    <description>जगाच्या पाठीवर... कधीतरी कुठेतरी — Marathi travel letters by कीर्ती वडाळकर</description>
    <language>mr</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
