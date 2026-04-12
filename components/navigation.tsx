"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteTheme } from "@/lib/site-theme"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([])
  const isCaseStudy = /^\/projects\/[^/]+$/.test(pathname) && pathname !== "/projects"
  const isProjectsIndex = pathname === "/projects"
  const isHome = pathname === "/"
  /** Project detail uses the same light blue hero as home — nav matches home when unscrolled */
  const isLightHeroTop = isHome || isCaseStudy

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // GSAP animation for nav links
    gsap.fromTo(
      linksRef.current.filter(Boolean),
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.2,
      }
    )
  }, [])

  const navLinkClass =
    "text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] leading-none tracking-tight"

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About Us" },
  ]

  return (
    <>
      {/* Main Navigation */}
      <motion.header
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isLightHeroTop && !scrolled
            ? "bg-transparent"
            : isProjectsIndex
              ? scrolled
                ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-[#18A5FD]/10"
                : "bg-white/82 backdrop-blur-md shadow-sm shadow-[#18A5FD]/5"
              : scrolled
                ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-[#18A5FD]/10"
                : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo / Profile */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`relative flex-shrink-0 h-12 w-12 overflow-hidden border-2 border-[#18A5FD]/25 shadow-md transition-colors group-hover:border-[#18A5FD]/55 ${
                isCaseStudy ? "rounded-full" : "rounded-xl"
              }`}
            >
              <Image
                src="/images/myself.png"
                alt="Kencho Dorji"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </motion.div>
            <div>
              <p
                className={`font-sans font-bold text-lg leading-tight ${
                  isLightHeroTop && !scrolled ? "text-neutral-900" : "text-[#1a3a5c]"
                }`}
              >
                Kencho Dorji
              </p>
              <p
                className={`text-xs font-medium ${
                  isLightHeroTop && !scrolled ? "text-neutral-600" : ""
                }`}
                style={isLightHeroTop && !scrolled ? undefined : { color: siteTheme.brand }}
              >
                Brand Designer
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Large staggered sizes */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => { linksRef.current[index] = el }}
                className={`relative group font-sans font-bold transition-all duration-300 ${navLinkClass} ${
                  isLightHeroTop && !scrolled
                    ? pathname === link.href
                      ? "text-white [text-shadow:0_1px_4px_rgba(13,36,64,0.35)]"
                      : "text-white/95 [text-shadow:0_1px_3px_rgba(13,36,64,0.28)] hover:text-white"
                    : pathname === link.href
                      ? "text-[#1a3a5c]"
                      : "text-[#1a3a5c]/80 hover:text-[#18A5FD]"
                }`}
              >
                {link.label}
                <motion.span
                  className={`absolute -bottom-1 left-0 h-[3px] rounded-full ${
                    isLightHeroTop && !scrolled ? "bg-white" : "bg-[#18A5FD]"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: pathname === link.href ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 ${
              isLightHeroTop && !scrolled ? "text-[#0d2440]" : "text-[#1a3a5c]"
            }`}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden border-b border-[#18A5FD]/25 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-6 py-6 flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-3 font-sans font-bold text-3xl md:text-4xl ${
                        pathname === link.href ? "text-[#1a3a5c]" : "text-[#1a3a5c]/70"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
