export const dynamic = "force-dynamic"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogsListingSection } from "@/components/blogs-listing-section"
import { getAllBlogs } from "@/lib/blogs-data"
import { setRequestLocale } from "next-intl/server"

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const blogs = await getAllBlogs()

  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <BlogsListingSection blogs={blogs} />
      <Footer />
    </main>
  )
}
