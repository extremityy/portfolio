"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/projects-data"
import { siteTheme } from "@/lib/site-theme"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturedProject() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Get the first project as featured
  const featured = projects[0]

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      const items = content.querySelectorAll("[data-reveal]")
      
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  if (!featured) return null

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: siteTheme.lightBlue }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#18A5FD]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-[#18A5FD]/8 rounded-full blur-3xl" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12" data-reveal>
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#18A5FD]/10 text-[#18A5FD] text-xs font-semibold uppercase tracking-wider mb-4">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c]">
              Latest <span className="text-[#18A5FD]">Project</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-[#1a3a5c] hover:text-[#18A5FD] font-medium transition-colors group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Featured Project Card */}
        <div 
          data-reveal
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white/50 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-white/60 shadow-xl"
        >
          {/* Project Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/60 shadow-lg">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={featured.heroImage}
                  alt={featured.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-[#18A5FD]/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </div>

          {/* Project Info */}
          <div className="flex flex-col">
            {/* Role Badge */}
            <span className="inline-block self-start px-3 py-1 rounded-full bg-[#18A5FD]/15 text-[#18A5FD] text-xs font-semibold uppercase tracking-wider mb-4">
              {featured.role}
            </span>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1a3a5c] mb-3">
              {featured.title}
            </h3>

            {/* Tagline */}
            <p className="text-[#18A5FD] font-medium text-lg mb-4">
              {featured.tagline}
            </p>

            {/* Description */}
            <p className="text-[#1a3a5c]/70 leading-relaxed mb-6">
              {featured.description}
            </p>

            {/* Features Preview */}
            <div className="flex flex-wrap gap-2 mb-8">
              {featured.features.slice(0, 4).map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 rounded-lg bg-[#1a3a5c]/5 text-[#1a3a5c]/70 text-sm border border-[#1a3a5c]/10"
                >
                  {feature}
                </span>
              ))}
              {featured.features.length > 4 && (
                <span className="px-3 py-1.5 text-[#18A5FD] text-sm font-medium">
                  +{featured.features.length - 4} more
                </span>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="bg-[#18A5FD] hover:bg-[#1290e0] text-white rounded-full px-6 py-5 text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg group"
              >
                <Link href={`/projects/${featured.slug}`} className="flex items-center gap-2">
                  View Case Study
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              {featured.liveUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-2 border-[#1a3a5c]/20 text-[#1a3a5c] hover:border-[#18A5FD] hover:text-[#18A5FD] rounded-full px-6 py-5 text-sm font-semibold transition-all duration-300 group"
                >
                  <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="flex md:hidden justify-center mt-8" data-reveal>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-[#18A5FD] font-semibold transition-colors group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
