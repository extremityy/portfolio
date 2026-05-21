import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProject } from "@/components/featured-project"
import { WhySection } from "@/components/why-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <FeaturedProject />
      <WhySection />
      <CTASection />
      <Footer />
    </main>
  )
}
