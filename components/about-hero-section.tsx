"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function AboutHeroSection() {
  const t = useTranslations("aboutPage")

  return (
    <section className="relative w-full pt-[300px] pb-24 overflow-hidden min-h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/hands - about us.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 rtl:bg-gradient-to-l"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            {t("heroTitle")} <span className="text-accent">{t("heroAccent")}</span>.
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">{t("heroSubtitle")}</p>
          <div className="flex flex-row items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 md:px-8 md:py-4 bg-accent text-primary font-semibold hover:bg-accent/90 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
            >
              {t("freeConsultation")}
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 md:px-8 md:py-4 border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300 rounded-lg"
            >
              {t("ourServices")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
