# Frontend Deployment Checklist for Sanity

Since you've deployed Sanity, here's what you need to check/configure in the frontend:

## ✅ Already Done

1. ✅ Sanity client configured (`lib/sanity/client.ts`)
2. ✅ GROQ queries set up (`lib/sanity/queries.ts`)
3. ✅ Blog data functions updated (`lib/blogs-data.ts`)
4. ✅ Environment variables configured (`.env.local`)
5. ✅ Next.js config updated for Sanity images
6. ✅ Route handlers fixed for Next.js 16

## 🔧 Required Actions

### 1. Configure CORS in Sanity (Important!)

Your frontend needs permission to access Sanity API. Add your frontend domain to Sanity CORS settings:

**For Local Development:**
- Add: `http://localhost:3000`
- Add: `http://localhost:3001` (if you're using port 3001)

**For Production:**
- Add your production domain (e.g., `https://yourdomain.com`)
- Add your Vercel/Netlify domain if deploying there

**How to add CORS:**
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project "Lumen Audit"
3. Go to API settings
4. Add your frontend URLs to the CORS origins list
5. Make sure "Allow credentials" is enabled

**Or use Sanity CLI:**
```bash
npx sanity cors add http://localhost:3001
npx sanity cors add https://your-production-domain.com
```

### 2. Environment Variables for Production

Make sure to add these environment variables in your deployment platform (Vercel, Netlify, etc.):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=k11cg68q
NEXT_PUBLIC_SANITY_DATASET=production
```

**For Vercel:**
- Go to Project Settings → Environment Variables
- Add both variables for Production, Preview, and Development

**For Netlify:**
- Go to Site Settings → Environment Variables
- Add both variables

### 3. Test the Integration

Before deploying, test locally:
1. Visit `http://localhost:3001/test-sanity` to verify connection
2. Visit `http://localhost:3001/blogs` to see blog listing
3. Visit `http://localhost:3001/blogs/test` to see a blog post

### 4. Build and Deploy

```bash
# Build the project
npm run build

# If build succeeds, deploy
# (Vercel/Netlify will auto-deploy on git push)
```

## 📋 Optional: Additional Content Types

Currently, only **blogs** are integrated with Sanity. You might want to also migrate:

- **Services** - Currently in `lib/services-data.ts` (static)
- **Testimonials** - If you have a testimonials section
- **Team Members** - If you have an about/team page
- **FAQs** - Currently might be static

## 🚀 Quick Verification

After deployment, verify:
1. ✅ Blog posts load from Sanity
2. ✅ Images display correctly
3. ✅ No CORS errors in browser console
4. ✅ Blog detail pages work
5. ✅ Home page insights section shows recent blogs

## 🔍 Troubleshooting

**If you see CORS errors:**
- Check Sanity CORS settings include your domain
- Verify environment variables are set in production

**If blogs don't load:**
- Check browser console for errors
- Verify Sanity project ID and dataset are correct
- Check that posts are published (not drafts) in Sanity

**If images don't load:**
- Verify `next.config.mjs` has Sanity CDN configured
- Check that images are uploaded in Sanity

## 📝 Next Steps (Optional)

1. **Add Portable Text rendering** - For rich text content
2. **Add preview mode** - To preview draft content
3. **Migrate services to Sanity** - Make services dynamic
4. **Add revalidation** - For ISR (Incremental Static Regeneration)

