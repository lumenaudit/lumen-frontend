import { client, urlFor } from './sanity/client'
import { postsQuery, postBySlugQuery, postSlugsQuery } from './sanity/queries'

export interface BlogPost {
  id: string
  slug: string
  title: string
  category: string
  date: string
  description: string
  image: string
  content: string
  author: string
  readTime: string
}

// Sanity post type (raw from API)
interface SanityPost {
  _id: string
  slug: string
  title: string
  category?: string | null
  date?: string | null
  description?: string | null
  excerpt?: string | null
  image?: any
  content?: any // Can be Portable Text or string
  author?: string | null
  readTime?: string | null
}

// Simple Markdown to HTML converter to avoid external dependencies for now
function simpleMarkdownToHtml(markdown: string): string {
  if (!markdown) return ""
  
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold mt-6 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mt-8 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Lists (basic support)
    .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
    // Paragraphs (double newlines)
    .replace(/\n\n/gim, '</p><p class="mb-4">')
    // Single newlines to breaks
    .replace(/\n/gim, '<br />')

  // Wrap in p tag if not starting with tag
  if (!html.trim().startsWith('<')) {
    html = `<p class="mb-4">${html}</p>`
  }
  
  return html
}

// Convert Sanity content to HTML
// Handles both Portable Text arrays and plain strings
function convertContentToHtml(content: any): string {
  if (!content) return ""
  
  // If it's already a string, treat as markdown/HTML
  if (typeof content === 'string') {
    return simpleMarkdownToHtml(content)
  }
  
  // If it's an array (Portable Text), convert to HTML
  if (Array.isArray(content)) {
    let html = ''
    for (const block of content) {
      if (block._type === 'block') {
        const text = block.children?.map((child: any) => child.text || '').join('') || ''
        if (text) {
          const style = block.style || 'normal'
          if (style === 'h1') {
            html += `<h1 class="text-4xl font-bold mt-8 mb-6">${text}</h1>`
          } else if (style === 'h2') {
            html += `<h2 class="text-3xl font-bold mt-8 mb-4">${text}</h2>`
          } else if (style === 'h3') {
            html += `<h3 class="text-2xl font-bold mt-6 mb-4">${text}</h3>`
          } else {
            html += `<p class="mb-4">${text}</p>`
          }
        }
      }
    }
    return html || '<p class="mb-4">No content available.</p>'
  }
  
  return '<p class="mb-4">No content available.</p>'
}

// Format date from ISO string to readable format
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Date not available'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

// Transform Sanity post to BlogPost
function transformSanityPost(post: SanityPost): BlogPost {
  return {
    id: post._id,
    slug: post.slug,
    title: post.title || 'Untitled',
    category: post.category || 'Uncategorized',
    date: formatDate(post.date),
    description: post.description || post.excerpt || '',
    image: post.image ? urlFor(post.image).width(1200).height(630).url() : '/placeholder.jpg',
    content: convertContentToHtml(post.content),
    author: post.author || 'LUMEN Team',
    readTime: post.readTime || '5 min read'
  }
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const posts: SanityPost[] = await client.fetch(postsQuery)
    return posts.map(transformSanityPost)
  } catch (error) {
    console.error('Error fetching blogs from Sanity:', error)
    return []
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post: SanityPost | null = await client.fetch(postBySlugQuery, { slug })
    if (!post) return undefined
    return transformSanityPost(post)
  } catch (error) {
    console.error('Error fetching blog by slug from Sanity:', error)
    return undefined
  }
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const slugs: { slug: string }[] = await client.fetch(postSlugsQuery)
    return slugs.map(item => item.slug)
  } catch (error) {
    console.error('Error fetching blog slugs from Sanity:', error)
    return []
  }
}
