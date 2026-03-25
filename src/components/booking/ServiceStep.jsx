import { motion } from 'framer-motion'
import { Check, Droplets, Sparkles, Crown } from 'lucide-react'
import { SERVICES } from '../../data/services'
import { useBooking } from '../../hooks/useBooking'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

const ICONS = { Droplets, Sparkles, Crown }

export default function ServiceStep() {
  const { service: selected, selectService } = useBooking()

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy)] mb-3">
          Select Your Service
        </h2>
        <p className="text-[var(--text-muted)] max-w-md mx-auto">
          Each package is delivered by a certified specialist and backed by our satisfaction guarantee.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[service.icon]
          const isSelected = selected?.id === service.id

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              onClick={() => selectService(service)}
              className={`
                relative cursor-pointer rounded-2xl border-2 p-7 transition-all duration-200
                ${isSelected
                  ? 'border-[var(--gold)] bg-[var(--navy)] shadow-xl shadow-[var(--gold)]/20'
                  : service.popular
                  ? 'border-[var(--gold)]/30 bg-white shadow-md'
                  : 'border-[var(--navy)]/10 bg-white hover:border-[var(--gold)]/30 shadow-sm'
                }
              `}
            >
              {service.popular && !isSelected && (
                <Badge variant="gold" className="absolute top-4 right-4">Popular</Badge>
              )}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[var(--gold)] flex items-center justify-center"
                >
                  <Check size={13} strokeWidth={3} className="text-[var(--navy)]" />
                </motion.div>
              )}

              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                isSelected ? 'bg-[var(--gold)]/20' : 'bg-[var(--navy)]/8'
              }`}>
                <Icon size={22} className={isSelected ? 'text-[var(--gold)]' : 'text-[var(--navy)]'} />
              </div>

              <h3 className={`font-display text-xl font-semibold mb-1 ${isSelected ? 'text-[var(--cream)]' : 'text-[var(--navy)]'}`}>
                {service.name}
              </h3>
              <p className={`text-sm mb-4 ${isSelected ? 'text-[var(--cream)]/60' : 'text-[var(--text-muted)]'}`}>
                {service.tagline}
              </p>

              <div className="flex items-baseline gap-1 mb-5">
                <span className={`text-3xl font-display font-bold ${isSelected ? 'text-[var(--gold)]' : 'text-[var(--navy)]'}`}>
                  ${service.price}
                </span>
                <span className={`text-xs ${isSelected ? 'text-[var(--cream)]/50' : 'text-[var(--text-muted)]'}`}>
                  / visit · {service.duration}
                </span>
              </div>

              <ul className="space-y-2">
                {service.features.map(f => (
                  <li key={f} className={`flex items-start gap-2 text-xs ${isSelected ? 'text-[var(--cream)]/70' : 'text-[var(--navy)]/60'}`}>
                    <Check size={12} className={`mt-0.5 flex-shrink-0 ${isSelected ? 'text-[var(--gold)]' : 'text-[var(--gold)]'}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          )
        })}
      </div>

      <div className="flex justify-end mt-8">
        <Button
          variant="primary"
          size="lg"
          disabled={!selected}
          onClick={() => selected && selectService(selected)}
          className="gap-2"
        >
          Continue with {selected?.name || 'a Package'}
        </Button>
      </div>
    </div>
  )
}
