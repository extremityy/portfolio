"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  type?: "words" | "chars" | "lines"
}

export function SplitText({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = 0.05,
  type = "words"
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const items = type === "chars" 
    ? text.split("") 
    : type === "lines"
    ? text.split("\n")
    : text.split(" ")

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      y: "100%",
      opacity: 0,
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {items.map((item, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={itemVariants}
          >
            {item}
            {type === "words" && index < items.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}

export function RevealText({ 
  children, 
  className = "",
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ 
          duration: 0.8, 
          ease: [0.25, 0.1, 0.25, 1],
          delay 
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function FadeInText({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay 
      }}
    >
      {children}
    </motion.div>
  )
}
