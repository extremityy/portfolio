"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface InteractiveAvatarProps {
  className?: string
}

// Function to create a pleasant Bhutanese-inspired greeting sound
function playGreetingSound() {
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    
    // Create a warm, welcoming bell-like sound (like a temple bell)
    const oscillator1 = audioContext.createOscillator()
    const oscillator2 = audioContext.createOscillator()
    const oscillator3 = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    // Deep resonant tone
    oscillator1.type = "sine"
    oscillator1.frequency.setValueAtTime(261.63, audioContext.currentTime) // C4
    
    // Harmonic overtone
    oscillator2.type = "sine"
    oscillator2.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
    
    // Soft high shimmer
    oscillator3.type = "sine"
    oscillator3.frequency.setValueAtTime(783.99, audioContext.currentTime) // G5
    
    // Gentle envelope
    gainNode.gain.setValueAtTime(0.12, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 0.3)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2)
    
    oscillator1.connect(gainNode)
    oscillator2.connect(gainNode)
    oscillator3.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator1.start(audioContext.currentTime)
    oscillator2.start(audioContext.currentTime + 0.05)
    oscillator3.start(audioContext.currentTime + 0.1)
    oscillator1.stop(audioContext.currentTime + 1.2)
    oscillator2.stop(audioContext.currentTime + 1.2)
    oscillator3.stop(audioContext.currentTime + 1.2)
  } catch {
    // Audio not supported or blocked
  }
}

export function InteractiveAvatar({ className = "" }: InteractiveAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [headRotation, setHeadRotation] = useState({ x: 0, y: 0 })
  const [showGreeting, setShowGreeting] = useState(false)
  const [isGreeting, setIsGreeting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || isGreeting) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height * 0.3
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    
    const maxRotation = 10
    const rotateY = Math.max(-maxRotation, Math.min(maxRotation, deltaX / 50))
    const rotateX = Math.max(-maxRotation / 2, Math.min(maxRotation / 2, -deltaY / 80))
    
    setHeadRotation({ x: rotateX, y: rotateY })
  }, [isGreeting])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const handleClick = () => {
    if (isGreeting) return
    
    setShowGreeting(true)
    setIsGreeting(true)
    
    // Play greeting sound
    playGreetingSound()
    
    setTimeout(() => {
      setShowGreeting(false)
      setIsGreeting(false)
    }, 4000)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Speech bubble with Bhutanese greeting */}
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap"
          >
            <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-2xl border border-[#18A5FD]/20">
              {/* Prayer hands emoji for Bhutanese greeting */}
              <div className="flex items-center gap-3">
                <motion.span 
                  className="text-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -5, 5, 0]
                  }}
                  transition={{ duration: 1.5, repeat: 1 }}
                >
                  🙏
                </motion.span>
                <div>
                  <p className="text-[#1a3a5c] font-semibold text-base md:text-lg">
                    Kuzuzangpola!
                  </p>
                  <p className="text-[#64748b] text-xs md:text-sm">
                    Welcome to my portfolio
                  </p>
                </div>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 border-r border-b border-[#18A5FD]/20 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover hint */}
      <AnimatePresence>
        {isHovered && !showGreeting && !isGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
          >
            <span className="bg-[#1a3a5c]/90 text-white text-xs px-4 py-2 rounded-full whitespace-nowrap font-medium shadow-lg">
              Click to greet!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waving hand animation - appears during greeting */}
      <AnimatePresence>
        {isGreeting && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[20%] right-[-15%] z-30"
          >
            <motion.div
              className="text-4xl md:text-5xl"
              animate={{
                rotate: [0, 20, -15, 20, -15, 20, -10, 0],
              }}
              transition={{
                duration: 1.8,
                ease: "easeInOut",
                repeat: 1,
              }}
              style={{ transformOrigin: "70% 70%" }}
            >
              👋
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar container - NO background box, clean floating avatar */}
      <div className="relative w-full h-full">
        {/* Soft ambient glow behind avatar */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.4 : 0.25,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-[5%] rounded-full"
          style={{
            background: "radial-gradient(circle at 50% 40%, rgba(24, 165, 253, 0.35) 0%, rgba(24, 165, 253, 0.15) 40%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Main avatar with head tracking and greeting animation */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            perspective: 1200,
          }}
          animate={{
            rotateX: isGreeting ? 8 : headRotation.x, // Slight bow when greeting
            rotateY: isGreeting ? 0 : headRotation.y,
            scale: isGreeting ? 0.98 : (isHovered ? 1.02 : 1),
            y: isGreeting ? 10 : 0, // Slight bow movement
          }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <Image
            src="/images/avatar-character.jpg"
            alt="Kencho Dorji - Interactive Avatar"
            fill
            className="object-contain object-bottom drop-shadow-2xl"
            priority
            sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 420px"
          />
        </motion.div>

        {/* Decorative sparkles that appear when greeting */}
        <AnimatePresence>
          {isGreeting && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#18A5FD" : "#6366f1",
                    boxShadow: `0 0 6px ${i % 2 === 0 ? "#18A5FD" : "#6366f1"}`,
                  }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: "50%",
                    y: "40%",
                  }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.2, 1, 0],
                    x: `${50 + (Math.cos(i * Math.PI / 4) * 60)}%`,
                    y: `${40 + (Math.sin(i * Math.PI / 4) * 35)}%`,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Prayer hands indicator during greeting */}
        <AnimatePresence>
          {isGreeting && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="absolute bottom-[25%] left-1/2 -translate-x-1/2 z-20"
            >
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-xl border border-[#18A5FD]/20"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: 2,
                  ease: "easeInOut",
                }}
              >
                <span className="text-3xl">🙏</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
