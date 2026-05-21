"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface InteractiveAvatarProps {
  className?: string
}

// Function to create a friendly greeting sound using Web Audio API
function playGreetingSound() {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    
    // Create a pleasant bell-like sound
    const oscillator1 = audioContext.createOscillator()
    const oscillator2 = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator1.type = "sine"
    oscillator1.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
    oscillator1.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
    oscillator1.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
    
    oscillator2.type = "sine"
    oscillator2.frequency.setValueAtTime(392, audioContext.currentTime) // G4
    oscillator2.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.15) // C5
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator1.start(audioContext.currentTime)
    oscillator2.start(audioContext.currentTime)
    oscillator1.stop(audioContext.currentTime + 0.5)
    oscillator2.stop(audioContext.currentTime + 0.5)
  } catch {
    // Audio not supported or blocked
  }
}

export function InteractiveAvatar({ className = "" }: InteractiveAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [headRotation, setHeadRotation] = useState({ x: 0, y: 0 })
  const [showGreeting, setShowGreeting] = useState(false)
  const [isWaving, setIsWaving] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height * 0.25
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    
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
    if (isWaving) return
    
    setShowGreeting(true)
    setIsWaving(true)
    
    // Play greeting sound
    playGreetingSound()
    
    setTimeout(() => {
      setShowGreeting(false)
      setIsWaving(false)
    }, 3500)
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

      {/* Waving hand visual effect */}
      <AnimatePresence>
        {isWaving && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute top-[15%] left-[85%] z-30 pointer-events-none"
          >
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#18A5FD]/20 flex items-center justify-center"
              animate={{
                rotate: [0, 15, -15, 15, -15, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 text-[#18A5FD]" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M7 11.5V14h2v-2.5c0-.83-.67-1.5-1.5-1.5S6 10.67 6 11.5H4c0-1.93 1.57-3.5 3.5-3.5 1.2 0 2.26.61 2.89 1.53L12 8.5l2 2V14h2v-2.5c0-.83-.67-1.5-1.5-1.5S13 10.67 13 11.5H11c0-1.93 1.57-3.5 3.5-3.5S18 8.07 18 10v4c0 1.1-.9 2-2 2h-2v4h-4v-4H8c-1.1 0-2-.9-2-2v-4c0-1.93 1.57-3.5 3.5-3.5S13 8.07 13 10H11c0-.83-.67-1.5-1.5-1.5S8 9.17 8 10v.5H6v1z"/>
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar container - no box, just the avatar */}
      <div className="relative w-full h-full">
        {/* Subtle glow effect behind avatar */}
        <motion.div
          animate={{
            boxShadow: isHovered 
              ? "0 0 80px rgba(24, 165, 253, 0.25)" 
              : "0 0 60px rgba(24, 165, 253, 0.12)"
          }}
          className="absolute inset-[10%] rounded-full blur-sm"
        />

        {/* Main avatar with head tracking and wave animation */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          animate={{
            rotateX: headRotation.x,
            rotateY: headRotation.y,
            scale: isWaving ? [1, 1.02, 1] : 1,
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
            alt="Kencho Dorji - Interactive Avatar"
            fill
            className="object-contain object-bottom transition-transform duration-200"
            priority
            sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 420px"
          />
        </motion.div>

        {/* Decorative particles that appear when waving */}
        <AnimatePresence>
          {isWaving && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#18A5FD]"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: "50%",
                    y: "30%",
                  }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: `${50 + (Math.random() - 0.5) * 100}%`,
                    y: `${30 + (Math.random() - 0.5) * 40}%`,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.15,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
