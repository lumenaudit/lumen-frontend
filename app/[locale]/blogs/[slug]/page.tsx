export const dynamic = "force-dynamic"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogDetailSection } from "@/components/blog-detail-section"
import { getBlogBySlug, getAllBlogs } from "@/lib/blogs-data"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const blog = await getBlogBySlug(slug)
  const t = await getTranslations({ locale, namespace: "metadata" })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lumenaudit.com"

  if (!blog) {
    return { title: t("blogNotFound") }
  }

  const path = `/blogs/${slug}`

  return {
    title: `${blog.title} | ${t("title")}`,
    description: blog.description,
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: {
        en: `${baseUrl}/en${path}`,
        ar: `${baseUrl}/ar${path}`,
        "x-default": `${baseUrl}/en${path}`,
      },
    },
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const allBlogs = await getAllBlogs()
  const relatedBlogs = allBlogs.filter((b) => b.slug !== blog.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <BlogDetailSection blog={blog} relatedBlogs={relatedBlogs} />
      <Footer />
    </main>
  )
}
