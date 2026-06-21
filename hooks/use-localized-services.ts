"use client"

import { useTranslations } from "next-intl"
import type { Service } from "@/lib/services-data"
import {
  FEATURE_ICONS,
  FULL_DESCRIPTION_COUNTS,
  SERVICE_IDS,
  SERVICE_IMAGES,
} from "@/lib/service-images"

export function useLocalizedServices(): Service[] {
  const t = useTranslations("services.items")

  return SERVICE_IDS.map((id) => {
    const fullDescription = Array.from(
      { length: FULL_DESCRIPTION_COUNTS[id] },
      (_, i) => t(`${id}.fullDescription.${i}`)
    )

    return {
      id,
      slug: id,
      title: t(`${id}.title`),
      shortDescription: t(`${id}.shortDescription`),
      fullDescription,
      image: SERVICE_IMAGES[id],
      keyFeatures: FEATURE_ICONS.map((icon, index) => ({
        icon,
        title: t(`${id}.keyFeatures.${index}.title`),
        description: t(`${id}.keyFeatures.${index}.description`),
      })),
      processSteps: [0, 1, 2].map((index) => ({
        number: `0${index + 1}`,
        title: t(`${id}.processSteps.${index}.title`),
        description: t(`${id}.processSteps.${index}.description`),
      })),
    }
  })
}
