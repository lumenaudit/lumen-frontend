"use client"

import type React from "react"
import { useState, useRef } from "react"
import emailjs from "@emailjs/browser"
import { useTranslations } from "next-intl"
import { useToast } from "@/hooks/use-toast"

export function ContactSection() {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations("contact")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: t("toastConfigErrorTitle"),
        description: t("toastConfigErrorDescription"),
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (!formRef.current) return

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)

      toast({
        title: t("toastSuccessTitle"),
        description: t("toastSuccessDescription"),
        variant: "default",
      })

      setFormData({ name: "", email: "", company: "", message: "" })
    } catch (error) {
      console.error("EmailJS Error:", error)
      toast({
        title: t("toastErrorTitle"),
        description: t("toastErrorDescription"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-[rgb(245,243,235)]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-2xl md:text-3xl font-extrabold text-accent uppercase tracking-wider mb-6">
            {t("label")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
            {t("title")}
          </h2>
          <div className="w-32 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/70 leading-relaxed">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 rounded-2xl bg-white border-2 border-primary/10 shadow-md">
            <h3 className="text-2xl font-semibold text-primary mb-8 relative">
              {t("infoTitle")}
              <span className="absolute -bottom-2 start-0 w-16 h-1 bg-accent"></span>
            </h3>

            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold text-accent mb-2">{t("location")}</p>
                <p className="text-primary text-lg whitespace-pre-line">{t("address")}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-accent mb-2">{t("phone")}</p>
                <p className="text-primary text-lg">+966 50 043 8645</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-accent mb-2">{t("email")}</p>
                <p className="text-primary text-lg">hello@lumenaudit.com</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-accent mb-2">{t("businessHours")}</p>
                <p className="text-primary">{t("hoursWeekdays")}</p>
                <p className="text-primary">{t("hoursFriday")}</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white border-2 border-primary/10 shadow-md">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">{t("formName")}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("placeholderName")}
                  className="w-full px-4 py-3 border-2 border-primary/20 bg-white text-primary placeholder-primary/50 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">{t("formEmail")}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("placeholderEmail")}
                  className="w-full px-4 py-3 border-2 border-primary/20 bg-white text-primary placeholder-primary/50 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">{t("formCompany")}</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t("placeholderCompany")}
                  className="w-full px-4 py-3 border-2 border-primary/20 bg-white text-primary placeholder-primary/50 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">{t("formMessage")}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("placeholderMessage")}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-primary/20 bg-white text-primary placeholder-primary/50 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 rounded-lg"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-accent text-primary font-semibold hover:bg-accent/90 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("submitting") : t("submit")}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>
    </section>
  )
}
