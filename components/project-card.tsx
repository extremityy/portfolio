"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import Image from "next/image"
import type { Project } from "@/lib/projects-data"
import { siteTheme } from "@/lib/site-theme"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const card = cardRef.current
    const imageWrap = imageRef.current
    const spot = spotlightRef.current
    const overlay = overlayRef.current
    if (!root || !card || !imageWrap || !spot || !overlay) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine)").matches

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(
          root,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: index * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      } else {
        gsap.set(root, { opacity: 1, y: 0 })
      }
    }, root)

    const removeListeners: (() => void)[] = []

    if (fine && !reduce) {
      const img = imageWrap.querySelector("img")
      gsap.set(spot, {
        opacity: 0.65,
        width: 280,
        height: 280,
        xPercent: -50,
        yPercent: -50,
        left: 0,
        top: 0,
      })

      const qx = gsap.quickTo(spot, "left", { duration: 0.55, ease: "power3.out" })
      const qy = gsap.quickTo(spot, "top", { duration: 0.55, ease: "power3.out" })

      const onMove = (e: MouseEvent) => {
        const r = imageWrap.getBoundingClientRect()
        qx(e.clientX - r.left)
        qy(e.clientY - r.top)
      }
      const onLeaveImg = () => {
        const r = imageWrap.getBoundingClientRect()
        qx(r.width * 0.5)
        qy(r.height * 0.45)
      }

      const onEnterCard = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.03,
          boxShadow: "0 28px 60px -15px rgba(26,58,92,0.35), 0 0 0 1px rgba(24,165,253,0.45)",
          duration: 0.5,
          ease: "power2.out",
        })
        if (img)
          gsap.to(img, { scale: 1.08, duration: 0.65, ease: "power2.out" })
        gsap.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" })
      }
      const onLeaveCard = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
          duration: 0.5,
          ease: "power2.out",
        })
        if (img) gsap.to(img, { scale: 1, duration: 0.55, ease: "power2.out" })
        gsap.to(overlay, { opacity: 0, duration: 0.35, ease: "power2.out" })
        onLeaveImg()
      }

      imageWrap.addEventListener("mousemove", onMove)
      imageWrap.addEventListener("mouseleave", onLeaveImg)
      card.addEventListener("mouseenter", onEnterCard)
      card.addEventListener("mouseleave", onLeaveCard)
      onLeaveImg()

      removeListeners.push(() => {
        imageWrap.removeEventListener("mousemove", onMove)
        imageWrap.removeEventListener("mouseleave", onLeaveImg)
        card.removeEventListener("mouseenter", onEnterCard)
        card.removeEventListener("mouseleave", onLeaveCard)
      })
    }

    return () => {
      removeListeners.forEach((fn) => fn())
      ctx.revert()
    }
  }, [index])

  return (
    <div ref={rootRef} className="group/pcard">
      <Link href={`/projects/${project.slug}`} className="block will-change-transform">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border border-[#18A5FD]/40 bg-white/85 shadow-md backdrop-blur-sm transition-colors duration-500 hover:border-[#18A5FD]"
          style={{
            background: `linear-gradient(135deg, ${project.color}99, ${project.color}66)`,
          }}
        >
          <div
            ref={imageRef}
            className="relative h-64 cursor-default overflow-hidden bg-[#f0f0f0]"
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover will-change-transform"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div
              ref={spotlightRef}
              className="pointer-events-none absolute z-[2] rounded-full"
              style={{
                background:
                  "radial-gradient(circle closest-side, rgba(255,255,255,0.42) 0%, rgba(24,165,253,0.2) 38%, transparent 72%)",
                mixBlendMode: "soft-light",
              }}
              aria-hidden
            />
            <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-black/35 to-transparent" />

            <div className="absolute inset-0 z-[3] flex items-center justify-center p-6">
              <div className="text-center">
                <h3 className="mb-3 font-serif text-3xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
                  {project.title}
                </h3>
                <p className="font-sans text-sm text-white/95 drop-shadow-md">{project.tagline}</p>
              </div>
            </div>

            <div
              ref={overlayRef}
              className="absolute inset-0 z-[4] flex items-end justify-center bg-gradient-to-t from-[#1a3a5c]/92 via-[#1a3a5c]/45 to-transparent pb-8 opacity-0"
            >
              <span className="rounded-full bg-white px-8 py-3 font-sans text-sm font-medium text-[#1a3a5c] shadow-lg transition-all duration-300 group-hover/pcard:scale-105 group-hover/pcard:shadow-[0_0_28px_rgba(24,165,253,0.55)]">
                View Project
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <span
                className="font-sans text-xs font-medium uppercase tracking-wider"
                style={{ color: siteTheme.cyan }}
              >
                {project.role}
              </span>
            </div>
            <p
              className="line-clamp-2 font-sans text-sm leading-relaxed opacity-80"
              style={{ color: siteTheme.navy }}
            >
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[#c5e8f7] px-3 py-1 font-sans text-xs"
                  style={{ color: siteTheme.navy }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-3 py-1 font-sans text-xs opacity-60" style={{ color: siteTheme.navy }}>
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
