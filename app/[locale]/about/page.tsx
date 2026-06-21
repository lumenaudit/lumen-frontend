import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutHeroSection } from "@/components/about-hero-section"
import { CompanyStorySection } from "@/components/company-story-section"
import { ValuesSection } from "@/components/values-section"
import { ProcessSection } from "@/components/process-section"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { buildLocaleMetadata } from "@/lib/metadata"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const tAbout = await getTranslations({ locale, namespace: "aboutPage" })
  return buildLocaleMetadata({
    locale,
    path: "about",
    title: `${tAbout("heroTitle")} ${tAbout("heroAccent")} | ${t("title")}`,
    description: tAbout("heroSubtitle"),
  })
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="min-h-screen bg-transparent">
      <div className="relative">
        <Navbar />
        <AboutHeroSection />
      </div>
      <CompanyStorySection />
      <ValuesSection />
      <ProcessSection />
      <Footer />
    </main>
  )
}
