"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteTheme } from "@/lib/site-theme"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const flowerWrapRef = useRef<HTMLDivElement>(null)
  const flowerInnerRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.querySelectorAll(".cta-line"),
          { y: 80, opacity: 0, skewY: 3 },
          {
            y: 0,
            opacity: 1,
            skewY: 0,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Outer flower: same scrub exit as Projects / Footer (opacity → 0, scale → 1.28)
      if (flowerWrapRef.current) {
        gsap.set(flowerWrapRef.current, {
          opacity: 1,
          scale: 1,
          transformOrigin: "50% 40%",
        })
        gsap.fromTo(
          flowerWrapRef.current,
          { opacity: 1, scale: 1 },
          {
            opacity: 0,
            scale: 1.28,
            ease: "none",
            scrollTrigger: {
              trigger: flowerWrapRef.current,
              start: "top 88%",
              end: "top 8%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        )
      }

      if (flowerInnerRef.current) {
        gsap.to(flowerInnerRef.current, {
          y: -25,
          rotation: 5,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })

        gsap.fromTo(
          flowerInnerRef.current,
          { scale: 0.5, rotation: -20 },
          {
            scale: 1,
            rotation: 0,
            duration: 1.4,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: flowerInnerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] overflow-hidden"
      style={{ background: siteTheme.ctaGradient }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-8">
            <div
              ref={flowerWrapRef}
              className="relative order-2 h-64 w-64 shrink-0 will-change-transform md:h-80 md:w-80 lg:h-[400px] lg:w-[400px] lg:order-1"
            >
              <div
                className="absolute inset-0 scale-110 rounded-full blur-[60px]"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${siteTheme.cyanBright}66 0%, ${siteTheme.brand}55 45%, ${siteTheme.brandHover}44 100%)`,
                }}
              />
              <div ref={flowerInnerRef} className="relative h-full w-full">
                <Image
                  src="/images/crystal-flower.png"
                  alt="Crystal Flower"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            <div className="order-1 max-w-xl text-center lg:order-2 lg:text-left" ref={titleRef}>
              <div className="mb-2 overflow-hidden">
                <h2 className="cta-line font-serif text-3xl font-bold leading-tight text-[#1a3a5c] md:text-4xl lg:text-5xl">
                  Ready to take the step
                </h2>
              </div>
              <div className="mb-2 overflow-hidden">
                <h2 className="cta-line font-serif text-3xl font-bold leading-tight text-[#1a3a5c] md:text-4xl lg:text-5xl">
                  towards a website
                </h2>
              </div>
              <div className="mb-10 overflow-hidden">
                <h2 className="cta-line font-serif text-3xl font-bold leading-tight text-[#1a3a5c] md:text-4xl lg:text-5xl">
                  that grows?
                </h2>
              </div>

              <div ref={quoteRef} className="space-y-8">
                <p className="font-serif text-lg italic leading-relaxed text-[#1a3a5c]/80 md:text-xl">
                  &ldquo;I help startups create intuitive brand-led UI for seamless digital
                  experiences.&rdquo;
                </p>

                <p className="font-serif text-2xl font-semibold text-[#1a3a5c] md:text-3xl">
                  Let&apos;s discuss everything
                </p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#1a3a5c] px-10 py-7 text-lg font-medium text-white shadow-xl transition-all duration-300 hover:bg-[#0d2440]"
                  >
                    <Link href="/about">
                      Contact Me
                      <motion.span
                        className="ml-3 inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
