"use client"

import Link from "next/link"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Link as LocaleLink } from "@/i18n/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLocalizedServices } from "@/hooks/use-localized-services"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations("footer")
  const tContact = useTranslations("contact")
  const tNav = useTranslations("nav")
  const services = useLocalizedServices()

  return (
    <footer className="bg-primary-gradient text-white relative">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
          <div>
            <LocaleLink href="/" className="flex items-center mb-6">
              <img src="/logo-lumen-1.svg" alt={tNav("logoAlt")} className="h-12 md:h-12 w-auto" />
            </LocaleLink>
            <p className="text-white/80 text-sm leading-relaxed">{t("tagline")}</p>
            <div className="mt-6">
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">{t("company")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="text-white/70 hover:text-accent transition-colors">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <LocaleLink href="/blogs" className="text-white/70 hover:text-accent transition-colors">
                  {tNav("blogs")}
                </LocaleLink>
              </li>
              <li>
                <LocaleLink href="/contact" className="text-white/70 hover:text-accent transition-colors">
                  {tNav("contactUs")}
                </LocaleLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">{t("services")}</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href="#services" className="text-white/70 hover:text-accent transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">{t("connect")}</h4>
            <ul className="space-y-2 text-sm text-white/70 whitespace-pre-line">
              <li>{tContact("address")}</li>
              <li>+966 50 043 8645</li>
              <li>hello@lumenaudit.com</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/70">
          <p>{t("copyright", { year: currentYear })}</p>
        </div>
      </div>

      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </footer>
  )
}
