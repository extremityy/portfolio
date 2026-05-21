import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProject } from "@/components/featured-project"
import { WhySection } from "@/components/why-section"
import { BrandIdentitySection } from "@/components/brand-identity-section"
import { SkillsToolsSection } from "@/components/skills-tools-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <FeaturedProject />
      <WhySection />
      <BrandIdentitySection />
      <SkillsToolsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
