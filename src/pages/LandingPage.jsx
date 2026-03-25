import HeroSection from '../components/landing/HeroSection'
import ServicesSection from '../components/landing/ServicesSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import ProsSection from '../components/landing/ProsSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import CtaSection from '../components/landing/CtaSection'

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <ProsSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
  )
}
