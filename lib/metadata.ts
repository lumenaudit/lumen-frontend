import type { Metadata } from "next"

export function buildLocaleMetadata({
  locale,
  path = "",
  title,
  description,
}: {
  locale: string
  path?: string
  title: string
  description: string
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lumenaudit.com"
  const normalizedPath = path ? `/${path.replace(/^\//, "")}` : ""

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}${normalizedPath}`,
      languages: {
        en: `${baseUrl}/en${normalizedPath}`,
        ar: `${baseUrl}/ar${normalizedPath}`,
        "x-default": `${baseUrl}/en${normalizedPath}`,
      },
    },
  }
}
