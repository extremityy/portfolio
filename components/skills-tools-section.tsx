"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { siteTheme } from "@/lib/site-theme"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const skillsData = [
  {
    category: "Design",
    skills: [
      "UI/UX Design",
      "Wireframing",
      "Prototyping",
      "Brand Identity",
      "Visual Design",
      "Design Systems",
      "User Flow",
    ],
  },
  {
    category: "Development",
    skills: [
      "React",
      "JavaScript",
      "Node.js",
      "Frontend Development",
      "Responsive Design",
      "API Integration",
      "MongoDB",
    ],
  },
  {
    category: "Tools",
    skills: [
      "Figma",
      "Vercel",
      "GitHub",
      "Canva",
      "Microsoft Clarity",
      "Google Analytics",
    ],
  },
  {
    category: "Analytics & Growth",
    skills: [
      "Google Analytics",
      "Microsoft Clarity",
      "User Behaviour Tracking",
      "Portfolio Performance Review",
      "Data-Driven Iteration",
    ],
  },
]

export function SkillsToolsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.querySelectorAll(".skill-card"),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6"
      style={{ backgroundColor: siteTheme.lightBlue }}
    >
      <div ref={contentRef} className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#3b82f6] text-sm font-semibold tracking-wider uppercase mb-4 block">
            EXPERTISE
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e293b]">
            Skills & <span className="text-[#3b82f6]">Tools</span>
          </h2>
          <p className="text-[#64748b] mt-4 max-w-2xl mx-auto text-lg">
            A comprehensive toolkit for designing and building exceptional digital experiences.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((section) => (
            <div
              key={section.category}
              className="skill-card bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-[#3b82f6] font-semibold text-lg mb-6">
                {section.category}
              </h3>
              <ul className="space-y-3">
                {section.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6] flex-shrink-0" />
                    <span className="text-[#475569] text-sm">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
