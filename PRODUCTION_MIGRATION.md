# Moving from Localhost to Production

## ✅ Good News: Your Code Doesn't Need Changes!

Your frontend code is already configured correctly. It uses **environment variables** that automatically adapt to different environments.

## What Changes When Moving to Production

### 1. **CORS Settings in Sanity** (Required)

You need to add your **production domain** to Sanity CORS settings:

**Current (Localhost):**
- ✅ `http://localhost:3000` (already added)
- ✅ `http://localhost:3001` (already added)

**Production (You Need to Add):**
- Add your production domain: `https://yourdomain.com`
- Or if using Vercel: `https://your-project.vercel.app`
- Or if using Netlify: `https://your-project.netlify.app`

**How to Add:**
```bash
# Replace with your actual production URL
npx sanity cors add https://your-production-domain.com
```

Or via Sanity Dashboard:
1. Go to https://sanity.io/manage
2. Select "Lumen Audit" project
3. Go to API → CORS origins
4. Add your production URL

### 2. **Environment Variables in Production Platform** (Required)

Add these in your deployment platform (Vercel/Netlify/etc.):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=k11cg68q
NEXT_PUBLIC_SANITY_DATASET=production
```

**For Vercel:**
1. Go to your project → Settings → Environment Variables
2. Add both variables
3. Select: Production, Preview, and Development

**For Netlify:**
1. Go to Site Settings → Environment Variables
2. Add both variables

### 3. **Code Changes: NONE!** ✅

Your code already uses environment variables:
- `lib/sanity/client.ts` reads from `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID`
- Works automatically in both localhost and production
- No code changes needed!

## Summary

| Item | Localhost | Production | Action Needed |
|------|-----------|------------|---------------|
| Code | ✅ Works | ✅ Works | **None** |
| CORS | ✅ Added | ❌ Need to add | Add production URL |
| Env Vars | ✅ `.env.local` | ❌ Platform settings | Add in Vercel/Netlify |

## Quick Checklist

Before deploying to production:

- [ ] Add production domain to Sanity CORS
- [ ] Add environment variables in deployment platform
- [ ] Test locally first (`npm run build`)
- [ ] Deploy and verify blogs load
- [ ] Check browser console for errors

## Example: If Deploying to Vercel

1. **Add CORS:**
   ```bash
   npx sanity cors add https://your-project.vercel.app
   ```

2. **Add Environment Variables in Vercel:**
   - Project → Settings → Environment Variables
   - Add `NEXT_PUBLIC_SANITY_PROJECT_ID` = `k11cg68q`
   - Add `NEXT_PUBLIC_SANITY_DATASET` = `production`

3. **Deploy:**
   - Push to GitHub (if connected)
   - Or run `vercel --prod`

4. **Verify:**
   - Visit your production URL
   - Check `/blogs` page loads
   - Check browser console for errors

That's it! Your code is already production-ready. 🚀

