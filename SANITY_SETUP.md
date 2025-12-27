# Sanity CMS Integration Setup

This project is integrated with Sanity CMS for content management. Follow these steps to set up your environment.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=k11cg68q
NEXT_PUBLIC_SANITY_DATASET=production
```

## Current Sanity Project

- **Project ID**: `k11cg68q`
- **Project Name**: Lumen Audit
- **Dataset**: `production`

## Content Types

The frontend is configured to work with the following Sanity content types:

### Blog Posts (`post`)
- `title` (string)
- `slug` (slug)
- `publishedAt` (datetime)
- `description` (string)
- `excerpt` (string)
- `image` (image)
- `body` (portable text or string)
- `author` (reference to author)
- `categories` (array of references)
- `readTime` (string)

## Query Structure

The Sanity queries are located in `lib/sanity/queries.ts`:
- `postsQuery` - Fetches all blog posts
- `postBySlugQuery` - Fetches a single post by slug
- `postSlugsQuery` - Fetches all post slugs for static generation

## Image Handling

Sanity images are automatically processed using `@sanity/image-url`. Images are fetched from the Sanity CDN and optimized for web delivery.

## Development

1. Make sure your `.env.local` file is configured with the correct project ID and dataset
2. Run `npm run dev` to start the development server
3. Blog posts will be fetched from Sanity automatically

## Troubleshooting

If you encounter issues:

1. **No blogs showing**: Check that you have published posts in your Sanity Studio
2. **Image errors**: Verify that images are properly uploaded in Sanity
3. **Query errors**: Check the browser console and server logs for GROQ query errors

## Next Steps

- Add more content types (services, testimonials, etc.)
- Implement Portable Text rendering for rich content
- Add image optimization if needed
- Set up preview mode for draft content

