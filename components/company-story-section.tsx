"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

export function CompanyStorySection() {
  const t = useTranslations("aboutPage")
  const tAbout = useTranslations("about")

  return (
    <section className="relative py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="relative w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full h-[700px] md:h-[800px]">
              <Image
                src="/img 5.jpeg"
                alt={tAbout("imageAlt")}
                width={1600}
                height={1200}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -end-6 w-64 h-64 opacity-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                <path d="M 0 200 Q 50 150 100 100 T 200 0 L 200 200 Z" fill="rgba(184, 157, 24, 0.3)" />
              </svg>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
              {t("storyTitle")}
            </h2>
            <div className="w-32 h-1 bg-accent mb-6"></div>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">{t("storyParagraph1")}</p>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">{t("storyParagraph2")}</p>

            <div className="space-y-4">
              {(["point1", "point2", "point3"] as const).map((key) => (
                <div key={key} className="flex gap-4">
                  <div className="h-2 w-2 bg-accent flex-shrink-0 mt-1.5"></div>
                  <p className="text-primary font-semibold">{tAbout(key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>
    </section>
  )
}
