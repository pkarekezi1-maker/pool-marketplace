import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Star, Clock } from 'lucide-react'
import Button from '../ui/Button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const stats = [
  { icon: Shield, label: 'Vetted Pros', value: '200+' },
  { icon: Star, label: 'Avg Rating', value: '4.96' },
  { icon: Clock, label: 'Response Time', value: '< 1hr' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--navy-deep)]">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1920&q=80')`,
        }}
      />

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)] via-[var(--navy)]/80 to-[var(--navy-deep)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy-deep)]/60 via-transparent to-[var(--navy-deep)]/60" />

      {/* Animated water ripple orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--gold)]/8 animate-ripple" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[var(--gold)]/12" style={{ animationDelay: '1.3s', animation: 'ripple 4s ease-in-out 1.3s infinite' }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-[var(--gold)]/16" style={{ animation: 'ripple 4s ease-in-out 2.6s infinite' }} />

      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        {/* Eyebrow */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-semibold tracking-[0.15em] uppercase bg-[var(--gold)]/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            Luxury Pool Care Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-[var(--cream)] mb-6 leading-[1.05]"
        >
          Your Pool Deserves{' '}
          <span className="block italic">
            <span className="gold-shimmer">Five Stars</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.35)}
          className="text-lg md:text-xl text-[var(--cream)]/65 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Connect with elite, certified pool specialists who treat your home like a five-star resort.
          White-glove service, on your schedule.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.5)} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/book">
            <Button size="lg" variant="primary" className="gap-3 min-w-[200px]">
              Book a Pro
              <ArrowRight size={18} />
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button size="lg" variant="ghost" className="min-w-[200px]">
              How It Works
            </Button>
          </a>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          {...fadeUp(0.65)}
          className="inline-flex flex-col sm:flex-row items-center gap-0 sm:gap-0 rounded-2xl overflow-hidden border border-[var(--gold)]/15 bg-[var(--navy)]/40 backdrop-blur-md"
        >
          {stats.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              className={`flex items-center gap-3 px-6 py-4 ${i < stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-[var(--gold)]/10' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-[var(--gold)]" />
              </div>
              <div className="text-left">
                <p className="text-[var(--cream)] font-bold text-lg leading-none">{value}</p>
                <p className="text-[var(--cream)]/40 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--cream)] to-transparent" />
    </section>
  )
}
