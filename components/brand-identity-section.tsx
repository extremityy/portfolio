"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteTheme } from "@/lib/site-theme"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const colorPalette = [
  { hex: "#18A5FD", name: "Brand Blue", textColor: "#fff" },
  { hex: "#1a3a5c", name: "Navy Dark", textColor: "#fff" },
  { hex: "#d4e9f7", name: "Ice Blue", textColor: "#1a3a5c" },
  { hex: "#0d2440", name: "Deep Navy", textColor: "#fff" },
  { hex: "#FFFFFF", name: "White", textColor: "#1a3a5c", border: true },
]

export function BrandIdentitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll(".animate-item"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.12,
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
      className="relative py-28 md:py-36 px-6 overflow-hidden"
      style={{ backgroundColor: siteTheme.lightBlue }}
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.06]" style={{ background: `radial-gradient(circle, ${siteTheme.brand} 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{ background: `radial-gradient(circle, ${siteTheme.navy} 0%, transparent 70%)`, transform: "translate(-30%, 30%)" }} />
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-item">
          <span className="text-[#18A5FD] text-xs font-sans font-semibold tracking-[0.22em] uppercase mb-4 block">
            Visual System
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a3a5c]">
            Brand <span className="text-[#18A5FD]">Identity</span>
          </h2>
          <p className="text-[#1a3a5c]/60 mt-5 max-w-xl mx-auto font-sans text-base leading-relaxed">
            A cohesive visual language built on clarity, craft, and creative depth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

          {/* ── Logo Section ── */}
          <div className="animate-item bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#18A5FD]/20 shadow-sm flex flex-col gap-8">
            <span className="text-[#18A5FD] text-xs font-sans font-semibold tracking-[0.2em] uppercase">
              Logo Mark
            </span>

            {/* Light background variant */}
            <div className="flex items-center gap-6">
              <div className="w-44 h-[72px] bg-[#d4e9f7] rounded-xl flex items-center justify-center border border-[#18A5FD]/20 overflow-hidden px-3">
                <Image
                  src="/images/kd-logo.png"
                  alt="KD Design logo — light variant"
                  width={148}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-serif text-base font-semibold text-[#1a3a5c]">Primary</p>
                <p className="font-sans text-sm text-[#1a3a5c]/55">Light background</p>
              </div>
            </div>

            {/* Dark background variant */}
            <div className="flex items-center gap-6">
              <div className="w-44 h-[72px] bg-[#0d2440] rounded-xl flex items-center justify-center overflow-hidden px-3 border border-[#18A5FD]/30">
                <Image
                  src="/images/kd-logo.png"
                  alt="KD Design logo — dark variant"
                  width={148}
                  height={52}
                  className="object-contain brightness-[2.4] saturate-150"
                />
              </div>
              <div>
                <p className="font-serif text-base font-semibold text-[#1a3a5c]">Inverted</p>
                <p className="font-sans text-sm text-[#1a3a5c]/55">Dark background</p>
              </div>
            </div>

            {/* Brand blue variant */}
            <div className="flex items-center gap-6">
              <div className="w-44 h-[72px] bg-[#18A5FD] rounded-xl flex items-center justify-center overflow-hidden px-3">
                <Image
                  src="/images/kd-logo.png"
                  alt="KD Design logo — brand variant"
                  width={148}
                  height={52}
                  className="object-contain brightness-[2.6] saturate-0"
                />
              </div>
              <div>
                <p className="font-serif text-base font-semibold text-[#1a3a5c]">Brand</p>
                <p className="font-sans text-sm text-[#1a3a5c]/55">Brand blue surface</p>
              </div>
            </div>
          </div>

          {/* ── Color Palette ── */}
          <div className="animate-item bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#18A5FD]/20 shadow-sm">
            <span className="text-[#18A5FD] text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-7 block">
              Color Palette
            </span>
            <div className="flex flex-wrap gap-4">
              {colorPalette.map((color) => (
                <div key={color.hex} className="flex flex-col items-center gap-2">
                  <div
                    className="w-[72px] h-[72px] md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-end pb-2 shadow-sm"
                    style={{
                      backgroundColor: color.hex,
                      border: color.border ? "1.5px solid #e2e8f0" : undefined,
                    }}
                  >
                    <span
                      className="text-[10px] font-mono leading-none"
                      style={{ color: color.textColor }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <span className="text-[#1a3a5c]/60 text-xs font-sans text-center leading-tight max-w-[80px]">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Typography ── */}
          <div className="animate-item md:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#18A5FD]/20 shadow-sm">
            <span className="text-[#18A5FD] text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-8 block">
              Typography
            </span>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Playfair Display */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-sans text-xs text-[#1a3a5c]/50 uppercase tracking-widest mb-1">Display / Headings</p>
                  <p className="font-serif text-4xl font-bold text-[#1a3a5c] leading-tight">
                    Playfair Display
                  </p>
                </div>
                <p className="font-serif text-lg text-[#1a3a5c]/70 leading-relaxed">
                  Aa Bb Cc Dd Ee Ff Gg
                </p>
                <p className="font-serif text-sm text-[#1a3a5c]/50 leading-relaxed">
                  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />
                  a b c d e f g h i j k l m n o p q r s t u v w x y z<br />
                  0 1 2 3 4 5 6 7 8 9
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Regular 400", "Bold 700", "Italic"].map((w) => (
                    <span key={w} className="rounded-full border border-[#18A5FD]/30 px-3 py-1 text-xs font-sans text-[#1a3a5c]/70">
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Inter */}
              <div className="flex flex-col gap-4">
                <div>
                  <p className="font-sans text-xs text-[#1a3a5c]/50 uppercase tracking-widest mb-1">Body / Interface</p>
                  <p className="font-sans text-4xl font-bold text-[#1a3a5c] leading-tight">
                    Inter
                  </p>
                </div>
                <p className="font-sans text-lg text-[#1a3a5c]/70 leading-relaxed">
                  Aa Bb Cc Dd Ee Ff Gg
                </p>
                <p className="font-sans text-sm text-[#1a3a5c]/50 leading-relaxed">
                  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br />
                  a b c d e f g h i j k l m n o p q r s t u v w x y z<br />
                  0 1 2 3 4 5 6 7 8 9
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Regular 400", "Medium 500", "Semibold 600", "Bold 700"].map((w) => (
                    <span key={w} className="rounded-full border border-[#18A5FD]/30 px-3 py-1 text-xs font-sans text-[#1a3a5c]/70">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Type specimen */}
            <div className="mt-10 pt-8 border-t border-[#18A5FD]/15">
              <p className="font-sans text-xs text-[#1a3a5c]/40 uppercase tracking-widest mb-4">Type Specimen</p>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#1a3a5c] leading-tight mb-3">
                Designing a design that leads, not follow.
              </h3>
              <p className="font-sans text-base text-[#1a3a5c]/65 leading-relaxed max-w-2xl">
                Helping startups build intuitive digital products through strategy, visual storytelling, and seamless user experience.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
