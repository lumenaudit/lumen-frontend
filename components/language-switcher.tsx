"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import { routing, type Locale } from "@/i18n/routing"
import { cn } from "@/lib/utils"

type LanguageSwitcherProps = {
  className?: string
  variant?: "navbar" | "footer"
}

export function LanguageSwitcher({ className, variant = "navbar" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === locale) return
    router.replace(pathname, { locale: nextLocale })
  }

  const isNavbar = variant === "navbar"

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-lg p-1",
        isNavbar ? "bg-white/10 border border-white/20" : "bg-primary/5 border border-primary/10",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => handleSwitch(loc)}
          className={cn(
            "px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300",
            locale === loc
              ? isNavbar
                ? "bg-accent text-primary shadow-sm"
                : "bg-accent text-primary shadow-sm"
              : isNavbar
                ? "text-white/80 hover:text-white hover:bg-white/10"
                : "text-primary/70 hover:text-primary hover:bg-primary/5"
          )}
          aria-pressed={locale === loc}
        >
          {loc === "en" ? "English" : "العربية"}
        </button>
      ))}
    </div>
  )
}
