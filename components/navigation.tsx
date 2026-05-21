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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(
      linksRef.current.filter(Boolean),
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.2,
      }
    )
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
  ]

  return (
    <>
      <motion.header
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[#d4e9f7]/95 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative flex-shrink-0 h-10 md:h-12"
            >
              <Image
                src="/images/kd-logo.png"
                alt="KD Design"
                width={160}
                height={48}
                className="h-full w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Center Navigation Pill */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-[#1a3a5c]/90 backdrop-blur-sm rounded-full px-2 py-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => { linksRef.current[index] = el }}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Button on the right */}
          <Link
            href="#contact"
            className="hidden md:flex items-center justify-center px-5 py-2 rounded-full bg-[#3b82f6] text-white text-sm font-medium hover:bg-[#2563eb] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Contact
          </Link>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1a3a5c]"
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
              className="md:hidden border-b border-[#18A5FD]/25 bg-[#d4e9f7]/95 backdrop-blur-xl"
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
                      className={`block py-3 font-sans font-semibold text-lg ${
                        pathname === link.href ? "text-[#18A5FD]" : "text-[#1a3a5c]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                {/* Mobile Contact Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                >
                  <Link
                    href="#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center px-6 py-3 mt-2 rounded-full bg-[#3b82f6] text-white font-semibold text-lg hover:bg-[#2563eb] transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
