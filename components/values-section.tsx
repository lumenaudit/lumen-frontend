"use client"

import { useTranslations } from "next-intl"

const ValueIcon = ({ valueId }: { valueId: string }) => {
  const iconClass = "w-8 h-8"

  switch (valueId) {
    case "integrity":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    case "excellence":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    case "innovation":
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
        </svg>
      )
    case "partnership":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    default:
      return null
  }
}

const valueIds = ["integrity", "excellence", "innovation", "partnership"]

export function ValuesSection() {
  const t = useTranslations("values")
  const items = t.raw("items") as Array<{ title: string; description: string }>

  return (
    <section className="relative py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-2xl md:text-3xl font-extrabold text-accent uppercase tracking-wider mb-6">
            {t("label")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((value, index) => {
            const valueId = valueIds[index]
            const iconColor =
              valueId === "innovation" || valueId === "partnership" ? "text-accent" : "text-primary"

            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-primary/10 hover:border-accent/40 group"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                    <div className={iconColor}>
                      <ValueIcon valueId={valueId} />
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4 text-center group-hover:text-accent transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center">{value.description}</p>
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>
    </section>
  )
}
