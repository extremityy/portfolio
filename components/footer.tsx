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
      id="contact"
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: siteTheme.lightBlue }}
    >
      {/* Contact Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* Section title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-[#1a3a5c] text-center mb-16"
        >
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left side content */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <Image
                src="/images/crystal-flower.png"
                alt="Crystal Flower"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
            <div className="text-center lg:text-left space-y-3">
              <p className="text-2xl md:text-3xl font-sans font-semibold text-[#1a3a5c]">
                Let&apos;s build something
              </p>
              <p className="text-2xl md:text-3xl font-sans font-bold text-[#18A5FD]">
                beautiful together
              </p>
              <p className="text-[#1a3a5c]/70 font-sans text-base leading-relaxed max-w-sm mx-auto lg:mx-0 mt-2">
                Have a project in mind? Fill in the form and I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            className="bg-white/60 backdrop-blur-md border border-[#18A5FD]/20 rounded-3xl p-8 md:p-10 shadow-xl"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="flex flex-col items-center justify-center h-64 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#18A5FD]/20 flex items-center justify-center">
                  <span className="text-3xl text-[#18A5FD]">&#10003;</span>
                </div>
                <p className="text-[#1a3a5c] text-xl font-sans font-semibold text-center">
                  Message sent! I&apos;ll be in touch soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-field">
                  <label className="block text-[#1a3a5c]/80 text-sm font-sans font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Kencho Dorji"
                    className="w-full bg-white border border-[#18A5FD]/30 rounded-xl px-4 py-3 text-[#1a3a5c] placeholder-[#1a3a5c]/40 font-sans text-sm focus:outline-none focus:border-[#18A5FD] focus:ring-2 focus:ring-[#18A5FD]/20 transition-all duration-300"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-[#1a3a5c]/80 text-sm font-sans font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hello@example.com"
                    className="w-full bg-white border border-[#18A5FD]/30 rounded-xl px-4 py-3 text-[#1a3a5c] placeholder-[#1a3a5c]/40 font-sans text-sm focus:outline-none focus:border-[#18A5FD] focus:ring-2 focus:ring-[#18A5FD]/20 transition-all duration-300"
                  />
                </div>

                <div className="form-field">
                  <label className="block text-[#1a3a5c]/80 text-sm font-sans font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white border border-[#18A5FD]/30 rounded-xl px-4 py-3 text-[#1a3a5c] placeholder-[#1a3a5c]/40 font-sans text-sm focus:outline-none focus:border-[#18A5FD] focus:ring-2 focus:ring-[#18A5FD]/20 transition-all duration-300 resize-none"
                  />
                </div>

                <div className="form-field">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#18A5FD] hover:bg-[#1290e0] text-white font-sans font-semibold py-4 rounded-xl text-base transition-colors duration-300 shadow-lg"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a3a5c]/20 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/kd-logo.png"
                alt="KD Design"
                width={120}
                height={36}
                className="h-9 w-auto object-contain"
              />
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-[#1a3a5c]/70 hover:text-[#18A5FD] transition-colors font-sans">
                Home
              </Link>
              <Link href="/projects" className="text-[#1a3a5c]/70 hover:text-[#18A5FD] transition-colors font-sans">
                Projects
              </Link>
              <Link href="/about" className="text-[#1a3a5c]/70 hover:text-[#18A5FD] transition-colors font-sans">
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

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#1a3a5c]/50 font-sans">
            <div className="flex gap-5">
              <Link href="#" className="hover:text-[#18A5FD] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#18A5FD] transition-colors">Terms & Conditions</Link>
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-9 h-9 rounded-full bg-[#1a3a5c]/10 flex items-center justify-center text-[#1a3a5c]/70 hover:text-[#18A5FD] hover:bg-[#18A5FD]/10 transition-colors border border-[#1a3a5c]/20"
    >
      {icon}
    </motion.a>
  )
}
