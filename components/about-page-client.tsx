"use client"

import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Palette, Code, Layers, Sparkles, Mail, MapPin, Phone, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SkillsMarqueeGsap } from "@/components/skills-marquee-gsap"
import { siteTheme } from "@/lib/site-theme"
import Image from "next/image"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const services: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating intuitive and visually stunning user interfaces that delight users and drive engagement.",
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Building fast, responsive, and scalable web applications using modern technologies.",
  },
  {
    icon: Layers,
    title: "Branding",
    description:
      "Crafting memorable brand identities that communicate your unique value proposition.",
  },
  {
    icon: Sparkles,
    title: "Motion Design",
    description:
      "Adding life to digital experiences through smooth animations and micro-interactions.",
  },
]

const skills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Figma",
  "Adobe XD",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "MongoDB",
  "PostgreSQL",
  "AWS",
]

const servicesList = [
  "UI/UX Design",
  "Web Development",
  "Mobile App Design",
  "Brand Identity",
  "Design Systems",
  "Prototyping",
]

function splitWords(text: string, key: string) {
  return text.split(/\s+/).map((word, i) => (
    <span key={`${key}-${i}`} className="about-bio-word inline-block pr-[0.3em]">
      {word}
    </span>
  ))
}

export default function AboutPageClient() {
  const mainRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const profileParallaxRef = useRef<HTMLDivElement>(null)
  const profileInnerRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const main = mainRef.current
    const hero = heroRef.current
    const glow = glowRef.current
    const title = titleRef.current
    const profileWrap = profileParallaxRef.current
    const profileInner = profileInnerRef.current
    const bio = bioRef.current
    if (!main || !hero || !title || !profileWrap || !profileInner || !bio) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine)").matches

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([title, profileWrap, profileInner, bio.querySelectorAll(".about-bio-word")], {
          clearProps: "all",
        })
        gsap.set(title, { opacity: 1, y: 0 })
        gsap.set(profileWrap, { opacity: 1, y: 0 })
        gsap.set(profileWrap, { opacity: 1 })
        gsap.set(profileInner, { scale: 1 })
        gsap.set(bio.querySelectorAll(".about-bio-word"), { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        title,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: title,
            start: "top 82%",
            end: "top 55%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        profileWrap,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: profileWrap,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        profileInner,
        { scale: 0.96 },
        {
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: profileWrap,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      const words = bio.querySelectorAll(".about-bio-word")
      gsap.fromTo(
        words,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.045,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bio,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      )

      ScrollTrigger.create({
        trigger: profileWrap,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const y = (self.progress - 0.5) * 36
          gsap.set(profileWrap, { y })
        },
      })
    }, main)

    const removeListeners: (() => void)[] = []

    if (!reduce && fine && glow) {
      gsap.set(glow, { opacity: 0.55, xPercent: -50, yPercent: -50 })
      const qx = gsap.quickTo(glow, "x", { duration: 0.75, ease: "power3.out" })
      const qy = gsap.quickTo(glow, "y", { duration: 0.75, ease: "power3.out" })
      const onMove = (e: MouseEvent) => {
        const r = hero.getBoundingClientRect()
        qx(e.clientX - r.left)
        qy(e.clientY - r.top)
      }
      const onLeave = () => {
        qx(hero.offsetWidth * 0.5)
        qy(hero.offsetHeight * 0.42)
      }
      hero.addEventListener("mousemove", onMove)
      hero.addEventListener("mouseleave", onLeave)
      onLeave()
      removeListeners.push(() => {
        hero.removeEventListener("mousemove", onMove)
        hero.removeEventListener("mouseleave", onLeave)
      })
    }

    if (!reduce) {
      const onPEnter = () =>
        gsap.to(profileInner, { scale: 1.05, duration: 0.55, ease: "power2.out" })
      const onPLeave = () =>
        gsap.to(profileInner, { scale: 1, duration: 0.55, ease: "power2.out" })
      profileInner.addEventListener("mouseenter", onPEnter)
      profileInner.addEventListener("mouseleave", onPLeave)
      removeListeners.push(() => {
        profileInner.removeEventListener("mouseenter", onPEnter)
        profileInner.removeEventListener("mouseleave", onPLeave)
      })
    }

    return () => {
      removeListeners.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen"
      style={{ backgroundColor: siteTheme.lightBlue }}
    >
      <Navigation />

      <section ref={heroRef} className="relative overflow-hidden px-6 pb-24 pt-40">
        <div
          ref={glowRef}
          className="pointer-events-none absolute z-[1] h-[min(100vw,520px)] w-[min(100vw,520px)] rounded-full opacity-0 md:opacity-100"
          style={{
            background:
              "radial-gradient(circle closest-side, rgba(255,255,255,0.5) 0%, rgba(24,165,253,0.22) 35%, transparent 70%)",
            mixBlendMode: "soft-light",
            left: 0,
            top: 0,
          }}
          aria-hidden
        />

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h1
              ref={titleRef}
              className="font-serif text-5xl font-bold text-[#1a3a5c] md:text-6xl lg:text-7xl"
            >
              About Me
            </h1>
          </div>

          <div className="grid items-center gap-20 lg:grid-cols-2">
            {/* Left side - Pixelated Avatar */}
            <div ref={profileParallaxRef} className="relative mx-auto max-w-md will-change-transform">
              <div className="absolute inset-0 rotate-3 rounded-full bg-gradient-to-br from-[#18A5FD] via-[#6366f1] to-[#18A5FD] opacity-40" />
              <div
                ref={profileInnerRef}
                className="relative aspect-square w-64 md:w-80 lg:w-96 cursor-default overflow-hidden rounded-full border-4 border-[#18A5FD]/35 bg-[#e8f4fc] shadow-lg will-change-transform"
              >
                <Image
                  src="/images/pixelated-avatar.jpg"
                  alt="Kencho Dorji - Pixelated"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 256px, 384px"
                  priority
                />
              </div>
            </div>

            <div ref={bioRef} className="space-y-5 font-sans leading-relaxed text-[#1a3a5c]/70">
              <h2 className="mb-6 font-serif text-3xl font-bold text-[#1a3a5c] md:text-4xl">
                Hello, I&apos;m Kencho Dorji
              </h2>
              <p>
                {splitWords(
                  "I am a passionate UI/UX Designer and Frontend Developer based in Bhutan. With a keen eye for design and a love for clean code, I create digital experiences that are both beautiful and functional.",
                  "a"
                )}
              </p>
              <p>
                {splitWords(
                  "My journey in design began with a curiosity for how things work and evolved into a deep appreciation for user-centered design. I believe that great design is not just about aesthetics, but about solving real problems and creating meaningful connections.",
                  "b"
                )}
              </p>
              <p>
                {splitWords(
                  "When I am not designing or coding, you can find me exploring the beautiful landscapes of Bhutan, reading about the latest design trends, or experimenting with new technologies.",
                  "c"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-[#18A5FD]/40 py-10">
        <SkillsMarqueeGsap
          items={skills}
          duration={48}
          className="text-2xl font-serif text-[#1a3a5c]/55 md:text-3xl"
        />
      </div>

      <AboutWhatIDoSection />

      <section className="bg-white/20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <AboutSectionTitle
            title="Skills & Technologies"
            subtitle="Tools and technologies I use to bring ideas to life."
          />
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="cursor-default rounded-full border border-[#18A5FD]/40 bg-white/80 px-6 py-3 font-sans font-medium text-[#1a3a5c] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#18A5FD] hover:shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AboutServicesFocusSection />

      <section className="bg-white/20 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <AboutSectionTitle
            title="Get In Touch"
            subtitle="Have a project in mind? Let's work together to create something amazing."
          />
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <AboutContactCard
              href="mailto:kenchodorji@gmail.com"
              icon={<Mail className="h-6 w-6 text-primary" />}
              title="Email"
              value="kenchodorji@gmail.com"
            />
            <AboutContactCard
              icon={<MapPin className="h-6 w-6 text-primary" />}
              title="Location"
              value="Bhutan"
            />
            <AboutContactCard
              icon={<Phone className="h-6 w-6 text-primary" />}
              title="Phone"
              value="Available on request"
            />
          </div>
          <div className="mt-16 text-center">
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-[#1a3a5c] px-10 py-7 font-sans text-lg text-white shadow-lg transition-all duration-300 hover:scale-[1.04] hover:bg-[#0d2440] hover:shadow-[0_0_32px_rgba(26,58,92,0.45)]"
            >
              <a href="mailto:kenchodorji@gmail.com">
                Start a Conversation
                <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function AboutSectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const hRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const h = hRef.current
    const sub = subRef.current
    if (!wrap || !h) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      gsap.set([h, sub], { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        h,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
      if (sub) {
        gsap.fromTo(
          sub,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrap,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, wrap)
    return () => ctx.revert()
  }, [title, subtitle])

  return (
    <div ref={wrapRef} className="mb-16 text-center">
      <h2
        ref={hRef}
        className="mb-4 font-serif text-4xl font-bold text-[#1a3a5c] md:text-5xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p ref={subRef} className="mx-auto max-w-2xl font-sans text-[#1a3a5c]/70">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

function AboutWhatIDoSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const fine = window.matchMedia("(pointer: fine)").matches
    if (reduce || !fine) return

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-what-card]"))

    const reset = () => {
      gsap.to(cards, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.06)",
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const onEnter = (i: number) => {
      cards.forEach((card, j) => {
        if (j === i) {
          gsap.to(card, {
            scale: 1.05,
            opacity: 1,
            filter: "blur(0px)",
            boxShadow:
              "0 0 0 1px rgba(24,165,253,0.55), 0 20px 50px -12px rgba(24,165,253,0.35), 0 12px 40px rgba(26,58,92,0.12)",
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          })
          const ic = card.querySelector("[data-what-icon]")
          if (ic) gsap.to(ic, { rotation: 8, duration: 0.5, ease: "back.out(2)" })
        } else {
          gsap.to(card, {
            scale: 0.98,
            opacity: 0.5,
            filter: "blur(1.5px)",
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          })
        }
      })
    }

    const handlers: { card: HTMLElement; enter: () => void }[] = []
    cards.forEach((card, i) => {
      const enter = () => onEnter(i)
      card.addEventListener("mouseenter", enter)
      card.addEventListener("mouseleave", reset)
      handlers.push({ card, enter })
    })

    return () => {
      handlers.forEach(({ card, enter }) => {
        card.removeEventListener("mouseenter", enter)
        card.removeEventListener("mouseleave", reset)
      })
    }
  }, [])

  return (
    <section className="px-6 py-32">
      <div ref={rootRef} className="mx-auto max-w-7xl">
        <AboutSectionTitle
          title="What I Do"
          subtitle="I offer a range of services to help bring your digital vision to life."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              data-what-card
              className="group relative cursor-default overflow-hidden rounded-2xl border border-[#18A5FD]/35 bg-white/80 p-8 shadow-md backdrop-blur-sm transition-colors duration-300 will-change-transform"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <service.icon data-what-icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 font-serif text-xl font-semibold text-[#1a3a5c] transition-colors duration-300 group-hover:text-[#18A5FD]">
                  {service.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-[#1a3a5c]/70">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutServicesFocusSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    if (!section || !list) return
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-service-row]"))
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: list,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      if (reduce || items.length === 0) return

      const updateFocus = () => {
        const centerY = window.innerHeight * 0.48
        items.forEach((el) => {
          const r = el.getBoundingClientRect()
          const mid = r.top + r.height / 2
          const dist = Math.abs(mid - centerY)
          const t = Math.max(0, 1 - dist / (window.innerHeight * 0.3))
          const scale = 1 + t * 0.12
          const opacity = 0.62 + t * 0.38
          gsap.to(el, {
            scale,
            opacity,
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          })
          const title = el.querySelector<HTMLElement>("[data-service-title]")
          if (title) title.style.fontWeight = t > 0.52 ? "700" : "600"
        })
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: updateFocus,
      })
      updateFocus()
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <AboutSectionTitle title="Services I Provide" />
        <div ref={listRef} className="space-y-4">
          {servicesList.map((service) => (
            <div
              key={service}
              data-service-row
              className="group flex origin-center cursor-default items-center justify-between rounded-xl border border-[#18A5FD]/35 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-colors duration-300 will-change-transform hover:border-[#18A5FD]"
            >
              <span
                data-service-title
                className="font-serif text-xl font-semibold text-[#1a3a5c] transition-colors md:text-2xl group-hover:text-[#18A5FD]"
                style={{ fontWeight: 600 }}
              >
                {service}
              </span>
              <span className="text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutContactCard({
  href,
  icon,
  title,
  value,
}: {
  href?: string
  icon: React.ReactNode
  title: string
  value: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  const inner = (
    <div
      ref={ref}
      className="flex flex-col items-center rounded-2xl border border-[#18A5FD]/35 bg-white/80 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#18A5FD] hover:shadow-lg"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <h3 className="mb-2 font-serif font-semibold text-[#1a3a5c]">{title}</h3>
      <p className="text-center font-sans text-sm text-[#1a3a5c]/70">{value}</p>
    </div>
  )

  if (href) return <a href={href}>{inner}</a>
  return inner
}
