"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"
import { ArrowRight, Download } from "lucide-react"
import { siteTheme } from "@/lib/site-theme"
import { FlipLine } from "@/components/flip-text"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const content = contentRef.current
    const image = imageRef.current
    if (!container || !content || !image) return

    const ctx = gsap.context(() => {
      // Animate content
      gsap.fromTo(
        content.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, delay: 0.35 }
      )
      
      // Animate hand image
      gsap.fromTo(
        image,
        { y: 60, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.5 }
      )
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ backgroundColor: siteTheme.lightBlue }}
    >
      <div className="relative z-[2] flex min-h-[100dvh] flex-col">
        <div className="flex w-full flex-1 flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-16 pt-28 pb-12 md:pt-32 lg:pt-24 max-w-7xl mx-auto">
          {/* Left Content */}
          <div ref={contentRef} className="flex flex-col max-w-2xl lg:max-w-xl xl:max-w-2xl">
            {/* Role Badge */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a3a5c]/10 border border-[#1a3a5c]/20">
                <span className="text-sm font-medium text-[#1a3a5c]">
                  UI/UX Designer &middot; Brand Designer &middot; Frontend Developer
                </span>
              </div>
            </div>

            {/* Main Headline with Flip Animation */}
            <h1 className="font-sans font-bold text-[#1a3a5c] text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
              <FlipLine 
                text="Designing" 
                highlightWords={[]}
              />{" "}
              <FlipLine 
                text="a design" 
                highlightWords={[{ word: "a", className: "text-[#18A5FD]" }, { word: "design", className: "text-[#18A5FD]" }]}
              />
              <br />
              <FlipLine 
                text="that leads," 
                highlightWords={[]}
              />
              <br />
              <FlipLine 
                text="not" 
                highlightWords={[]}
              />{" "}
              <FlipLine 
                text="follow." 
                highlightWords={[{ word: "follow.", className: "text-[#18A5FD]" }]}
              />
            </h1>

            {/* Description */}
            <p className="text-[#1a3a5c]/70 text-base md:text-lg leading-relaxed max-w-md mb-8">
              I&apos;m Kencho Dorji — helping startups build intuitive digital
              products through strategy, visual storytelling, and seamless
              user experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                asChild
                className="bg-[#18A5FD] hover:bg-[#1290e0] text-white rounded-full px-6 py-6 text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg group"
              >
                <Link href="/projects" className="flex items-center gap-2">
                  View Projects
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="bg-transparent border-2 border-[#18A5FD] text-[#18A5FD] hover:bg-[#18A5FD]/10 rounded-full px-6 py-6 text-sm font-semibold transition-all duration-300 group"
              >
                <a href="#" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </Button>

              <Link
                href="#contact"
                className="text-[#1a3a5c] hover:text-[#18A5FD] text-sm font-medium transition-colors duration-300 ml-2"
              >
                Contact Me
              </Link>
            </div>
          </div>

          {/* Right - Hand Image */}
          <div 
            ref={imageRef}
            className="relative mt-12 lg:mt-0 flex-shrink-0"
          >
            <div className="relative w-[280px] h-[380px] md:w-[320px] md:h-[420px] lg:w-[400px] lg:h-[500px] xl:w-[450px] xl:h-[560px]">
              <Image
                src="/images/hero-hand.jpg"
                alt="Creative hand illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
