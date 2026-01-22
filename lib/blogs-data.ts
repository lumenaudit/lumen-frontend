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
  
  // Split into lines for better processing
  const lines = markdown.split('\n')
  let html = ''
  let inList = false
  let listItems: string[] = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Skip empty lines
    if (!line) {
      if (inList && listItems.length > 0) {
        // Close the list
        html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
        listItems.forEach(item => {
          // Process bold text within list items
          const processedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          html += `<li class="text-foreground/80">${processedItem}</li>`
        })
        html += '</ul>'
        listItems = []
        inList = false
      }
      continue
    }
    
    // Numbered sections (1., 2., etc.)
    const numberedSectionMatch = line.match(/^(\d+)\.\s+(.+)$/)
    if (numberedSectionMatch) {
      if (inList && listItems.length > 0) {
        html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
        listItems.forEach(item => {
          const processedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          html += `<li class="text-foreground/80">${processedItem}</li>`
        })
        html += '</ul>'
        listItems = []
        inList = false
      }
      const title = numberedSectionMatch[2].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html += `<h4 class="text-3xl font-bold mt-8 mb-4 text-primary">${numberedSectionMatch[1]}. ${title}</h4>`
      continue
    }
    
    // Headers
    if (line.startsWith('### ')) {
      if (inList && listItems.length > 0) {
        html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
        listItems.forEach(item => {
          const processedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          html += `<li class="text-foreground/80">${processedItem}</li>`
        })
        html += '</ul>'
        listItems = []
        inList = false
      }
      const title = line.substring(4).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html += `<p class="mb-4 text-foreground/80 leading-relaxed font-semibold">${title}</p>`
      continue
    }
    
    if (line.startsWith('## ')) {
      if (inList && listItems.length > 0) {
        html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
        listItems.forEach(item => {
          const processedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          html += `<li class="text-foreground/80">${processedItem}</li>`
        })
        html += '</ul>'
        listItems = []
        inList = false
      }
      const title = line.substring(3).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html += `<h2 class="text-3xl font-bold mt-8 mb-4 text-primary">${title}</h2>`
      continue
    }
    
    if (line.startsWith('# ')) {
      if (inList && listItems.length > 0) {
        html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
        listItems.forEach(item => {
          const processedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          html += `<li class="text-foreground/80">${processedItem}</li>`
        })
        html += '</ul>'
        listItems = []
        inList = false
      }
      const title = line.substring(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html += `<h1 class="text-4xl font-bold mt-8 mb-6 text-primary">${title}</h1>`
      continue
    }
    
    // Bullet points (starting with -, *, or •)
    const bulletMatch = line.match(/^[\-\*\•]\s+(.+)$/)
    if (bulletMatch) {
      inList = true
      listItems.push(bulletMatch[1])
      continue
    }
    
    // Regular paragraph
    if (inList && listItems.length > 0) {
      html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
      listItems.forEach(item => {
        const processedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        html += `<li class="text-foreground/80">${processedItem}</li>`
      })
      html += '</ul>'
      listItems = []
      inList = false
    }
    
    // Process bold and italic in paragraphs
    let processedLine = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
    
    html += `<p class="mb-4 text-foreground/80 leading-relaxed">${processedLine}</p>`
  }
  
  // Close any remaining list
  if (inList && listItems.length > 0) {
    html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
    listItems.forEach(item => {
      const processedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html += `<li class="text-foreground/80">${processedItem}</li>`
    })
    html += '</ul>'
  }
  
  return html || '<p class="mb-4 text-foreground/80">No content available.</p>'
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
    let inList = false
    let listItems: string[] = []
    
    for (const block of content) {
      if (block._type === 'block') {
        // Process children to handle bold/italic marks
        let blockText = ''
        if (block.children && Array.isArray(block.children)) {
          blockText = block.children.map((child: any) => {
            let text = child.text || ''
            // Handle marks (bold, italic, etc.)
            if (child.marks && Array.isArray(child.marks)) {
              child.marks.forEach((mark: string) => {
                if (mark === 'strong' || mark === 'bold') {
                  text = `<strong>${text}</strong>`
                } else if (mark === 'em' || mark === 'italic') {
                  text = `<em>${text}</em>`
                }
              })
            }
            return text
          }).join('')
        }
        
        if (blockText) {
          const style = block.style || 'normal'
          const listItem = block.listItem
          
          // Handle list items
          if (listItem) {
            inList = true
            listItems.push(blockText)
            continue
          } else {
            // Close any open list
            if (inList && listItems.length > 0) {
              html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
              listItems.forEach(item => {
                html += `<li class="text-foreground/80">${item}</li>`
              })
              html += '</ul>'
              listItems = []
              inList = false
            }
          }
          
          // Check for numbered sections (1., 2., etc.)
          const numberedMatch = blockText.match(/^(\d+)\.\s+(.+)$/)
          if (numberedMatch) {
            html += `<h4 class="text-3xl font-bold mt-8 mb-4 text-primary">${numberedMatch[1]}. ${numberedMatch[2]}</h4>`
          } else if (style === 'h1') {
            html += `<h1 class="text-4xl font-bold mt-8 mb-6 text-primary">${blockText}</h1>`
          } else if (style === 'h2') {
            html += `<h2 class="text-3xl font-bold mt-8 mb-4 text-primary">${blockText}</h2>`
          } else if (style === 'h3') {
            html += `<h3 class="text-2xl font-bold mt-6 mb-4 text-primary">${blockText}</h3>`
          } else {
            html += `<p class="mb-4 text-foreground/80 leading-relaxed">${blockText}</p>`
          }
        }
      }
    }
    
    // Close any remaining list
    if (inList && listItems.length > 0) {
      html += '<ul class="list-disc list-inside mb-4 space-y-2 ml-4">'
      listItems.forEach(item => {
        html += `<li class="text-foreground/80">${item}</li>`
      })
      html += '</ul>'
    }
    
    return html || '<p class="mb-4 text-foreground/80">No content available.</p>'
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
    date: formatDate(post.date),
    description: post.description || post.excerpt || '',
    image: post.image ? urlFor(post.image).width(1200).height(630).url() : '/placeholder.jpg',
    content: convertContentToHtml(post.content),
    author: post.author || 'Lumen Team',
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
