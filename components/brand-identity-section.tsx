"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteTheme } from "@/lib/site-theme"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const colorPalette = [
  { hex: "#FAFAFA", name: "Background" },
  { hex: "#3b82f6", name: "Primary Blue" },
  { hex: "#6366f1", name: "Accent Blue" },
  { hex: "#1e293b", name: "Foreground" },
  { hex: "#94a3b8", name: "Muted" },
]

export function BrandIdentitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll(".animate-item"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
      style={{ backgroundColor: siteTheme.lightBlue }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-item">
          <span className="text-[#3b82f6] text-sm font-semibold tracking-wider uppercase mb-4 block">
            VISUAL SYSTEM
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e293b]">
            Brand <span className="text-[#3b82f6]">Identity</span>
          </h2>
          <p className="text-[#64748b] mt-4 max-w-2xl mx-auto text-lg">
            A cohesive visual language that communicates professionalism, creativity, and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Logo Section */}
          <div className="animate-item bg-white rounded-2xl p-8 border border-[#e2e8f0] shadow-sm">
            <span className="text-[#3b82f6] text-xs font-semibold tracking-wider uppercase mb-6 block">
              LOGO
            </span>
            
            {/* Light Variant */}
            <div className="flex items-center gap-6 mb-8">
              <div className="w-40 h-20 bg-[#FAFAFA] rounded-xl flex items-center justify-center border border-[#e2e8f0]">
                <div className="text-2xl font-bold">
                  <span className="text-[#3b82f6]">K</span>
                  <span className="text-[#6366f1]">D</span>
                  <span className="text-[#1e293b]">-Design</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#1e293b] text-lg">KD-Design</h3>
                <p className="text-[#64748b] text-sm">Primary logo mark</p>
              </div>
            </div>

            {/* Dark Variant */}
            <div className="flex items-center gap-6">
              <div className="w-40 h-20 bg-[#1e293b] rounded-xl flex items-center justify-center">
                <div className="text-2xl font-bold">
                  <span className="text-[#3b82f6]">K</span>
                  <span className="text-[#6366f1]">D</span>
                  <span className="text-white">-Design</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#1e293b] text-lg">Dark Variant</h3>
                <p className="text-[#64748b] text-sm">For dark backgrounds</p>
              </div>
            </div>
          </div>

          {/* Color Palette Section */}
          <div className="animate-item bg-white rounded-2xl p-8 border border-[#e2e8f0] shadow-sm">
            <span className="text-[#3b82f6] text-xs font-semibold tracking-wider uppercase mb-6 block">
              COLOR PALETTE
            </span>
            
            <div className="flex flex-wrap gap-4 justify-start">
              {colorPalette.map((color) => (
                <div key={color.hex} className="flex flex-col items-center">
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-sm flex items-end justify-center pb-2 border border-[#e2e8f0]"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span 
                      className="text-xs font-mono"
                      style={{ 
                        color: color.hex === "#FAFAFA" || color.hex === "#94a3b8" ? "#64748b" : "#fff" 
                      }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <span className="text-[#64748b] text-xs mt-2 text-center">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
