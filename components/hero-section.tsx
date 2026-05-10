"use client"

import { useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { siteTheme } from "@/lib/site-theme"

/** Max upward motion (px) from float + parallax so the hand cannot encroach on the headline */
const HAND_MAX_UP_PX = 10
const HAND_FLOAT_RANGE_PX = 10

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const handParallaxRef = useRef<HTMLDivElement>(null)
  const handFloatRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const leadRef = useRef<HTMLHeadingElement>(null)
  const leadShineRef = useRef<HTMLDivElement>(null)

  const clampParallaxY = useCallback((ny: number) => {
    const raw = ny * 22
    return Math.max(-HAND_MAX_UP_PX, Math.min(26, raw))
  }, [])

  useEffect(() => {
    const lead = leadRef.current
    if (lead) {
      const letters = lead.querySelectorAll<HTMLElement>("[data-lead-letter]")
      const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      gsap.set(lead, { opacity: 1 })
      if (letters.length > 0) {
        if (prefersReduce) {
          gsap.fromTo(letters, { opacity: 0 }, { opacity: 1, duration: 0.35, stagger: 0.05 })
        } else {
          gsap.fromTo(
            letters,
            { y: "0.85em", opacity: 0, rotateZ: -5 },
            {
              y: 0,
              opacity: 1,
              rotateZ: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: "back.out(1.2)",
              delay: 0.08,
            }
          )
        }
      }
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const spotlight = spotlightRef.current
    const handParallax = handParallaxRef.current
    const handFloat = handFloatRef.current
    const content = contentRef.current
    const shine = leadShineRef.current
    if (!container || !spotlight || !handParallax || !handFloat || !content) return

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(pointer: fine)").matches

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.35 }
      )

      gsap.fromTo(
        handParallax,
        { y: 40, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.15, ease: "power3.out", delay: 0.15 }
      )

      if (!prefersReduce) {
        gsap.to(handFloat, {
          y: -HAND_FLOAT_RANGE_PX,
          duration: 3.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1.1,
        })

        gsap.to(handFloat, {
          rotate: -2.5,
          duration: 4.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 0.9,
        })

        gsap.fromTo(
          handFloat,
          { filter: "brightness(1) drop-shadow(0 12px 28px rgba(24,165,253,0.2))" },
          {
            filter: "brightness(1.06) drop-shadow(0 18px 40px rgba(24,165,253,0.35))",
            duration: 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1,
          }
        )
      }
    }, container)

    if (!finePointer || prefersReduce) {
      return () => ctx.revert()
    }

    const quickSpotX = gsap.quickTo(spotlight, "x", { duration: 0.65, ease: "power3.out" })
    const quickSpotY = gsap.quickTo(spotlight, "y", { duration: 0.65, ease: "power3.out" })

    gsap.set(spotlight, {
      xPercent: -50,
      yPercent: -50,
      x: container.offsetWidth * 0.5,
      y: container.offsetHeight * 0.38,
    })

    const setLeadShine = (clientX: number, clientY: number, rect: DOMRect) => {
      if (!shine) return
      const px = ((clientX - rect.left) / rect.width) * 100
      const py = ((clientY - rect.top) / rect.height) * 100
      shine.style.background = `radial-gradient(ellipse 120% 100% at ${px}% ${py}%, rgba(24,165,253,0.28) 0%, transparent 52%)`
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!container || !handParallax || !spotlight) return
      const rect = container.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(handParallax, {
        x: nx * 28,
        y: clampParallaxY(ny),
        rotation: nx * 5,
        duration: 1.15,
        ease: "power2.out",
        overwrite: "auto",
      })

      quickSpotX(e.clientX - rect.left)
      quickSpotY(e.clientY - rect.top)
      setLeadShine(e.clientX, e.clientY, rect)
    }

    const handleMouseLeave = () => {
      if (!container || !handParallax || !spotlight) return
      const rect = container.getBoundingClientRect()
      gsap.to(handParallax, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "power2.out",
      })
      quickSpotX(rect.width * 0.5)
      quickSpotY(rect.height * 0.38)
      if (shine) {
        shine.style.background =
          "radial-gradient(ellipse 120% 100% at 50% 40%, rgba(24,165,253,0.18) 0%, transparent 50%)"
      }
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      ctx.revert()
    }
  }, [clampParallaxY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] cursor-default overflow-hidden"
      style={{ background: siteTheme.heroGradient }}
    >
      <div
        className="pointer-events-none absolute -left-[20%] top-[-10%] h-[55vh] w-[70vw] rotate-[18deg] opacity-[0.35] blur-3xl md:opacity-40"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0.55) 0%, rgba(94,201,255,0.25) 45%, transparent 75%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[15%] top-[12%] h-[45vh] w-[55vw] -rotate-12 opacity-30 blur-3xl"
        style={{
          background:
            "linear-gradient(250deg, rgba(24,165,253,0.35) 0%, rgba(255,255,255,0.2) 50%, transparent 80%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[20%] left-[5%] h-[30vh] w-[40vw] rotate-[-25deg] opacity-25 blur-2xl"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.4) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-0 top-0 z-[1] h-[min(140vw,900px)] w-[min(140vw,900px)] rounded-full opacity-0 md:opacity-100"
        style={{
          background:
            "radial-gradient(circle closest-side, rgba(255,255,255,0.45) 0%, rgba(24,165,253,0.18) 32%, transparent 68%)",
          mixBlendMode: "soft-light",
          willChange: "transform, opacity",
        }}
        aria-hidden
      />

      <div className="relative z-[2] flex min-h-[100dvh] flex-col">
        {/* Clear fixed nav (~80px) + comfortable gap; no overlap with navbar */}
        <div className="flex w-full flex-col items-center px-4 pt-[calc(6.25rem+env(safe-area-inset-top,0px))] sm:pt-28 md:pt-[7.25rem]">
          <div className="relative w-full max-w-[min(96vw,1200px)] text-center">
            <div
              ref={leadShineRef}
              className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light md:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse 120% 100% at 50% 40%, rgba(24,165,253,0.18) 0%, transparent 50%)",
              }}
              aria-hidden
            />
            <h1
              ref={leadRef}
              className="relative z-[1] w-full select-none font-sans font-black uppercase tracking-tight"
              style={{
                color: siteTheme.navyDeep,
                fontSize: "clamp(2.35rem, 9vw + 0.75rem, 8.25rem)",
                lineHeight: 1.02,
                opacity: 0,
              }}
            >
              {"LEAD".split("").map((char, i) => (
                <span
                  key={i}
                  data-lead-letter
                  className="inline-block will-change-transform [margin:0_0.015em]"
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* Vertical gap: larger than float + parallax upward travel so text and image never meet */}
          <div className="mt-8 w-full max-w-[min(88vw,520px)] shrink-0 sm:mt-10 md:mt-12 md:max-w-[min(80vw,480px)] lg:max-w-[min(72vw,520px)]">
            <div
              ref={handParallaxRef}
              className="relative mx-auto w-full will-change-transform opacity-0"
            >
              <div
                ref={handFloatRef}
                className="relative mx-auto aspect-square w-full max-w-full will-change-transform"
              >
                <Image
                  src="/images/hand.png"
                  alt="3D Iridescent Chrome Hand"
                  fill
                  className="object-contain object-center drop-shadow-2xl"
                  priority
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 80vw, 520px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto flex w-full flex-col gap-8 px-6 pb-10 pt-10 md:flex-row md:items-end md:justify-between md:px-12 md:pb-14 md:pt-12 lg:px-16">
          <div ref={contentRef} className="flex max-w-xs flex-col gap-5 md:max-w-sm">
            <p className="text-sm leading-relaxed md:text-[15px]" style={{ color: siteTheme.navy }}>
              Offers several services such as UI/UX Design to developers, we will provide the best
              service for those of you who use our services.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full border-0 px-6 py-5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-95"
                style={{ backgroundColor: siteTheme.navy }}
              >
                <Link href="/projects">Get Started</Link>
              </Button>
              <Button
                asChild
                className="rounded-full border-0 px-6 py-5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-95"
                style={{ backgroundColor: siteTheme.navy }}
              >
                <Link href="/about">More</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 py-5 text-sm font-semibold shadow-md transition-all hover:opacity-90"
                style={{
                  borderColor: siteTheme.navy,
                  color: siteTheme.navy,
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <a href="/cv.pdf" download="Kencho_Dorji_CV.pdf">
                  Download CV
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <div className="flex -space-x-2.5">
                {[
                  "from-[#c084fc] to-[#818cf8]",
                  "from-[#fb923c] to-[#f43f5e]",
                  "from-[#34d399] to-[#06b6d4]",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`h-9 w-9 rounded-full border-2 border-white/80 bg-gradient-to-br ${gradient} shadow-md`}
                  />
                ))}
              </div>
              <div>
                <p className="text-lg font-bold leading-tight" style={{ color: siteTheme.navy }}>
                  25 K
                </p>
                <p
                  className="text-[10px] uppercase leading-tight tracking-wide opacity-70"
                  style={{ color: siteTheme.navy }}
                >
                  People who joined us and
                  <br />
                  choose simplicity
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 self-end md:self-auto">
            <div
              className="w-48 rounded-2xl border p-5 shadow-lg backdrop-blur-xl transition-shadow hover:shadow-xl md:w-56 md:p-6"
              style={{
                borderColor: "rgba(255,255,255,0.45)",
                background: "rgba(24, 165, 253, 0.22)",
                boxShadow: "0 8px 32px rgba(13, 36, 64, 0.12)",
              }}
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="text-xl drop-shadow-sm" style={{ color: siteTheme.navy }}>
                  ★
                </span>
                <span className="text-lg drop-shadow-sm" style={{ color: siteTheme.navy }}>
                  ⏱
                </span>
              </div>
              <p
                className="text-center text-xs font-semibold uppercase leading-snug tracking-widest md:text-sm"
                style={{ color: siteTheme.navy }}
              >
                Find out more about the possibilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
