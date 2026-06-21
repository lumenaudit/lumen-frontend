import type { Locale } from "@/i18n/routing"

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr"
}

export function getAlternateLanguages(pathname: string, baseUrl: string) {
  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "") || "/"
  return {
    en: `${baseUrl}/en${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`,
    ar: `${baseUrl}/ar${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`,
  }
}
