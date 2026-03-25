import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, CalendarCheck, Sparkles, ThumbsUp } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Browse Elite Pros',
    description: 'Explore profiles of our hand-vetted specialists — view certifications, specialties, ratings, and real reviews from homeowners like you.',
  },
  {
    number: '02',
    icon: CalendarCheck,
    title: 'Book in Minutes',
    description: 'Select your service, choose a time that works, and confirm with secure payment. No phone calls, no waiting.',
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'White-Glove Service',
    description: 'Your specialist arrives prepared and on time. Every visit is documented with a full service report sent to your inbox.',
  },
  {
    number: '04',
    icon: ThumbsUp,
    title: 'Relax & Enjoy',
    description: 'Dive in. Your pool is maintained to five-star standards, every time, with no effort on your part.',
  },
]

function Step({ step, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center"
    >
      {/* Number + Icon */}
      <div className="relative mb-6">
        {/* Outer ring */}
        <div className="w-20 h-20 rounded-full border-2 border-[var(--gold)]/20 flex items-center justify-center bg-white shadow-md">
          <step.icon size={28} className="text-[var(--gold)]" />
        </div>
        {/* Step number badge */}
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--gold)] flex items-center justify-center text-[var(--navy)] text-xs font-bold shadow">
          {step.number.replace('0', '')}
        </span>
      </div>

      <h3 className="font-display text-xl font-semibold text-[var(--navy)] mb-3">{step.title}</h3>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">{step.description}</p>
    </motion.div>
  )
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Process"
          title="Effortless from Start to Finish"
          subtitle="From discovery to your first service, the entire experience is designed around your time and expectations."
          className="mb-20"
        />

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-6">
            {STEPS.map((step, i) => (
              <Step key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
