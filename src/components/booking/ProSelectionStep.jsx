import { motion } from 'framer-motion'
import { ChevronLeft, Check, MapPin, Clock, Briefcase, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PROS } from '../../data/pros'
import { useBooking } from '../../hooks/useBooking'
import StarRating from '../ui/StarRating'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

export default function ProSelectionStep() {
  const { service, date, timeSlot, pro: selectedPro, selectPro, prevStep } = useBooking()

  const eligiblePros = PROS.filter(p => p.availableServices.includes(service?.id))

  const dateStr = date
    ? date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    : ''

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy)] mb-3">
          Choose Your Specialist
        </h2>
        <p className="text-[var(--text-muted)]">
          {dateStr && timeSlot && (
            <>Showing available pros for <span className="font-semibold text-[var(--navy)]">{dateStr} at {timeSlot}</span></>
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {eligiblePros.map((pro, i) => {
          const isSelected = selectedPro?.id === pro.id

          return (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => selectPro(pro)}
              className={`
                relative cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-200
                ${isSelected
                  ? 'border-[var(--gold)] shadow-xl shadow-[var(--gold)]/20'
                  : 'border-[var(--navy)]/10 hover:border-[var(--gold)]/40 shadow-sm hover:shadow-md'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-7 h-7 rounded-full bg-[var(--gold)] flex items-center justify-center shadow-md"
                  >
                    <Check size={14} strokeWidth={3} className="text-[var(--navy)]" />
                  </motion.div>
                </div>
              )}

              {/* Avatar */}
              <div className="h-40 bg-[var(--navy)] overflow-hidden relative">
                <img
                  src={pro.avatar}
                  alt={pro.name}
                  className="w-full h-full object-cover object-top opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/50 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                    <span className="text-[var(--gold)] text-xs font-bold">★ {pro.rating}</span>
                    <span className="text-white/60 text-xs">({pro.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-display font-semibold text-[var(--navy)]">{pro.name}</h3>
                    <p className="text-[var(--text-muted)] text-xs">{pro.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)] mt-2 mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} /> {pro.location.split(',')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {pro.responseTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={10} /> {pro.yearsExp}yr
                  </span>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {pro.specialties.slice(0, 2).map(s => (
                    <Badge key={s} variant="cream" className="text-[10px]">{s}</Badge>
                  ))}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {pro.badges.slice(0, 2).map(b => (
                    <Badge key={b} variant="gold-outline" className="text-[10px]">{b}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--navy)]/6">
                  <span className="text-[var(--navy)] font-semibold text-sm">
                    ${pro.hourlyRate}<span className="text-[var(--text-muted)] text-xs font-normal">/hr</span>
                  </span>
                  <Link
                    to={`/pros/${pro.id}`}
                    target="_blank"
                    onClick={e => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs text-[var(--gold)] hover:underline font-medium"
                  >
                    Profile <ExternalLink size={11} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-8 max-w-5xl mx-auto">
        <Button variant="outline" size="md" onClick={prevStep} className="gap-1">
          <ChevronLeft size={16} /> Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          disabled={!selectedPro}
          onClick={() => selectedPro && selectPro(selectedPro)}
        >
          Continue with {selectedPro?.name.split(' ')[0] || 'Selected Pro'}
        </Button>
      </div>
    </div>
  )
}
