"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects-data"
import { siteTheme } from "@/lib/site-theme"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const introCopy =
  "Over 20 businesses from different industries have trusted me to design their brand identities, and many have become long-term collaborators. Join us and lead with your brand."

export function ProjectsPageContent() {
  const rootRef = useRef<HTMLElement>(null)
  const pinWrapRef = useRef<HTMLDivElement>(null)
  const pinInnerRef = useRef<HTMLDivElement>(null)
  const flowerRef = useRef<HTMLDivElement>(null)
  const bigTitleRef = useRef<HTMLHeadingElement>(null)
  const blurbRef = useRef<HTMLParagraphElement>(null)
  const stickyTitleRef = useRef<HTMLDivElement>(null)
  const footerSentinelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const pinWrap = pinWrapRef.current
    const pinInner = pinInnerRef.current
    const flower = flowerRef.current
    const bigTitle = bigTitleRef.current
    const blurb = blurbRef.current
    const stickyTitle = stickyTitleRef.current
    const footerSentinel = footerSentinelRef.current
    if (!root || !pinWrap || !pinInner || !flower || !bigTitle || !blurb || !stickyTitle || !footerSentinel) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      gsap.set(flower, { opacity: 0.4, scale: 1 })
      gsap.set(bigTitle, { opacity: 1, scale: 0.42, y: "-18vh" })
      gsap.set(blurb, { opacity: 1 })
      gsap.set(stickyTitle, { opacity: 0 })
      return
    }

    gsap.set(flower, { opacity: 1, scale: 1, transformOrigin: "50% 40%" })
    gsap.set(bigTitle, { opacity: 1, scale: 1, y: 0, transformOrigin: "center center" })
    gsap.set(blurb, { opacity: 1, y: 0 })
    gsap.set(stickyTitle, { opacity: 0 })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * 2.35)}`,
          pin: pinInner,
          scrub: 1.1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(
        flower,
        {
          opacity: 0,
          scale: 1.28,
          duration: 0.42,
          ease: "power2.in",
        },
        0
      )

      tl.to(
        blurb,
        {
          opacity: 0,
          y: 28,
          duration: 0.28,
          ease: "power2.in",
        },
        0.05
      )

      tl.to(
        bigTitle,
        {
          scale: () => (window.innerWidth < 640 ? 0.34 : 0.28),
          y: () => (window.innerWidth < 640 ? "-18vh" : "-22vh"),
          duration: 0.62,
          ease: "power2.inOut",
        },
        0.08
      )

      tl.to(bigTitle, { opacity: 0, duration: 0.18, ease: "power1.out" }, 0.52)
      tl.fromTo(
        stickyTitle,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
        0.54
      )

      tl.to({}, { duration: 0.2 })

      ScrollTrigger.create({
        trigger: footerSentinel,
        start: "top 88%",
        onEnter: () =>
          gsap.to(stickyTitle, {
            opacity: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          }),
        onLeaveBack: () =>
          gsap.to(stickyTitle, {
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          }),
      })
    }, root)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
      ctx.revert()
    }
  }, [])

  return (
    <main ref={rootRef} className="relative min-h-screen">
      <Navigation />

      {/* Scroll-driven hero */}
      <div ref={pinWrapRef} className="relative">
        <div
          ref={pinInnerRef}
          className="relative z-40 flex h-[100dvh] min-h-[100svh] w-full flex-col overflow-hidden"
          style={{ background: siteTheme.projectsHeroGradient }}
        >
          <div
            ref={flowerRef}
            className="pointer-events-none absolute left-1/2 top-[4%] z-0 w-[min(92vw,520px)] -translate-x-1/2 md:top-[2%] md:w-[min(88vw,640px)]"
          >
            <div className="relative aspect-square w-full">
              <div
                className="absolute inset-0 scale-110 rounded-full opacity-70 blur-3xl"
                style={{
                  background: `radial-gradient(circle, ${siteTheme.brand} 0%, transparent 65%)`,
                }}
              />
              <Image
                src="/images/crystal-flower.png"
                alt=""
                fill
                className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
                priority
                sizes="(max-width: 768px) 92vw, 640px"
              />
            </div>
          </div>

          <div className="relative z-10 mt-auto flex flex-col items-center px-5 pb-10 md:pb-16">
            <h1
              ref={bigTitleRef}
              className="max-w-[100vw] text-center font-sans text-[clamp(3.2rem,17vw,9rem)] font-black uppercase leading-[0.88] tracking-tight will-change-transform"
              style={{ color: siteTheme.projectsTitle }}
            >
              PROJECTS
            </h1>
            <p
              ref={blurbRef}
              className="mt-6 max-w-xl text-center font-sans text-sm leading-relaxed text-white md:mt-8 md:max-w-2xl md:text-base"
            >
              {introCopy}
            </p>
          </div>
        </div>
      </div>

      {/* Fixed section title — crossfades with hero title */}
      <div
        ref={stickyTitleRef}
        className="pointer-events-none fixed left-0 right-0 z-[90] flex justify-center px-6"
        style={{ top: "max(6.25rem, 13vh)" }}
        aria-hidden
      >
        <h2
          className="font-sans text-3xl font-black uppercase tracking-tight md:text-4xl"
          style={{ color: siteTheme.projectsTitle }}
        >
          PROJECTS
        </h2>
      </div>

      {/* Project grid — scrolls under the fixed title */}
      <section
        className="relative z-10 border-t border-white/25 px-5 pb-24 pt-28 md:px-8 md:pb-32 md:pt-32"
        style={{ background: siteTheme.projectsListBg }}
      >
        <div className="mx-auto max-w-7xl">
          <p className="mx-auto mb-14 max-w-2xl text-center font-sans text-sm text-[#1a3a5c]/75 md:mb-16 md:text-base">
            Selected work across product design, interfaces, and front-end build-outs — crafted
            with the same care as the rest of the portfolio.
          </p>
          <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <div ref={footerSentinelRef}>
        <Footer />
      </div>
    </main>
  )
}
