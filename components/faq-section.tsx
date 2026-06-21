"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
  const t = useTranslations("faq")
  const faqs = t.raw("items") as Array<{ question: string; answer: string }>

  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="mb-12">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={String(index + 1).padStart(2, "0")}
                className="bg-white rounded-2xl border-2 border-primary/10 px-6 py-4 shadow-md hover:shadow-lg transition-all duration-300 hover:border-accent/40"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-6 w-full">
                    <span className="text-foreground/40 font-semibold text-lg flex-shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-semibold text-primary text-start flex-grow">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2">
                  <div className="ps-16 pe-8">
                    <p className="text-foreground/70 leading-relaxed">{faq.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <p className="text-foreground/70 text-lg">
            {t("footerPrefix")}{" "}
            <Link href="/contact" className="text-accent font-semibold hover:underline transition-colors duration-300">
              {t("contactUs")}
            </Link>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>
    </section>
  )
}
