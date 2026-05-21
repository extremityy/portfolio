"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FlipTextProps {
  children: string
  className?: string
  highlightClassName?: string
  isHighlighted?: boolean
}

export function FlipText({ 
  children, 
  className = "", 
  highlightClassName = "",
  isHighlighted = false 
}: FlipTextProps) {
  const [flippedLetters, setFlippedLetters] = useState<Set<number>>(new Set())
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = useCallback(() => {
    if (isAnimating) return
    
    setIsAnimating(true)
    const letters = children.split("")
    
    // Sequentially flip each letter to the right
    letters.forEach((_, index) => {
      setTimeout(() => {
        setFlippedLetters(prev => new Set([...prev, index]))
      }, index * 60)
    })

    // Reset after animation completes
    setTimeout(() => {
      setFlippedLetters(new Set())
      setIsAnimating(false)
    }, letters.length * 60 + 800)
  }, [children, isAnimating])

  return (
    <span 
      onClick={handleClick}
      className={`inline-flex cursor-pointer select-none ${className}`}
      style={{ perspective: "1000px" }}
    >
      {children.split("").map((letter, index) => (
        <motion.span
          key={index}
          className={`inline-block ${isHighlighted ? highlightClassName : ""}`}
          initial={{ rotateY: 0, x: 0 }}
          animate={{
            rotateY: flippedLetters.has(index) ? [0, 90, 180, 270, 360] : 0,
            x: flippedLetters.has(index) ? [0, 20, 40, 20, 0] : 0,
            scale: flippedLetters.has(index) ? [1, 1.1, 1.2, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ 
            transformStyle: "preserve-3d",
            display: letter === " " ? "inline" : "inline-block",
            minWidth: letter === " " ? "0.25em" : "auto",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  )
}

interface FlipLineProps {
  text: string
  className?: string
  highlightWords?: { word: string; className: string }[]
}

export function FlipLine({ text, className = "", highlightWords = [] }: FlipLineProps) {
  const words = text.split(" ")
  
  return (
    <span className={className}>
      {words.map((word, wordIndex) => {
        const highlight = highlightWords.find(h => h.word.toLowerCase() === word.toLowerCase())
        
        return (
          <span key={wordIndex}>
            <FlipText 
              className="hover:opacity-80 transition-opacity"
              highlightClassName={highlight?.className || ""}
              isHighlighted={!!highlight}
            >
              {word}
            </FlipText>
            {wordIndex < words.length - 1 && " "}
          </span>
        )
      })}
    </span>
  )
}
