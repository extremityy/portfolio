"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Each skill with its brand color(s)
const skills = [
  {
    name: "Figma",
    icon: "figma",
    color: "#F24E1E",
  },
  {
    name: "HTML",
    icon: "html",
    color: "#E44D26",
  },
  {
    name: "CSS",
    icon: "css",
    color: "#264DE4",
  },
  {
    name: "VS Code",
    icon: "vscode",
    color: "#007ACC",
  },
  {
    name: "JavaScript",
    icon: "js",
    color: "#F7DF1E",
    textColor: "#333",
  },
  {
    name: "React",
    icon: "react",
    color: "#61DAFB",
    textColor: "#333",
  },
  {
    name: "Next.js",
    icon: "nextjs",
    color: "#000000",
  },
  {
    name: "TypeScript",
    icon: "ts",
    color: "#3178C6",
  },
  {
    name: "Tailwind",
    icon: "tailwind",
    color: "#06B6D4",
  },
  {
    name: "Premiere",
    icon: "premiere",
    color: "#9999FF",
  },
  {
    name: "Adobe XD",
    icon: "xd",
    color: "#FF61F6",
    textColor: "#fff",
  },
  {
    name: "Photoshop",
    icon: "photoshop",
    color: "#31A8FF",
  },
  {
    name: "Illustrator",
    icon: "illustrator",
    color: "#FF9A00",
  },
  {
    name: "After Effects",
    icon: "aftereffects",
    color: "#9999FF",
  },
]

