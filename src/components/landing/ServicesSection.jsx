import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Droplets, Sparkles, Crown, Check, ArrowRight } from 'lucide-react'
import { SERVICES } from '../../data/services'
import SectionHeading from '../ui/SectionHeading'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

const ICONS = { Droplets, Sparkles, Crown }

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const navigate = useNavigate()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/book?service=${service.id}`)}
      className={`
        relative flex flex-col rounded-2xl overflow-hidden cursor-pointer group
        transition-all duration-300
        ${service.popular
          ? 'bg-[var(--navy)] border-2 border-[var(--gold)] shadow-xl shadow-[var(--gold)]/20'
          : 'bg-white border border-[var(--navy)]/8 shadow-sm hover:shadow-lg hover:border-[var(--gold)]/30'
        }
      `}
    >
      {service.popular && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      )}

      <div className="p-8 flex flex-col flex-1">
        {/* Icon + Popular badge */}
        <div className="flex items-start justify-between mb-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.popular ? 'bg-[var(--gold)]/20' : 'bg-[var(--navy)]/8'}`}>
            {(() => {
              const Icon = ICONS[service.icon]
              return <Icon size={22} className={service.popular ? 'text-[var(--gold)]' : 'text-[var(--navy)]'} />
            })()}
          </div>
          {service.popular && <Badge variant="gold">Most Popular</Badge>}
        </div>

        {/* Name + Price */}
        <div className="mb-2">
          <h3 className={`font-display text-xl font-semibold mb-1 ${service.popular ? 'text-[var(--cream)]' : 'text-[var(--navy)]'}`}>
            {service.name}
          </h3>
          <p className={`text-sm ${service.popular ? 'text-[var(--cream)]/60' : 'text-[var(--text-muted)]'}`}>
            {service.tagline}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 my-5">
          <span className={`text-4xl font-display font-bold ${service.popular ? 'text-[var(--gold)]' : 'text-[var(--navy)]'}`}>
            ${service.price}
          </span>
          <span className={`text-sm ${service.popular ? 'text-[var(--cream)]/50' : 'text-[var(--text-muted)]'}`}>
            / visit
          </span>
          <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${service.popular ? 'bg-[var(--gold)]/10 text-[var(--gold)]' : 'bg-[var(--navy)]/8 text-[var(--navy)]/60'}`}>
            {service.duration}
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-8">
          {service.features.map(f => (
            <li key={f} className="flex items-start gap-2.5">
              <Check size={15} className={`mt-0.5 flex-shrink-0 ${service.popular ? 'text-[var(--gold)]' : 'text-[var(--navy)]/50'}`} />
              <span className={`text-sm ${service.popular ? 'text-[var(--cream)]/75' : 'text-[var(--navy)]/70'}`}>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant={service.popular ? 'primary' : 'outline'}
          className="w-full justify-center gap-2 group-hover:gap-3 transition-all"
        >
          Select Package
          <ArrowRight size={16} />
        </Button>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[var(--cream-warm)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Curated Care Packages"
          subtitle="Every visit delivered with the precision and care your investment deserves. Choose the package that matches your lifestyle."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[var(--text-muted)] text-sm mt-10"
        >
          All packages include our satisfaction guarantee. Not happy? We'll return at no charge.
        </motion.p>
      </div>
    </section>
  )
}
