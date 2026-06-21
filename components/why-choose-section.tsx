"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

export function WhyChooseSection() {
  const t = useTranslations("whyChoose")
  const reasons = t.raw("reasons") as Array<{ title: string; description: string }>
  const images = ["/img9.jpeg", "/img7.jpeg", "/img 5.jpeg", "/img28.jpeg"]

  return (
    <section id="why" className="relative py-24 bg-[rgb(245,243,235)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">{t("subtitle")}</p>

            <div className="relative mt-8">
              <div className="absolute -bottom-12 -end-12 w-80 h-80 opacity-25 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <path d="M 0 200 Q 50 150 100 100 T 200 0 L 200 200 Z" fill="rgba(184, 157, 24, 0.15)" />
                </svg>
              </div>
              <div className="absolute -bottom-6 -end-6 w-64 h-64 opacity-20 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="none">
                  <path d="M 0 200 Q 40 160 80 120 T 200 40 L 200 200 Z" fill="rgba(7, 29, 73, 0.12)" />
                </svg>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-[500px] bg-gradient-to-br from-primary/20 to-accent/20">
                  <Image src="/img 23.jpeg" alt={t("imageAlt")} fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="relative mb-6 -mt-2">
                  <div
                    className="relative w-full h-40 overflow-hidden"
                    style={{
                      borderTopLeftRadius: "50%",
                      borderTopRightRadius: "50%",
                      borderBottomLeftRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                  >
                    <Image src={images[index]} alt={reason.title} fill className="object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, rgba(184, 157, 24, 0.2) 0%, rgba(7, 29, 73, 0.3) 100%)`,
                      }}
                    ></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 text-center group-hover:text-accent transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>
    </section>
  )
}
