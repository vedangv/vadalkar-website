import { groq } from 'next-sanity'
import { client } from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}

// Minimal type representing the transformed Sanity project
export type SanityProject = {
  title: string;
  category: string;
  client: string;
  architect?: string;
  year: string;
  cost?: string;
  slug?: string;
  featured?: boolean;
  description?: string;
  image?: string;
};

export async function getProjects(): Promise<SanityProject[]> {
  const projects = await client.fetch(groq`
    *[_type == "project"] | order(year desc) {
      title,
      category,
      client,
      architect,
      year,
      cost,
      "slug": slug.current,
      featured,
      description,
      image
    }
  `)
  
  return projects.map((p: any) => ({
    ...p,
    image: p.image ? urlFor(p.image).url() : undefined
  }))
}

export async function getProjectBySlug(slug: string): Promise<SanityProject | null> {
  const project = await client.fetch(groq`
    *[_type == "project" && slug.current == $slug][0] {
      title,
      category,
      client,
      architect,
      year,
      cost,
      "slug": slug.current,
      featured,
      description,
      image
    }
  `, { slug })
  
  if (!project) return null
  return {
    ...project,
    image: project.image ? urlFor(project.image).url() : undefined
  }
}

export async function getHomePage() {
  return await client.fetch(groq`*[_type == "homePage"][0]`)
}

export async function getAboutPage() {
  return await client.fetch(groq`*[_type == "aboutPage"][0]`)
}

export async function getContactPage() {
  return await client.fetch(groq`*[_type == "contactPage"][0]`)
}

export async function getSiteSettings() {
  return await client.fetch(groq`*[_type == "siteSettings"][0]`)
}