function BrandIcon({ icon, color, textColor }: { icon: string; color: string; textColor?: string }) {
  const c = color
  const tc = textColor ?? "#fff"
  switch (icon) {
    case "figma":
      return (
        <svg viewBox="0 0 38 57" className="w-7 h-7 md:w-9 md:h-9" fill="none">
          <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0Z" fill="#0ACF83"/>
          <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19Z" fill="#FF7262"/>
          <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z" fill="#F24E1E"/>
          <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z" fill="#A259FF"/>
        </svg>
      )
    case "html":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill={c}>
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
        </svg>
      )
    case "css":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill={c}>
          <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11H6.254l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
        </svg>
      )
    case "vscode":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill={c}>
          <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
        </svg>
      )
    case "js":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9">
          <rect width="24" height="24" rx="2" fill={c}/>
          <path fill={tc} d="M6 18.5c.32.52.74.9 1.46.9.72 0 1.18-.36 1.18-.87 0-.61-.47-.83-1.27-1.18l-.44-.19C5.72 16.76 5 16.15 5 14.84c0-1.2.9-2.12 2.32-2.12.99 0 1.71.35 2.22 1.26l-1.21.78c-.27-.49-.56-.68-.98-.68-.44 0-.72.28-.72.68 0 .48.28.67 1.03 1l.44.19c1.31.56 2.04 1.15 2.04 2.47 0 1.42-1.11 2.24-2.61 2.24-1.47 0-2.41-.7-2.87-1.63L6 18.5zm7.78-.06c.35.62.78.93 1.39.93.58 0 .91-.24.91-.89V12.8H17.5V18.5c0 1.53-.9 2.23-2.21 2.23-1.19 0-1.88-.62-2.23-1.37l1.22-.92z"/>
        </svg>
      )
    case "react":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill={c}>
          <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-... truncated"/>
        </svg>
      )
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill={c}>
          <path d="M11.572 0c-.176 0-.31.001-.358.007-.063.006-.22.012-.364.033C7.443.343 4.25 2.185 2.228 5.012.999 6.58.38 8.367.108 10.255c-.096.67-.133.888-.133 1.754s.037 1.084.133 1.754c.664 4.602 4.13 8.428 8.644 9.529.396.097.938.16 1.357.159h.009c.519 0 1.092-.058 1.506-.146.697-.146 1.363-.38 1.99-.699a17.407 17.407 0 0 0 .96-.617V9.244c0-.01-.01-.019-.019-.019h-2.484c-.01 0-.019.01-.019.019v.759a.019.019 0 0 0 .019.019h1.299V17.53a5.99 5.99 0 0 1-.605.306c-.39.168-.789.287-1.205.354-.765.126-1.566.118-2.327-.023a5.081 5.081 0 0 1-1.956-.804 5.531 5.531 0 0 1-1.47-1.514c-.39-.558-.684-1.19-.861-1.849-.316-1.175-.307-2.435.026-3.603.201-.712.519-1.385.934-1.988a5.553 5.553 0 0 1 1.474-1.51c1.274-.928 2.886-1.352 4.48-1.178.793.087 1.565.319 2.257.68.012.006.025.004.034-.004l.528-.923c.007-.013.003-.029-.01-.037a7.203 7.203 0 0 0-2.833-.948 8.144 8.144 0 0 0-1.264-.068c-1.612.028-3.214.522-4.542 1.4a7.15 7.15 0 0 0-2.217 2.1 7.317 7.317 0 0 0-1.215 2.786c-.215 1.003-.245 2.045-.086 3.06.167 1.068.533 2.083 1.081 2.991a7.215 7.215 0 0 0 2.217 2.1c1.328.878 2.93 1.372 4.542 1.4.396.007.792-.014 1.183-.063.824-.103 1.624-.32 2.37-.645.94-.411 1.784-.999 2.483-1.728V6.984L24 18.404h-3.857l-6.643-9.814z"/>
        </svg>
      )
    case "ts":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9">
          <rect width="24" height="24" rx="2" fill={c}/>
          <path fill="#fff" d="M3 13.5V11h18v2.5h-6.5V22H12v-8.5H3zm9-1.5h8.75v2H12V12z"/>
        </svg>
      )
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9" fill={c}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      )
    case "premiere":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9">
          <rect width="24" height="24" rx="3" fill="#0A0A0A"/>
          <path fill={c} d="M3 18V6h3.8c1.35 0 2.35.34 3 1.01.65.67.97 1.65.97 2.93 0 .72-.15 1.36-.45 1.93a3.09 3.09 0 0 1-1.3 1.28c-.57.3-1.25.45-2.04.45H5.25V18H3zm2.25-6.6h1.45c.58 0 1.02-.16 1.3-.49.28-.33.42-.8.42-1.41 0-.62-.14-1.09-.42-1.4-.28-.32-.72-.48-1.3-.48H5.25v3.78zm10.3 6.82c-.9 0-1.69-.18-2.37-.55a3.9 3.9 0 0 1-1.59-1.55c-.38-.67-.57-1.45-.57-2.35 0-.9.19-1.68.57-2.35a3.9 3.9 0 0 1 1.59-1.55c.68-.37 1.47-.55 2.37-.55.9 0 1.69.18 2.37.55.68.37 1.21.89 1.59 1.55.38.67.57 1.45.57 2.35 0 .9-.19 1.68-.57 2.35a3.9 3.9 0 0 1-1.59 1.55c-.68.37-1.47.55-2.37.55zm0-1.7c.58 0 1.06-.14 1.43-.42.37-.28.64-.66.8-1.13.17-.47.25-.98.25-1.55 0-.57-.08-1.08-.25-1.55-.17-.47-.43-.84-.8-1.13-.37-.28-.85-.42-1.43-.42-.58 0-1.06.14-1.43.42-.37.28-.64.66-.8 1.13-.17.47-.25.98-.25 1.55 0 .57.08 1.08.25 1.55.17.47.43.84.8 1.13.37.28.85.42 1.43.42z"/>
        </svg>
      )
    case "xd":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9">
          <rect width="24" height="24" rx="3" fill="#470137"/>
          <path fill={c} d="M12.545 10.239v1.456l-2.61 5.235H8.127L10.7 12.1H8.39V10.24h4.155zm1.07 0h1.77l1.198 3.097 1.198-3.097h1.68l-1.87 4.05 1.95 3.64h-1.77l-1.268-3.27-1.268 3.27H13.54l1.95-3.64-1.875-4.05z"/>
        </svg>
      )
    case "photoshop":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9">
          <rect width="24" height="24" rx="3" fill="#001D26"/>
          <path fill={c} d="M9.85 8.42c-.37-.15-.77-.21-1.18-.2-.26 0-.49 0-.68.01V12c.14.01.27.02.39.02h.53c.39 0 .78-.06 1.15-.18.32-.09.6-.28.82-.53.21-.25.31-.59.31-1.03.01-.31-.07-.6-.23-.84a1.47 1.47 0 0 0-.7-.62zM4.25 0A4.25 4.25 0 0 0 0 4.25v15.5A4.25 4.25 0 0 0 4.25 24h15.5A4.25 4.25 0 0 0 24 19.75V4.25A4.25 4.25 0 0 0 19.75 0zm7.09 11.65c-.34.5-.82.88-1.37 1.11-.56.25-1.26.36-2.09.36h-.5a6.8 6.8 0 0 1-.33-.01v3.41c0 .1-.04.14-.13.14H6.3c-.09 0-.14-.04-.14-.14V6.78c0-.1.06-.15.16-.15.47-.01 1.01-.02 1.56-.04.59-.01 1.15-.02 1.68-.02.77 0 1.42.08 1.96.25.48.15.92.39 1.28.73.31.29.55.65.71 1.06.14.36.22.76.22 1.21 0 .83-.2 1.52-.61 2.08zm6.53 4.57c-.54.49-1.36.73-2.47.73-.7 0-1.39-.1-2.06-.3-.1-.03-.13-.09-.13-.18v-1.78c0-.04.02-.09.05-.11a.17.17 0 0 1 .11-.03c.34.12.69.22 1.06.28.37.06.74.1 1.11.1.36 0 .62-.05.77-.15.15-.09.23-.24.23-.43 0-.15-.07-.3-.2-.44-.12-.15-.4-.32-.83-.5-1.03-.43-1.71-.87-2.04-1.32a2.35 2.35 0 0 1-.49-1.5c0-.77.27-1.4.82-1.86.54-.47 1.29-.7 2.25-.7.68 0 1.36.09 2.03.27.11.03.15.1.15.2v1.68c0 .04-.02.09-.06.11a.12.12 0 0 1-.11.02c-.63-.2-1.3-.31-1.99-.31-.34 0-.58.06-.74.16a.53.53 0 0 0-.21.45c0 .18.08.34.24.48.17.14.5.33 1.01.56.68.29 1.17.59 1.47.91.3.33.45.76.45 1.31 0 .74-.27 1.36-.8 1.85z"/>
        </svg>
      )
    case "illustrator":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9">
          <rect width="24" height="24" rx="3" fill="#330000"/>
          <path fill={c} d="M9.53 14.1H6.15l-.73 2.27c-.03.1-.1.14-.22.14H3.67c-.13 0-.16-.06-.13-.2L6.98 7.17c.03-.13.07-.26.1-.4.04-.22.06-.45.06-.68 0-.08.04-.12.1-.12h2.27c.08 0 .13.03.14.1l3.32 10.3c.03.13 0 .19-.12.19h-1.99c-.1 0-.17-.04-.2-.15l-.13-.31zm-3-1.8h2.62l-.8-2.52c-.07-.23-.15-.5-.23-.82-.08-.31-.16-.63-.23-.95h-.04c-.07.32-.14.64-.21.95-.07.32-.15.59-.22.82l-.88 2.52zm7.4-5.2c-.32 0-.59-.11-.82-.32a1.1 1.1 0 0 1-.33-.82c0-.33.11-.6.33-.81.23-.22.5-.33.82-.33.34 0 .62.11.84.33.22.21.33.48.33.81 0 .32-.11.59-.33.82-.22.21-.5.32-.84.32zm-1.02 9.27V9.59c0-.1.04-.15.14-.15h1.77c.1 0 .14.05.14.15v6.78c0 .11-.04.16-.14.16H12.9c-.1 0-.15-.05-.15-.16z"/>
        </svg>
      )
    case "aftereffects":
      return (
        <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-9 md:h-9">
          <rect width="24" height="24" rx="3" fill="#0A0A0A"/>
          <path fill={c} d="M10.29 14.1H6.91l-.73 2.27c-.03.1-.1.14-.22.14H4.43c-.13 0-.16-.06-.13-.2l3.44-10.14c.03-.13.07-.26.1-.4.04-.22.06-.45.06-.68 0-.08.04-.12.1-.12h2.27c.08 0 .13.03.14.1l3.32 10.3c.03.13 0 .19-.12.19h-1.99c-.1 0-.17-.04-.2-.15l-.13-.31zm-3-1.8h2.62l-.8-2.52c-.07-.23-.15-.5-.23-.82-.08-.31-.16-.63-.23-.95h-.04c-.07.32-.14.64-.21.95-.07.32-.15.59-.22.82l-.88 2.52zm6.95-1.02c.02.6.17 1.05.45 1.35.28.3.68.45 1.2.45.27 0 .54-.04.8-.12.26-.08.51-.18.74-.3.07-.04.13-.04.16.04l.54 1.3c.04.08.02.14-.05.18-.3.16-.64.29-1.01.38-.37.1-.77.14-1.18.14-.67 0-1.25-.12-1.73-.37-.48-.24-.84-.6-1.1-1.07-.25-.47-.38-1.04-.38-1.72 0-.67.12-1.26.37-1.75.25-.5.61-.88 1.08-1.15.47-.27 1.03-.41 1.67-.41.59 0 1.08.12 1.49.35.41.23.72.57.93 1.01.22.44.33.98.33 1.63v.14c0 .1-.05.14-.15.14h-3.95l-.01.17zm2.58-1.04c-.01-.47-.12-.84-.31-1.1-.2-.26-.47-.39-.83-.39-.36 0-.65.13-.87.4-.22.26-.35.63-.4 1.1h2.41z"/>
        </svg>
      )
    default:
      return null
  }
}

