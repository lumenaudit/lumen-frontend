"use client"

import Image from "next/image"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations("nav")

  const needsBackground =
    pathname?.startsWith("/services") || pathname?.startsWith("/blogs")
  const navBackgroundClass = needsBackground
    ? "bg-primary-gradient shadow-lg"
    : "bg-transparent"

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/blogs", label: t("blogs") },
  ] as const

  return (
    <nav className={`absolute top-0 inset-x-0 w-full z-50 ${navBackgroundClass}`}>
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between text-sm gap-4">
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            <a href="mailto:hello@lumenaudit.com" className="text-white hover:text-accent transition-colors">
              hello@lumenaudit.com
            </a>
            <a href="tel:+966500438645" className="text-white hover:text-accent transition-colors">
              +966 50 043 8645
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="px-4 py-1.5 bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-all duration-300 rounded"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo-lumen-1.svg"
                alt={t("logoAlt")}
                width={350}
                height={120}
                className="h-12 md:h-12 w-auto drop-shadow-[0_0_15px_rgba(184,157,24,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(184,157,24,0.6)] transition-all duration-300"
                priority
                unoptimized
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-white hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={`md:hidden ${needsBackground ? "bg-primary-gradient" : "bg-black/95"} backdrop-blur-sm border-t border-white/20 py-4 px-6 space-y-4`}
        >
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-semibold text-white hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block text-sm font-semibold text-white hover:text-accent transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t("contact")}
          </Link>
          <Link
            href="/contact"
            className="block w-full mt-4 px-4 py-2 bg-accent text-primary font-semibold text-sm hover:bg-accent/90 transition-all duration-300 rounded text-center"
            onClick={() => setIsOpen(false)}
          >
            {t("contactUs")}
          </Link>
        </div>
      )}
    </nav>
  )
}
