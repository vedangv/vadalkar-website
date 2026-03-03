import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, image }
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, image, bio }
  }
`

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const postsByCategoryQuery = groq`
  *[_type == "post" && $categoryId in categories[]->_id] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, image }
  }
`
