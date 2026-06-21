import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { BlogPost } from "@/lib/blogs-data"

interface InsightsSectionProps {
  insights: BlogPost[]
}

export async function InsightsSection({ insights }: InsightsSectionProps) {
  const t = await getTranslations("insights")

  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {insights.map((insight) => (
            <Link
              key={insight.id}
              href={`/blogs/${insight.slug}`}
              className="relative group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-primary/10 hover:border-accent/40 block"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={insight.image}
                  alt={insight.category}
                  fill
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 start-4 z-10">
                  <div
                    className="px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, rgba(7, 29, 73, 0.95) 0%, rgba(184, 157, 24, 0.9) 100%)`,
                    }}
                  >
                    {insight.category}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-6">
                <p className="text-sm text-foreground/60 mb-3 font-medium">{insight.date}</p>
                <p className="text-foreground/80 leading-relaxed">{insight.description}</p>
              </div>

              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blogs"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-cta-gradient hover:bg-cta-gradient-hover"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>
    </section>
  )
}
