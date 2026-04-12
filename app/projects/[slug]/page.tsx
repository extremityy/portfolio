"use client"

import { useLayoutEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, ExternalLink, Github, ChevronRight } from "lucide-react"
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
const sectionBand =
  "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)"

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
        style={{ background: siteTheme.heroGradient }}
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

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen"
      style={{ background: siteTheme.heroGradient }}
    >
      <Navigation />

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

      {project.previewImages.length > 0 && (
        <section
          className="border-y border-white/40 px-6 py-20"
          style={{ background: sectionBand }}
          data-detail-reveal
        >
          <div className="mx-auto max-w-7xl">
            <h2
              data-detail-reveal-item
              className="mb-4 font-sans text-2xl font-bold"
              style={{ color: navy }}
            >
              Project screens
            </h2>
            <p
              data-detail-reveal-item
              className="mb-12 max-w-2xl font-sans text-sm"
              style={{ color: `${navy}aa` }}
            >
              UI flows and pages from the live product — marketing site, customer-facing pages, and
              restaurant dashboard.
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

      <section
        className="border-y border-white/40 px-6 py-20"
        style={{ background: sectionBand }}
        data-detail-reveal
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div data-detail-reveal-item>
              <h2 className="mb-6 font-sans text-3xl font-bold" style={{ color: navy }}>
                Insights
              </h2>
              <p className="font-sans leading-relaxed" style={{ color: `${navy}cc` }}>
                {project.insights}
              </p>

              {project.previewImages.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {project.previewImages.slice(0, 4).map((src, i) => (
                    <div
                      key={src}
                      className="relative aspect-square overflow-hidden rounded-lg border-2 border-white/50 bg-white/30 shadow-sm"
                    >
                      <Image
                        src={src}
                        alt={project.galleryCaptions?.[i] ?? `${project.title} ${i + 1}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div data-detail-reveal-item>
              <div className="lg:sticky lg:top-32">
                <div className="mb-4 inline-block rounded-full bg-[#18A5FD]/15 px-3 py-1 backdrop-blur-sm">
                  <span
                    className="font-sans text-xs uppercase tracking-wider"
                    style={{ color: navy }}
                  >
                    Problem Statement
                  </span>
                </div>
                <p className="font-sans text-lg leading-relaxed" style={{ color: `${navy}cc` }}>
                  {project.problemStatement}
                </p>

                <div className="mt-8 rounded-xl border-2 border-white/55 bg-white/45 p-6 shadow-md backdrop-blur-md">
                  <div className="mb-4 flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg font-bold text-white"
                      style={{ background: "#18A5FD" }}
                    >
                      {project.title.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: navy }}>
                        {project.title}
                      </h3>
                      <p className="font-sans text-sm" style={{ color: `${navy}99` }}>
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20" data-detail-reveal>
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

      <section className="border-t border-white/45 px-6 py-20" data-detail-reveal>
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
