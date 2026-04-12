"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Github, Linkedin } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteTheme } from "@/lib/site-theme"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const flowerWrapRef = useRef<HTMLDivElement>(null)
  const flowerInnerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title slide-up
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Form slide up stagger
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll(".form-field"),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Flower outer: same scroll-scrub exit as projects hero (opacity → 0, scale → 1.28)
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

      // Flower inner: float + entrance (unchanged feel, decoupled from scrub scale)
      if (flowerInnerRef.current) {
        gsap.to(flowerInnerRef.current, {
          y: -30,
          rotation: 8,
          duration: 3.5,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <footer
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ background: siteTheme.footerGradient }}
    >
      {/* Contact Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Section title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white text-center mb-16"
        >
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Flower + tagline */}
          <div className="flex flex-col items-center gap-8">
            <div
              ref={flowerWrapRef}
              className="relative h-64 w-64 will-change-transform md:h-80 md:w-80"
            >
              <div
                className="absolute inset-0 scale-110 rounded-full blur-[60px]"
                style={{ backgroundColor: siteTheme.brandGlowSoft }}
              />
              <div ref={flowerInnerRef} className="relative z-10 h-full w-full">
                <Image
                  src="/images/crystal-flower.png"
                  alt="Crystal Flower"
                  fill
                  className="relative z-10 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
            <div className="text-center space-y-3">
              <p className="text-2xl md:text-3xl font-serif font-semibold text-white">
                Let&apos;s build something
              </p>
              <p className="text-2xl md:text-3xl font-serif font-bold text-white/90">
                beautiful together
              </p>
              <p className="text-white/70 font-sans text-base leading-relaxed max-w-sm mx-auto mt-2">
                Have a project in mind? Fill in the form and I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="flex flex-col items-center justify-center h-64 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-3xl text-white">&#10003;</span>
                </div>
                <p className="text-white text-xl font-serif font-semibold text-center">
                  Message sent! I&apos;ll be in touch soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field">
                  <label className="block text-white/80 text-sm font-sans font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Kencho Dorji"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-white/80 text-sm font-sans font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hello@example.com"
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-white/80 text-sm font-sans font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300 resize-none"
                  />
                </div>

                <div className="form-field">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-white text-[#1a3a5c] font-sans font-semibold py-4 rounded-xl text-base hover:bg-white/90 transition-colors duration-300 shadow-lg"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div>
              <p className="text-white font-serif font-bold text-xl">Kencho Dorji</p>
              <p className="text-white/60 font-sans text-sm">Brand Designer</p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-white/70 hover:text-white transition-colors font-sans">
                Home
              </Link>
              <Link href="/projects" className="text-white/70 hover:text-white transition-colors font-sans">
                Projects
              </Link>
              <Link href="/about" className="text-white/70 hover:text-white transition-colors font-sans">
                About Me
              </Link>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              <SocialLink href="#" icon={<Instagram size={16} />} label="Instagram" />
              <SocialLink href="#" icon={<Github size={16} />} label="GitHub" />
              <SocialLink href="#" icon={<Linkedin size={16} />} label="LinkedIn" />
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50 font-sans">
            <div className="flex gap-5">
              <Link href="#" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white/80 transition-colors">Terms & Conditions</Link>
            </div>
            <p>&copy; 2024 Kencho Dorji. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors border border-white/20"
    >
      {icon}
    </motion.a>
  )
}
