# Debugging Sanity Integration

## Quick Test Steps

### 1. Verify Environment Variables
Make sure your `.env.local` file has:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=k11cg68q
NEXT_PUBLIC_SANITY_DATASET=production
```

### 2. Restart Your Development Server
After setting environment variables, you MUST restart the server:
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
# or
yarn dev
```

### 3. Test the Connection
Visit: `http://localhost:3001/test-sanity`

This page will show:
- Environment variables status
- All blogs fetched from Sanity
- The specific "test" blog post
- Any errors that occur

### 4. Check Server Logs
Look at your terminal where the dev server is running. You should see:
- `Fetching blog with slug: test`
- `Blog found: Yes` or `Blog found: No`

### 5. Check Browser Console
Open browser DevTools (F12) and check:
- Console tab for any errors
- Network tab to see if Sanity API calls are being made

### 6. Verify the Blog Post Exists
The blog post with slug "test" should exist in your Sanity Studio. Check:
- Title: "test"
- Slug: "test"
- Published status: Should be published

## Common Issues

### Issue: 404 Error
**Possible causes:**
1. Server not restarted after adding environment variables
2. Blog post doesn't exist or isn't published
3. Slug mismatch (check exact slug in Sanity)

**Solution:**
1. Restart the dev server
2. Visit `/test-sanity` to see what's being fetched
3. Check server logs for errors

### Issue: Empty Results
**Possible causes:**
1. Environment variables not loaded
2. Wrong project ID or dataset
3. No published posts in Sanity

**Solution:**
1. Verify `.env.local` file exists and has correct values
2. Restart server
3. Check Sanity Studio for published posts

### Issue: Network Errors
**Possible causes:**
1. CORS issues
2. Invalid API credentials
3. Network connectivity

**Solution:**
1. Check browser Network tab for failed requests
2. Verify project ID is correct
3. Check Sanity project settings

## Testing Checklist

- [ ] `.env.local` file exists with correct values
- [ ] Development server restarted after env changes
- [ ] `/test-sanity` page loads and shows data
- [ ] `/blogs` page shows blog posts
- [ ] `/blogs/test` page loads (not 404)
- [ ] Server logs show no errors
- [ ] Browser console shows no errors

