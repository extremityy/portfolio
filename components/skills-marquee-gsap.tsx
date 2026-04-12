"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"

interface SkillsMarqueeGsapProps {
  items: string[]
  className?: string
  separator?: string
  /** Base loop duration in seconds (higher = slower) */
  duration?: number
}

export function SkillsMarqueeGsap({
  items,
  className = "",
  separator = "  ·  ",
  duration = 45,
}: SkillsMarqueeGsapProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    const wrap = wrapRef.current
    if (!track || !wrap) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    let tween: gsap.core.Tween | null = null
    const build = () => {
      tween?.kill()
      const half = track.scrollWidth / 2
      if (half <= 0) return
      tween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -half,
          duration,
          ease: "none",
          repeat: -1,
        }
      )
    }

    build()
    const ro = new ResizeObserver(() => {
      build()
    })
    ro.observe(track)

    const slow = () => tween?.timeScale(0.22)
    const normal = () => tween?.timeScale(1)
    wrap.addEventListener("mouseenter", slow)
    wrap.addEventListener("mouseleave", normal)

    return () => {
      ro.disconnect()
      wrap.removeEventListener("mouseenter", slow)
      wrap.removeEventListener("mouseleave", normal)
      tween?.kill()
    }
  }, [items, duration])

  const dup = [...items, ...items]

  return (
    <div ref={wrapRef} className={`cursor-default overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        {dup.map((item, index) => (
          <span key={index} className="inline-flex shrink-0 items-center">
            <span>{item}</span>
            <span className="mx-6 text-[#1a3a5c]/35">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
