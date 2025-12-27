import { groq } from 'next-sanity'

// Query to get all blog posts
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "category": categories[0]->title,
  "date": publishedAt,
  description,
  excerpt,
  "image": image,
  "content": body,
  "author": author->name,
  readTime
}`

// Query to get a single blog post by slug
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "category": categories[0]->title,
  "date": publishedAt,
  description,
  excerpt,
  "image": image,
  "content": body,
  "author": author->name,
  readTime
}`

// Query to get all blog post slugs (for static generation)
export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)] {
  "slug": slug.current
}`

