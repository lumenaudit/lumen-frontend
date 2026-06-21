import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { buildLocaleMetadata } from "@/lib/metadata"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const tContact = await getTranslations({ locale, namespace: "contact" })
  return buildLocaleMetadata({
    locale,
    path: "contact",
    title: `${tContact("heroLabel")} | ${t("title")}`,
    description: tContact("heroSubtitle"),
  })
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("contact")

  return (
    <main className="min-h-screen bg-transparent">
      <div className="relative">
        <Navbar />
        <section className="relative w-full pt-[140px] pb-24 overflow-hidden min-h-[500px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: "url('/modern-office-interior-saudi-arabia-financial-team.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 rtl:bg-gradient-to-l"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
            <div className="max-w-4xl">
              <div className="inline-block px-6 py-2.5 bg-cta-gradient rounded-full mb-6 shadow-md">
                <p className="text-sm font-bold text-white uppercase tracking-wider">{t("heroLabel")}</p>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
                {t("heroTitle")} <span className="text-accent">{t("heroAccent")}</span>
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">{t("heroSubtitle")}</p>
            </div>
          </div>
        </section>
      </div>
      <ContactSection />
      <Footer />
    </main>
  )
}
