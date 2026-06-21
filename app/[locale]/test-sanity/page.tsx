// Test page to verify Sanity connection
export const dynamic = "force-dynamic"

import { getAllBlogs, getBlogBySlug } from "@/lib/blogs-data"

export default async function TestSanityPage() {
  let allBlogs: any[] = []
  let testBlog: any = null
  let error: string | null = null

  try {
    allBlogs = await getAllBlogs()
    testBlog = await getBlogBySlug("test")
  } catch (e: any) {
    error = e.message || String(e)
    console.error("Sanity test error:", e)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sanity Connection Test</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Environment Variables:</h2>
          <pre className="text-sm">
            {JSON.stringify({
              projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "NOT SET",
              dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "NOT SET",
            }, null, 2)}
          </pre>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h2 className="font-bold mb-2">Error:</h2>
            <pre className="text-sm">{error}</pre>
          </div>
        )}

        <div className="bg-blue-100 p-4 rounded">
          <h2 className="font-bold mb-2">All Blogs Count: {allBlogs.length}</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(allBlogs, null, 2)}
          </pre>
        </div>

        <div className="bg-green-100 p-4 rounded">
          <h2 className="font-bold mb-2">Test Blog (slug: "test"):</h2>
          <pre className="text-sm overflow-auto">
            {JSON.stringify(testBlog, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

