import { Check } from 'lucide-react'
import { useBooking } from '../../hooks/useBooking'

const STEPS = [
  { n: 1, label: 'Service' },
  { n: 2, label: 'Date & Time' },
  { n: 3, label: 'Choose Pro' },
  { n: 4, label: 'Confirm' },
]

export default function BookingProgress() {
  const { step } = useBooking()

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-[10%] right-[10%] h-px bg-[var(--navy)]/10" />
        {/* Progress fill */}
        <div
          className="absolute top-5 left-[10%] h-px bg-[var(--gold)] transition-all duration-500"
          style={{ width: `${((step - 1) / (STEPS.length - 1)) * 80}%` }}
        />

        {STEPS.map(s => {
          const done = step > s.n
          const active = step === s.n
          return (
            <div key={s.n} className="flex flex-col items-center gap-2 relative z-10">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                ${done
                  ? 'bg-[var(--gold)] text-[var(--navy)] shadow-md shadow-[var(--gold)]/30'
                  : active
                  ? 'bg-[var(--navy)] text-[var(--cream)] ring-2 ring-[var(--gold)] ring-offset-2'
                  : 'bg-white text-[var(--text-muted)] border border-[var(--navy)]/15'
                }
              `}>
                {done ? <Check size={16} strokeWidth={3} /> : s.n}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${
                active ? 'text-[var(--navy)]' : done ? 'text-[var(--gold-muted)]' : 'text-[var(--text-muted)]'
              }`}>
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
