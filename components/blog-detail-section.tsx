"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { BlogPost } from "@/lib/blogs-data"

interface BlogDetailSectionProps {
  blog: BlogPost
  relatedBlogs: BlogPost[]
}

export function BlogDetailSection({ blog, relatedBlogs }: BlogDetailSectionProps) {
  const t = useTranslations("blogs")

  return (
    <section className="relative py-24 bg-transparent pt-44">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors duration-300 mb-8 mt-4"
          >
            <svg className="w-5 h-5 icon-directional" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t("backToBlogs")}
          </Link>

          {blog.category && (
            <div className="mb-6">
              <div
                className="inline-block px-6 py-2.5 rounded-full text-white text-sm font-bold uppercase tracking-wider shadow-lg"
                style={{
                  background: `linear-gradient(135deg, rgba(153, 130, 20, 0.95) 0%, rgba(214, 191, 82, 0.9) 100%)`,
                }}
              >
                {blog.category}
              </div>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 tracking-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-primary/10">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-foreground/70">{blog.date}</span>
            </div>
          </div>

          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-12 shadow-xl">
            <Image src={blog.image} alt={blog.title} fill className="object-cover" />
          </div>

          <div className="max-w-none">
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          <div className="my-12 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>

          <div className="bg-white rounded-2xl p-8 border-2 border-primary/10 shadow-lg text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">{t("needGuidance")}</h3>
            <p className="text-foreground/70 mb-6">{t("ctaDescription")}</p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-cta-gradient hover:bg-cta-gradient-hover"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8 mt-12 lg:mt-0">
          <div className="sticky top-40">
            <h3 className="text-2xl font-bold text-primary mb-6 pb-2 border-b-2 border-accent inline-block">
              {t("relatedTitle")}
            </h3>

            <div className="space-y-6">
              {relatedBlogs.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blogs/${relatedPost.slug}`}
                  className="block group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-primary/5 hover:border-accent/30"
                >
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-accent mb-2 uppercase tracking-wide">
                      {relatedPost.category}
                    </p>
                    <h4 className="text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-tight">
                      {relatedPost.title}
                    </h4>
                  </div>
                </Link>
              ))}

              {relatedBlogs.length === 0 && (
                <p className="text-foreground/60 italic">{t("noRelated")}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>
    </section>
  )
}
