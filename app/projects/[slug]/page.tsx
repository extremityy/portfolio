"use client"

import { useLayoutEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, ExternalLink, Github, ChevronRight, Target, Users, Clock, CheckCircle2, Search, Crosshair, Palette, Code, RefreshCw } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { projects } from "@/lib/projects-data"
import { siteTheme } from "@/lib/site-theme"
import Link from "next/link"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const navy = siteTheme.navy

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const project = projects.find((p) => p.slug === slug)
  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const mainRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!project) return
    const main = mainRef.current
    if (!main) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>("[data-detail-reveal]")
      groups.forEach((group) => {
        const targets = group.querySelectorAll("[data-detail-reveal-item]")
        if (!targets.length) return
        gsap.fromTo(
          targets,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }, main)
    return () => ctx.revert()
  }, [project, slug])

  if (!project) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-6"
        style={{ backgroundColor: siteTheme.lightBlue }}
      >
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold" style={{ color: navy }}>
            Project Not Found
          </h1>
          <Button
            onClick={() => router.push("/projects")}
            className="rounded-full border-0 bg-[#18A5FD] px-6 font-semibold text-white hover:bg-[#1290e0]"
          >
            Back to Projects
          </Button>
        </div>
      </main>
    )
  }

  const designThinkingSteps = project.designThinking ? [
    { 
      title: "Discover", 
      content: project.designThinking.empathize, 
      icon: Search,
      iconBg: "bg-[#18A5FD]/15",
      iconColor: "text-[#18A5FD]",
      borderColor: "border-[#18A5FD]/30"
    },
    { 
      title: "Define", 
      content: project.designThinking.define, 
      icon: Crosshair,
      iconBg: "bg-pink-500/15",
      iconColor: "text-pink-500",
      borderColor: "border-pink-500/30"
    },
    { 
      title: "Design", 
      content: project.designThinking.ideate, 
      icon: Palette,
      iconBg: "bg-orange-500/15",
      iconColor: "text-orange-500",
      borderColor: "border-orange-500/30"
    },
    { 
      title: "Develop", 
      content: project.designThinking.prototype, 
      icon: Code,
      iconBg: "bg-red-500/15",
      iconColor: "text-red-500",
      borderColor: "border-red-500/30"
    },
    { 
      title: "Improve", 
      content: project.designThinking.test, 
      icon: RefreshCw,
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-500",
      borderColor: "border-purple-500/30"
    },
  ] : []

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen"
      style={{ backgroundColor: siteTheme.lightBlue }}
    >
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32" data-detail-reveal>
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            data-detail-reveal-item
            onClick={() => router.push("/projects")}
            className="mb-10 flex items-center gap-2 font-sans text-sm transition-all duration-300 hover:scale-[1.02]"
            style={{ color: `${navy}99` }}
          >
            <ArrowLeft size={20} />
            <span className="hover:text-[#18A5FD]">Back to Projects</span>
          </button>

          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div data-detail-reveal-item>
              <div className="mb-4 inline-block rounded-full bg-white/50 px-3 py-1.5 backdrop-blur-sm">
                <span
                  className="font-sans text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#18A5FD" }}
                >
                  {project.role}
                </span>
              </div>

              <h1
                className="mb-6 font-sans text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                style={{ color: navy }}
              >
                {project.title}
              </h1>

              <p
                className="mb-8 max-w-xl font-sans text-lg leading-relaxed"
                style={{ color: `${navy}cc` }}
              >
                {project.fullDescription}
              </p>

              <div className="flex flex-wrap gap-4">
                {project.liveUrl && (
                  <Button
                    asChild
                    className="rounded-full border-0 bg-[#18A5FD] px-6 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1290e0] hover:shadow-[0_0_28px_rgba(24,165,253,0.45)]"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} className="mr-2" />
                      View Live
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    asChild
                    className="rounded-full border-2 bg-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/50"
                    style={{ borderColor: `${navy}40`, color: navy }}
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={18} className="mr-2" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div data-detail-reveal-item className="relative">
              <div
                className="relative overflow-hidden rounded-2xl border-2 border-white/60 bg-white/35 shadow-[0_20px_60px_rgba(13,36,64,0.12)] backdrop-blur-md"
              >
                <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
                  <Image
                    src={project.heroImage}
                    alt={`${project.title} — hero`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a3a5c]/92 via-[#1a3a5c]/75 to-transparent px-6 pb-5 pt-16 md:px-8 md:pb-6">
                    <h2 className="font-sans text-xl font-bold text-white md:text-2xl">
                      {project.tagline}
                    </h2>
                  </div>
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-50 blur-3xl"
                style={{ background: "#18A5FD" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Role & Contribution Section */}
      {project.roleDetails && (
        <section
          className="border-y border-white/40 px-6 py-20"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)" }}
          data-detail-reveal
        >
          <div className="mx-auto max-w-7xl">
            <h2
              data-detail-reveal-item
              className="mb-12 font-sans text-3xl font-bold"
              style={{ color: navy }}
            >
              My Role & <span className="text-[#18A5FD]">Contribution</span>
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div data-detail-reveal-item className="rounded-2xl border-2 border-white/50 bg-white/40 p-6 backdrop-blur-sm">
                <Users className="mb-4 h-8 w-8 text-[#18A5FD]" />
                <h3 className="mb-2 font-semibold" style={{ color: navy }}>Role</h3>
                <p className="text-sm" style={{ color: `${navy}99` }}>{project.roleDetails.title}</p>
              </div>
              
              <div data-detail-reveal-item className="rounded-2xl border-2 border-white/50 bg-white/40 p-6 backdrop-blur-sm">
                <Clock className="mb-4 h-8 w-8 text-[#18A5FD]" />
                <h3 className="mb-2 font-semibold" style={{ color: navy }}>Duration</h3>
                <p className="text-sm" style={{ color: `${navy}99` }}>{project.roleDetails.duration}</p>
              </div>
              
              {project.roleDetails.team && (
                <div data-detail-reveal-item className="rounded-2xl border-2 border-white/50 bg-white/40 p-6 backdrop-blur-sm md:col-span-2">
                  <Target className="mb-4 h-8 w-8 text-[#18A5FD]" />
                  <h3 className="mb-2 font-semibold" style={{ color: navy }}>Team</h3>
                  <p className="text-sm" style={{ color: `${navy}99` }}>{project.roleDetails.team}</p>
                </div>
              )}
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div data-detail-reveal-item className="rounded-2xl border-2 border-white/50 bg-white/40 p-6 backdrop-blur-sm">
                <h3 className="mb-4 font-semibold text-lg" style={{ color: navy }}>Responsibilities</h3>
                <ul className="space-y-3">
                  {project.roleDetails.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: `${navy}cc` }}>
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#18A5FD]" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-detail-reveal-item className="rounded-2xl border-2 border-white/50 bg-white/40 p-6 backdrop-blur-sm">
                <h3 className="mb-4 font-semibold text-lg" style={{ color: navy }}>My Contribution</h3>
                <p className="text-sm leading-relaxed" style={{ color: `${navy}cc` }}>
                  {project.roleDetails.contribution}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Problem & Insights Section */}
      <section className="px-6 py-20" data-detail-reveal>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div data-detail-reveal-item>
              <div className="mb-4 inline-block rounded-full bg-[#18A5FD]/15 px-3 py-1 backdrop-blur-sm">
                <span className="font-sans text-xs uppercase tracking-wider" style={{ color: navy }}>
                  The Challenge
                </span>
              </div>
              <h2 className="mb-6 font-sans text-3xl font-bold" style={{ color: navy }}>
                Problem Statement
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: `${navy}cc` }}>
                {project.problemStatement}
              </p>
            </div>

            <div data-detail-reveal-item>
              <div className="mb-4 inline-block rounded-full bg-[#18A5FD]/15 px-3 py-1 backdrop-blur-sm">
                <span className="font-sans text-xs uppercase tracking-wider" style={{ color: navy }}>
                  Research Findings
                </span>
              </div>
              <h2 className="mb-6 font-sans text-3xl font-bold" style={{ color: navy }}>
                Key Insights
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: `${navy}cc` }}>
                {project.insights}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Thinking Process */}
      {project.designThinking && (
        <section
          className="border-y border-white/40 px-6 py-20"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)" }}
          data-detail-reveal
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center" data-detail-reveal-item>
              <span 
                className="mb-4 inline-block font-sans text-sm font-semibold uppercase tracking-widest"
                style={{ color: "#18A5FD" }}
              >
                WORKFLOW
              </span>
              <h2 className="font-sans text-4xl font-bold md:text-5xl" style={{ color: navy }}>
                My Design <span className="text-[#18A5FD]">Process</span>
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-base" style={{ color: `${navy}80` }}>
                A strategic approach to creating digital experiences that are both beautiful and functional.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {designThinkingSteps.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <div
                    key={step.title}
                    data-detail-reveal-item
                    className="relative rounded-2xl border bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                    style={{ borderColor: "rgba(255,255,255,0.6)" }}
                  >
                    {/* Step number in top right */}
                    <span 
                      className="absolute top-4 right-4 font-sans text-4xl font-bold"
                      style={{ color: `${navy}15` }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${step.iconBg} ${step.borderColor} border`}>
                      <IconComponent className={`h-5 w-5 ${step.iconColor}`} />
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-sans text-lg font-semibold" style={{ color: navy }}>
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: `${navy}99` }}>
                      {step.content}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Solution Section */}
      {project.solution && (
        <section className="px-6 py-20" data-detail-reveal>
          <div className="mx-auto max-w-7xl">
            <h2
              data-detail-reveal-item
              className="mb-12 font-sans text-3xl font-bold"
              style={{ color: navy }}
            >
              The <span className="text-[#18A5FD]">Solution</span>
            </h2>

            <div data-detail-reveal-item className="mb-12 rounded-2xl border-2 border-white/50 bg-white/40 p-8 backdrop-blur-sm">
              <h3 className="mb-4 font-semibold text-xl" style={{ color: navy }}>Overview</h3>
              <p className="text-lg leading-relaxed" style={{ color: `${navy}cc` }}>
                {project.solution.overview}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div data-detail-reveal-item className="rounded-2xl border-2 border-white/50 bg-white/40 p-6 backdrop-blur-sm">
                <h3 className="mb-6 font-semibold text-lg" style={{ color: navy }}>Key Design Decisions</h3>
                <ul className="space-y-4">
                  {project.solution.keyDecisions.map((decision, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: `${navy}cc` }}>
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#18A5FD]/15 text-xs font-bold text-[#18A5FD]">
                        {i + 1}
                      </span>
                      {decision}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-detail-reveal-item className="rounded-2xl border-2 border-[#18A5FD]/30 bg-[#18A5FD]/5 p-6 backdrop-blur-sm">
                <h3 className="mb-6 font-semibold text-lg" style={{ color: navy }}>Impact & Results</h3>
                <ul className="space-y-4">
                  {project.solution.impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: `${navy}cc` }}>
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#18A5FD]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Gallery */}
      {project.previewImages.length > 0 && (
        <section
          className="border-y border-white/40 px-6 py-20"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)" }}
          data-detail-reveal
        >
          <div className="mx-auto max-w-7xl">
            <h2
              data-detail-reveal-item
              className="mb-4 font-sans text-2xl font-bold"
              style={{ color: navy }}
            >
              Project Screens
            </h2>
            <p
              data-detail-reveal-item
              className="mb-12 max-w-2xl font-sans text-sm"
              style={{ color: `${navy}aa` }}
            >
              UI flows and pages from the live product — showcasing the complete user experience.
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.previewImages.map((src, index) => (
                <figure
                  key={src}
                  data-detail-reveal-item
                  className="overflow-hidden rounded-xl border-2 border-white/50 bg-white/40 shadow-md backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(24,165,253,0.2)]"
                >
                  <div className="relative aspect-[4/3] w-full bg-white/30">
                    <Image
                      src={src}
                      alt={
                        project.galleryCaptions?.[index] ??
                        `${project.title} screenshot ${index + 1}`
                      }
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {project.galleryCaptions?.[index] ? (
                    <figcaption
                      className="border-t border-[#18A5FD]/20 px-4 py-3 font-sans text-xs"
                      style={{ color: `${navy}aa` }}
                    >
                      {project.galleryCaptions[index]}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Features */}
      <section className="px-6 py-20" data-detail-reveal>
        <div className="mx-auto max-w-7xl">
          <h2
            data-detail-reveal-item
            className="mb-8 font-sans text-2xl font-bold"
            style={{ color: navy }}
          >
            Key Features
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {project.features.map((feature, index) => (
              <div
                key={feature}
                data-detail-reveal-item
                className="rounded-xl border-2 border-white/55 bg-white/40 p-4 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#18A5FD]/50 hover:bg-white/55"
              >
                <span className="mb-2 block font-sans text-2xl font-bold text-[#18A5FD]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm" style={{ color: `${navy}cc` }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section
        className="border-t border-white/40 px-6 py-20"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)" }}
        data-detail-reveal
      >
        <div className="mx-auto max-w-7xl">
          <h2
            data-detail-reveal-item
            className="mb-8 font-sans text-2xl font-bold"
            style={{ color: navy }}
          >
            Technologies Used
          </h2>

          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                data-detail-reveal-item
                className="rounded-full border-2 border-white/55 bg-white/40 px-4 py-2 font-sans text-sm shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-[#18A5FD]/55 hover:shadow-[0_0_16px_rgba(24,165,253,0.25)]"
                style={{ color: navy }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="px-6 py-20" data-detail-reveal>
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div data-detail-reveal-item>
              <Button
                variant="outline"
                asChild
                className="rounded-full border-2 bg-white/35 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/55"
                style={{ borderColor: `${navy}35`, color: navy }}
              >
                <Link href="/projects">
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Projects
                </Link>
              </Button>
            </div>

            <div data-detail-reveal-item>
              <Button
                asChild
                className="group rounded-full border-0 bg-[#18A5FD] px-6 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#1290e0] hover:shadow-[0_0_28px_rgba(24,165,253,0.45)]"
              >
                <Link href={`/projects/${nextProject.slug}`}>
                  View {nextProject.title}
                  <ChevronRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
