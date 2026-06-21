export const SERVICE_IMAGES: Record<string, string> = {
  "financial-audit": "/img20.jpeg",
  "tax-zakat-advisory": "/img28.jpeg",
  "compliance-risk-advisory": "/img 24.jpeg",
  "corporate-advisory": "/img 18.jpeg",
  "business-valuation": "/img16.jpeg",
}

export const SERVICE_IDS = [
  "financial-audit",
  "tax-zakat-advisory",
  "compliance-risk-advisory",
  "corporate-advisory",
  "business-valuation",
] as const

export const FEATURE_ICONS = ["check", "shield", "chart", "document"] as const

export const FULL_DESCRIPTION_COUNTS: Record<(typeof SERVICE_IDS)[number], number> = {
  "financial-audit": 3,
  "tax-zakat-advisory": 3,
  "compliance-risk-advisory": 2,
  "corporate-advisory": 2,
  "business-valuation": 2,
}