// Seeded pseudo-random to keep SSR/CSR consistent (changes on mount via useEffect)
function rand(seed: number, min: number, max: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  const r = x - Math.floor(x)
  return min + r * (max - min)
}

export function SkillsBubbles() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLDivElement[]

    const ctx = gsap.context(() => {
      // Set initial positions randomly within the container
      bubbles.forEach((bubble, i) => {
        const containerW = section.offsetWidth
        const containerH = section.offsetHeight
        const bSize = bubble.offsetWidth || 90
        const x = rand(i * 3 + 1, bSize * 0.5, containerW - bSize * 1.5)
        const y = rand(i * 3 + 2, bSize * 0.5, containerH - bSize * 1.5)
        gsap.set(bubble, { x, y, scale: 0, opacity: 0 })
      })

      // Entrance animation
      gsap.to(bubbles, {
        scale: 1,
        opacity: 1,
        duration: prefersReduce ? 0.3 : 0.7,
        stagger: prefersReduce ? 0.01 : 0.06,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onComplete: () => {
          if (prefersReduce) return
          // Start continuous drifting after entrance
          bubbles.forEach((bubble, i) => {
            startDrift(bubble, i, section)
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24"
      style={{
        minHeight: "600px",
        background: "linear-gradient(135deg, #e8f4fc 0%, #d0eaf8 40%, #b8dff5 100%)",
      }}
    >
      {/* Subtle radial overlays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(24,165,253,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(24,165,253,0.1) 0%, transparent 55%)",
        }}
        aria-hidden
      />

      {/* Section heading */}
      <div className="relative z-10 text-center mb-6 pointer-events-none">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a3a5c] text-balance">
          Skills &amp; Tools
        </h2>
        <p className="mt-3 font-sans text-sm md:text-base text-[#1a3a5c]/65 max-w-md mx-auto px-6">
          Technologies and creative tools I use every day
        </p>
      </div>

      {/* Bubbles layer — absolutely positioned children */}
      <div className="absolute inset-0" aria-hidden>
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            ref={(el) => {
              bubblesRef.current[index] = el
            }}
            className="absolute flex flex-col items-center justify-center will-change-transform cursor-default group"
            style={{ top: 0, left: 0 }}
          >
            {/* Glass bubble */}
            <div
              className="relative flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
              style={{
                width: "clamp(72px, 10vw, 100px)",
                height: "clamp(72px, 10vw, 100px)",
                background: "rgba(255, 255, 255, 0.18)",
                border: "1.5px solid rgba(255,255,255,0.55)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow:
                  "0 8px 32px rgba(24,165,253,0.10), 0 2px 8px rgba(255,255,255,0.3) inset, 0 -2px 8px rgba(24,165,253,0.08) inset",
              }}
            >
              {/* Specular highlight */}
              <div
                className="pointer-events-none absolute rounded-full"
                style={{
                  inset: "6px",
                  background:
                    "radial-gradient(ellipse at 35% 28%, rgba(255,255,255,0.55) 0%, transparent 60%)",
                }}
              />
              {/* Colored brand icon */}
              <div className="relative z-10 drop-shadow-sm">
                <BrandIcon
                  icon={skill.icon}
                  color={skill.color}
                  textColor={skill.textColor}
                />
              </div>
            </div>
            {/* Label */}
            <span
              className="mt-1.5 font-sans text-[10px] md:text-xs font-semibold tracking-wide text-[#1a3a5c]/70 whitespace-nowrap"
            >
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

/**
 * Continuously drift a bubble across the container, bouncing off edges.
 * Uses recursive GSAP tweens so each step picks a new random target.
 */
function startDrift(bubble: HTMLDivElement, index: number, container: HTMLDivElement) {
  const getTarget = () => {
    const cW = container.offsetWidth
    const cH = container.offsetHeight
    const bW = bubble.offsetWidth || 90
    const bH = bubble.offsetHeight || 110
    return {
      x: Math.random() * (cW - bW),
      y: Math.random() * (cH - bH),
    }
  }

  const animate = () => {
    const { x, y } = getTarget()
    const duration = 4 + Math.random() * 5 // 4–9 s per move
    gsap.to(bubble, {
      x,
      y,
      duration,
      ease: "sine.inOut",
      delay: index * 0.1,
      onComplete: animate, // loop forever with a new target each time
    })
  }

  animate()
}
