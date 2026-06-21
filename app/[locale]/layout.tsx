import type React from "react"
import type { Metadata } from "next"
import { Poppins, Geist_Mono, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { Toaster } from "@/components/ui/toaster"
import { routing, type Locale } from "@/i18n/routing"
import { getDirection } from "@/lib/locale-utils"
import "../globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
})

const _geistMono = Geist_Mono({ subsets: ["latin"] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lumenaudit.com"

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
        "x-default": `${baseUrl}/en`,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  setRequestLocale(locale)
  const messages = await getMessages()
  const direction = getDirection(locale as Locale)
  const fontClass = locale === "ar" ? cairo.variable : poppins.variable

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${fontClass} ${locale === "ar" ? "font-arabic" : "font-sans"} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Analytics />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
