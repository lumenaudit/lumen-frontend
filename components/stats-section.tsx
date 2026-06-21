"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslations } from "next-intl"

function parseStatNumber(value: string): { number: number; suffix: string } {
  const match = value.match(/^(\d+)([+%]?)$/)
  if (match) {
    return { number: parseInt(match[1], 10), suffix: match[2] || "" }
  }
  return { number: 0, suffix: "" }
}

function useCounterAnimation(target: number, duration: number = 2000, startAnimation: boolean = false): number {
  const [count, setCount] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!startAnimation) {
      setCount(0)
      return
    }

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime
      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * target))
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [target, duration, startAnimation])

  return count
}

function StatCard({
  stat,
  startAnimation,
}: {
  stat: { number: string; label: string; description: string }
  startAnimation: boolean
}) {
  const { number: targetNumber, suffix } = parseStatNumber(stat.number)
  const animatedCount = useCounterAnimation(targetNumber, 2000, startAnimation)

  return (
    <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-primary/10 hover:border-accent/40 group text-center">
      <div className="mb-4">
        <span className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
          {animatedCount}
          {suffix}
        </span>
      </div>
      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
        {stat.label}
      </h3>
      <p className="text-foreground/70 text-sm leading-relaxed">{stat.description}</p>
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations("stats")
  const stats = t.raw("items") as Array<{ number: string; label: string; description: string }>

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) setIsVisible(true)
        })
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [isVisible])

  return (
    <section ref={sectionRef} className="relative py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-2xl md:text-3xl font-extrabold text-accent uppercase tracking-wider mb-6">
            {t("label")}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight">
            {t("title")} <span className="text-accent">{t("titleAccent")}</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">{t("subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} startAnimation={isVisible} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-40"></div>
    </section>
  )
}
