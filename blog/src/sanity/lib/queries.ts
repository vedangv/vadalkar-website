import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt asc) {
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

export const paginatedPostsQuery = groq`
  *[_type == "post"] | order(publishedAt asc) [$start...$end] {
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

export const postCountQuery = groq`
  count(*[_type == "post"])
`

export const featuredPostQuery = groq`
  *[_type == "post"] | order(publishedAt asc) [0] {
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
  *[_type == "post" && $categoryId in categories[]->_id] | order(publishedAt asc) {
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

export const relatedPostsQuery = groq`
  *[_type == "post" && _id != $postId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    mainImage,
    excerpt,
    publishedAt
  }
`

export const adjacentPostsQuery = groq`{
  "prev": *[_type == "post" && publishedAt < $publishedAt] | order(publishedAt desc) [0] {
    _id,
    title,
    slug
  },
  "next": *[_type == "post" && publishedAt > $publishedAt] | order(publishedAt asc) [0] {
    _id,
    title,
    slug
  }
}`

export const searchPostsQuery = groq`
  *[_type == "post"] | order(publishedAt asc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt
  }
`
