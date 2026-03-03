import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://reflections.blog'

  let posts: any[] = []
  let categories: any[] = []

  try {
    posts = await client.fetch(groq`*[_type == "post"]{ slug, _updatedAt }`)
    categories = await client.fetch(groq`*[_type == "category"]{ slug, _updatedAt }`)
  } catch {
    // Sanity not configured yet
  }

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug.current}`,
    lastModified: new Date(cat._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...postUrls,
    ...categoryUrls,
  ]
}
