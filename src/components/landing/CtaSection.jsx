import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Award } from 'lucide-react'
import Button from '../ui/Button'

export default function CtaSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--cream-warm)] relative overflow-hidden">
      {/* Decorative gold orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--gold)]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20"
        >
          <Award size={15} className="text-[var(--gold)]" />
          <span className="text-[var(--gold)] text-sm font-semibold">Satisfaction Guaranteed</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-bold text-[var(--navy)] mb-6"
        >
          Your Pool Is Waiting
          <span className="block text-[var(--gold)]">for Its Best Version</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto mb-10"
        >
          Join hundreds of homeowners who have elevated their pool experience.
          Your first booking is protected by our satisfaction guarantee — no questions asked.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/book">
            <Button size="lg" variant="primary" className="gap-3 min-w-[220px]">
              Book Your First Service
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/book?join=pro">
            <Button size="lg" variant="outline" className="min-w-[200px]">
              Join as a Pro
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-[var(--text-muted)] text-xs mt-6"
        >
          No subscription required · Cancel any time · Secure payments via Stripe
        </motion.p>
      </div>
    </section>
  )
}
