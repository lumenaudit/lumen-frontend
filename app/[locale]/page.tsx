import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ClientsSection } from "@/components/clients-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { InsightsSection } from "@/components/insights-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { getAllBlogs } from "@/lib/blogs-data"
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
  return buildLocaleMetadata({
    locale,
    title: t("title"),
    description: t("description"),
  })
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const blogs = await getAllBlogs()
  const recentInsights = blogs.slice(0, 3)

  return (
    <main className="min-h-screen bg-transparent">
      <div className="relative">
        <Navbar />
        <HeroSection />
      </div>
      <AboutSection />
      <ServicesSection />
      <WhyChooseSection />
      <ClientsSection />
      <InsightsSection insights={recentInsights} />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
