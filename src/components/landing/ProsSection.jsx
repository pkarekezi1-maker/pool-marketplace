import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Briefcase } from 'lucide-react'
import { PROS } from '../../data/pros'
import SectionHeading from '../ui/SectionHeading'
import StarRating from '../ui/StarRating'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

function ProCard({ pro, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl border border-[var(--navy)]/8 shadow-sm hover:shadow-xl hover:shadow-[var(--navy)]/8 hover:border-[var(--gold)]/30 transition-all duration-300 overflow-hidden group"
    >
      {/* Avatar */}
      <div className="relative h-52 bg-gradient-to-br from-[var(--navy)] to-[var(--navy-mid)] overflow-hidden">
        <img
          src={pro.avatar}
          alt={pro.name}
          className="w-full h-full object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/60 to-transparent" />
        {/* Rating badge over image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-[var(--gold)] text-xs font-bold">★ {pro.rating}</span>
          <span className="text-white/70 text-xs">({pro.reviewCount})</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-display text-lg font-semibold text-[var(--navy)]">{pro.name}</h3>
        </div>
        <p className="text-[var(--text-muted)] text-sm mb-1">{pro.title}</p>

        <div className="flex items-center gap-1 text-[var(--text-muted)] text-xs mb-4">
          <MapPin size={11} />
          <span>{pro.location}</span>
          <span className="mx-1 text-[var(--navy)]/20">·</span>
          <Briefcase size={11} />
          <span>{pro.yearsExp} yrs exp</span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pro.specialties.slice(0, 2).map(s => (
            <Badge key={s} variant="cream">{s}</Badge>
          ))}
          {pro.specialties.length > 2 && (
            <Badge variant="muted">+{pro.specialties.length - 2}</Badge>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {pro.badges.slice(0, 2).map(b => (
            <Badge key={b} variant="gold-outline">{b}</Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--navy)]/6">
          <span className="text-[var(--navy)] font-semibold">
            from <span className="text-lg font-display">${pro.hourlyRate}</span>
            <span className="text-[var(--text-muted)] text-xs font-normal">/hr</span>
          </span>
          <Link to={`/pros/${pro.id}`}>
            <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
              View Profile <ArrowRight size={13} />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProsSection() {
  return (
    <section id="pros" className="py-24 md:py-32 bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <SectionHeading
            eyebrow="Our Specialists"
            title="Meet Your Pool Professionals"
            subtitle="Each pro is independently vetted, certified, and background-checked before joining AquaValet."
            center={false}
            className="md:max-w-xl"
          />
          <Link to="/book" className="flex-shrink-0">
            <Button variant="outline" size="md" className="gap-2">
              View All Pros <ArrowRight size={15} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROS.slice(0, 6).map((pro, i) => (
            <ProCard key={pro.id} pro={pro} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
