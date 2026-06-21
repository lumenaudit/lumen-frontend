"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useTranslations, useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useLocalizedServices } from "@/hooks/use-localized-services"

export function ServicesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const t = useTranslations("services")
  const locale = useLocale()
  const services = useLocalizedServices()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    direction: locale === "ar" ? "rtl" : "ltr",
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const autoplay = setInterval(() => {
      const currentIdx = emblaApi.selectedScrollSnap()
      if (currentIdx < 4) {
        emblaApi.scrollNext()
      } else if (currentIdx === 4) {
        emblaApi.scrollTo(0)
      }
    }, 2000)

    return () => clearInterval(autoplay)
  }, [emblaApi])

  return (
    <section id="services" className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
            {t("sectionTitle")}
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            {t("sectionSubtitle")}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -start-16 md:-start-20 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 transform hover:scale-110"
            aria-label={t("previousSlide")}
          >
            <svg className="w-6 h-6 icon-directional" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -end-16 md:-end-20 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 transform hover:scale-110"
            aria-label={t("nextSlide")}
          >
            <svg className="w-6 h-6 icon-directional" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5 pe-5 ps-5">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1.33rem)] min-w-0"
                >
                  <Link
                    href="/services"
                    onMouseEnter={() => setHoveredId(service.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="relative group cursor-pointer block"
                  >
                    <div className="relative rounded-2xl h-[550px] bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-primary/10 hover:border-accent/40 transform hover:scale-[1.02]">
                      <div className="absolute inset-0 transition-all duration-500">
                        <div className="relative w-full h-full">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className={`object-cover transition-all duration-500 ${hoveredId === service.id ? "blur-md scale-110" : "blur-0 scale-100"}`}
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-500 ${hoveredId === service.id ? "opacity-80" : "opacity-100"}`}
                          ></div>
                          <div
                            className={`absolute bottom-0 inset-x-0 p-6 transition-opacity duration-300 ${hoveredId === service.id ? "opacity-0" : "opacity-100"}`}
                          >
                            <h3 className="text-2xl font-bold text-white transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`absolute inset-0 p-8 flex flex-col justify-center transition-all duration-500 ${hoveredId === service.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                      >
                        <h3 className="text-2xl font-bold text-primary mb-4 text-center transition-colors duration-300 drop-shadow-lg">
                          {service.title}
                        </h3>
                        <p className="text-white/90 leading-relaxed text-center drop-shadow-md">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
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
