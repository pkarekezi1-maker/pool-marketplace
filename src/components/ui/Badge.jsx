const variants = {
  gold: 'bg-[var(--gold)] text-[var(--navy)]',
  'gold-outline': 'border border-[var(--gold)] text-[var(--gold)] bg-transparent',
  navy: 'bg-[var(--navy)] text-[var(--cream)]',
  cream: 'bg-[var(--cream-warm)] text-[var(--navy)]',
  success: 'bg-emerald-100 text-emerald-800',
  muted: 'bg-[var(--navy)]/10 text-[var(--navy)]/60',
}

export default function Badge({ variant = 'gold-outline', children, className = '', icon: Icon }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap ${variants[variant]} ${className}`}>
      {Icon && <Icon size={11} />}
      {children}
    </span>
  )
}
