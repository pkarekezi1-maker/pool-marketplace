import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const TESTIMONIALS = [
  {
    quote: "I've had pool services for 20 years. AquaValet is in a completely different league. Our specialist notices things I'd never think to check and the digital reports are meticulous.",
    author: 'Victoria Harrington',
    role: 'Estate Owner, Bel Air',
    avatar: 'https://i.pravatar.cc/100?img=9',
    rating: 5,
  },
  {
    quote: "We host clients at our Malibu property constantly. AquaValet ensures the pool is always immaculate. Elena actually knows our system better than the company that installed it.",
    author: 'Richard Pemberton',
    role: 'CEO & Vacation Property Owner',
    avatar: 'https://i.pravatar.cc/100?img=15',
    rating: 5,
  },
  {
    quote: "As an Airbnb Superhost with three properties, consistency is everything. AquaValet has given me that. Every pool, every week, five stars. I've never had a single guest complaint.",
    author: 'Camille Laurent',
    role: 'Luxury Rental Host, Miami',
    avatar: 'https://i.pravatar.cc/100?img=52',
    rating: 5,
  },
]

function TestimonialCard({ testimonial, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col bg-[var(--navy-mid)]/60 rounded-2xl border border-[var(--gold)]/10 p-8 backdrop-blur-sm"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-[var(--gold)] text-[var(--gold)]" />
        ))}
      </div>

      {/* Quote mark */}
      <div className="font-display text-6xl text-[var(--gold)]/20 leading-none mb-3 -mt-2 select-none">"</div>

      <p className="text-[var(--cream)]/80 text-base leading-relaxed flex-1 mb-8 -mt-6">
        {testimonial.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-6 border-t border-[var(--gold)]/10">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--gold)]/20"
        />
        <div>
          <p className="text-[var(--cream)] font-semibold text-sm">{testimonial.author}</p>
          <p className="text-[var(--cream)]/40 text-xs mt-0.5">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-[var(--navy)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Client Stories"
          title="What Our Clients Say"
          subtitle="From private estates to luxury rentals, here's why discerning owners trust AquaValet."
          light
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.author} testimonial={t} index={i} />
          ))}
        </div>

        {/* Bottom stat row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 mt-16 pt-12 border-t border-[var(--gold)]/10"
        >
          {[
            { value: '98%', label: 'Client retention rate' },
            { value: '12,400+', label: 'Services completed' },
            { value: '4.96', label: 'Average pro rating' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-bold text-[var(--gold)] mb-1">{value}</p>
              <p className="text-[var(--cream)]/40 text-sm">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
