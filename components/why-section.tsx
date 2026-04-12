"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteTheme } from "@/lib/site-theme"

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    id: "01",
    title: "Stand Out in Crowded Markets",
    description:
      "Leading brands are distinctive and clear, making them easier for people to recognize and remember.",
  },
  {
    id: "02",
    title: "Create Lasting Recognition",
    description:
      "Brands that lead are memorable and consistent, which helps them stay relevant over time instead of following short-term trends.",
  },
  {
    id: "03",
    title: "Build Trust & Authority",
    description:
      "A strong brand identity communicates professionalism and confidence, helping audiences trust faster.",
  },
]

function computeTrackXForCardCenter(
  track: HTMLElement,
  card: HTMLElement,
  viewportWidth: number
): number {
  const cardCenter = card.offsetLeft + card.offsetWidth / 2
  return -(cardCenter - viewportWidth / 2)
}

export function WhySection() {
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    const root = rootRef.current
    const pin = pinRef.current
    const title = titleRef.current
    const horizontal = horizontalRef.current
    const track = trackRef.current
    if (!root || !pin || !title || !horizontal || !track) return

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduce) {
      gsap.set(title, { opacity: 1, y: 0, scale: 0.55, x: -80, y: -72 })
      gsap.set(horizontal, { opacity: 1 })
      const els = cardRefs.current.filter(Boolean) as HTMLDivElement[]
      els.forEach((el, i) => {
        gsap.set(el, { scale: i === 0 ? 1 : 0.85, opacity: i === 0 ? 1 : 0.55 })
      })
      return
    }

    const ctx = gsap.context(() => {
      const cardEls = cardRefs.current.filter(Boolean) as HTMLDivElement[]

      gsap.set(title, { opacity: 0, y: 50, scale: 1, x: 0, transformOrigin: "center center" })
      gsap.set(horizontal, { opacity: 0 })
      gsap.set(cardEls, {
        scale: 0.8,
        opacity: 0,
        y: 22,
        transformOrigin: "center center",
      })

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 4.25)}`,
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // —— Phase 1: headline enters (scroll-scrubbed)
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.15,
        ease: "power2.out",
      })

      // —— Hold focus on centered statement
      tl.to({}, { duration: 0.55 })

      // —— Phase 2: move + scale toward top-left anchor (responsive offsets)
      tl.to(
        title,
        {
          scale: 0.5,
          x: () => (window.innerWidth < 768 ? -48 : -150),
          y: () => (window.innerWidth < 768 ? -56 : -100),
          duration: 1.35,
          ease: "power2.inOut",
        },
      )

      // Cards lane fades in while headline settles
      tl.to(
        horizontal,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.85"
      )

      tl.to(
        cardEls,
        {
          opacity: 0.5,
          y: 0,
          duration: 0.36,
          stagger: 0.12,
          ease: "power2.out",
        },
        "-=0.28"
      )
      tl.to(
        cardEls[0],
        { scale: 1, opacity: 1, duration: 0.42, ease: "power2.out" },
        "<0.06"
      )

      // —— Phase 3: horizontal “read” — vertical scroll drives x + focus
      const trackX = (index: number) => () => {
        const c = cardEls[index]
        if (!c) return 0
        return computeTrackXForCardCenter(track, c, pin.offsetWidth)
      }

      const inactive = { scale: 0.8, opacity: 0.5, duration: 0.55, ease: "power2.inOut" as const }
      const active = { scale: 1, opacity: 1, duration: 0.55, ease: "power2.inOut" as const }
      const segment = 1.05

      gsap.set(track, { x: 0 })

      tl.fromTo(
        track,
        { x: 0 },
        { x: trackX(0), duration: 0.85, ease: "power2.inOut" }
      )

      if (cardEls.length > 1) {
        tl.to(track, { x: trackX(1), duration: segment, ease: "power2.inOut" })
        tl.to(cardEls[0], { ...inactive }, "<0.12")
        tl.to(cardEls[1], { ...active }, "<0.12")
        if (cardEls[2]) tl.to(cardEls[2], { ...inactive }, "<0.12")
      }

      if (cardEls.length > 2) {
        tl.to(track, { x: trackX(2), duration: segment, ease: "power2.inOut" })
        tl.to(cardEls[0], { ...inactive }, "<0.12")
        tl.to(cardEls[1], { ...inactive }, "<0.12")
        tl.to(cardEls[2], { ...active }, "<0.12")
      }
    }, root)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-x-clip"
      style={{ background: siteTheme.sectionGradientCool }}
    >
      <div
        ref={pinRef}
        className="relative flex h-[100dvh] min-h-[100svh] w-full flex-col overflow-hidden"
      >
        {/* Centered → anchored headline */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
          <h2
            ref={titleRef}
            className="max-w-[min(1100px,92vw)] text-center font-serif text-[clamp(1.75rem,6.5vw,5.5rem)] font-bold leading-[1.08] tracking-tight text-white will-change-transform"
          >
            Why design brands that{" "}
            <span className="text-[#ff6b35]">lead</span>
          </h2>
        </div>

        {/* Horizontal cards — bottom weighted like mock */}
        <div
          ref={horizontalRef}
          className="relative z-20 mt-auto flex w-full flex-1 items-center pb-[min(12vh,6rem)] pt-[min(28vh,12rem)] will-change-transform"
        >
          <div
            ref={trackRef}
            className="flex w-max will-change-transform items-stretch gap-6 md:gap-10"
            style={{
              paddingLeft: "max(1.5rem, calc(50vw - min(11rem, 42vw)))",
              paddingRight: "max(1.5rem, calc(50vw - min(11rem, 42vw)))",
            }}
          >
            {cards.map((card, index) => (
              <article
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className="flex w-[min(100vw-3rem,22rem)] shrink-0 flex-col justify-center rounded-2xl border border-white/35 bg-[#b8dce8]/75 p-6 shadow-lg backdrop-blur-md md:w-[min(100vw-4rem,26rem)] md:rounded-3xl md:p-8"
              >
                <h3 className="mb-3 text-center font-sans text-base font-semibold text-[#ff6b35] md:mb-4 md:text-xl">
                  {card.title}
                </h3>
                <p className="text-center font-sans text-sm leading-relaxed text-[#1a3a5c]/85 md:text-base">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
