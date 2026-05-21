"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface InteractiveAvatarProps {
  className?: string
}

export function InteractiveAvatar({ className = "" }: InteractiveAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [headRotation, setHeadRotation] = useState({ x: 0, y: 0 })
  const [showGreeting, setShowGreeting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height * 0.25 // Head is in upper portion
    
    // Calculate angle from center to mouse
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    
    // Normalize and limit rotation (-15 to 15 degrees)
    const maxRotation = 12
    const rotateY = Math.max(-maxRotation, Math.min(maxRotation, deltaX / 40))
    const rotateX = Math.max(-maxRotation / 2, Math.min(maxRotation / 2, -deltaY / 60))
    
    setHeadRotation({ x: rotateX, y: rotateY })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handleClick = () => {
    setShowGreeting(true)
    setTimeout(() => setShowGreeting(false), 3500)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative cursor-pointer ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
          >
            <div className="relative bg-white rounded-2xl px-5 py-3 shadow-xl border-2 border-[#18A5FD]/30">
              <p className="text-[#1a3a5c] font-medium text-sm md:text-base">
                Kuzuzangpola, welcome to my portfolio!
              </p>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-[#18A5FD]/30 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint on hover */}
      <AnimatePresence>
        {isHovered && !showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 z-10"
          >
            <span className="bg-[#1a3a5c]/80 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap">
              Click to greet!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar container with head tracking effect */}
      <div className="relative w-full h-full">
        {/* Decorative dots pattern */}
        <div className="absolute -right-8 top-1/4 opacity-30">
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#18A5FD]/40" />
            ))}
          </div>
        </div>

        {/* Subtle glow effect */}
        <motion.div
          animate={{
            boxShadow: isHovered 
              ? "0 0 60px rgba(24, 165, 253, 0.3)" 
              : "0 0 40px rgba(24, 165, 253, 0.15)"
          }}
          className="absolute inset-0 rounded-full"
        />

        {/* Main avatar with head tracking transform */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          animate={{
            rotateX: headRotation.x,
            rotateY: headRotation.y,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.5,
          }}
        >
          <Image
            src="/images/avatar-character.jpg"
            alt="Kencho Dorji - Interactive 3D Avatar"
            fill
            className="object-contain object-bottom transition-transform duration-200"
            priority
            sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 420px"
          />
        </motion.div>

        {/* Hover ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#18A5FD]/0 pointer-events-none"
          animate={{
            borderColor: isHovered ? "rgba(24, 165, 253, 0.4)" : "rgba(24, 165, 253, 0)",
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}
