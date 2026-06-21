"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

const clients = [
  { id: 1, logo: "/company-1.webp" },
  { id: 2, logo: "/company-02.webp" },
  { id: 3, logo: "/company-04.webp" },
  { id: 4, logo: "/company-05.webp" },
  { id: 5, logo: "/company-06.webp" },
  { id: 6, logo: "/company-07.webp" },
  { id: 7, logo: "/company-08.webp" },
  { id: 8, logo: "/company-1.webp" },
  { id: 9, logo: "/company-02.webp" },
  { id: 10, logo: "/company-04.webp" },
]

export function ClientsSection() {
  const t = useTranslations("clients")
  const duplicatedClients = [...clients, ...clients]

  return (
    <section className="relative py-12 overflow-hidden">
      <div className="lg:hidden relative">
        <div className="flex items-center gap-6 md:gap-8 animate-scroll-left">
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex items-center justify-center w-auto flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 rounded-lg p-2 bg-transparent"
            >
              <Image
                src={client.logo}
                alt={t("clientAlt", { number: client.id })}
                width={150}
                height={80}
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block relative">
        <div className="flex items-center gap-8 md:gap-12 animate-scroll-left">
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex items-center justify-center w-auto flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 hover:grayscale-0 rounded-lg p-2 bg-transparent"
            >
              <Image
                src={client.logo}
                alt={t("clientAlt", { number: client.id })}
                width={200}
                height={150}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
