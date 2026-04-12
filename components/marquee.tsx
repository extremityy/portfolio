"use client"

import { motion } from "framer-motion"

interface MarqueeProps {
  items: string[]
  speed?: number
  direction?: "left" | "right"
  className?: string
  separator?: string
}

export function Marquee({ 
  items, 
  speed = 30,
  direction = "left",
  className = "",
  separator = " — "
}: MarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items]
  
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span key={index} className="inline-flex items-center">
            <span>{item}</span>
            <span className="mx-8 text-muted-foreground/50">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function LogoMarquee({ 
  items,
  speed = 25,
  className = ""
}: {
  items: { name: string; highlight?: boolean }[]
  speed?: number
  className?: string
}) {
  const duplicatedItems = [...items, ...items, ...items, ...items]
  
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex items-center gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <span 
            key={index} 
            className={`text-lg md:text-xl font-medium whitespace-nowrap transition-colors cursor-pointer ${
              item.highlight 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.name}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
