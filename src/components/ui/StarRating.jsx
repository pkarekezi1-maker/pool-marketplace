import { Star } from 'lucide-react'

export default function StarRating({ rating, count, size = 14, showCount = true }) {
  const filled = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const empty = 5 - filled - (hasHalf ? 1 : 0)

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex items-center gap-0.5">
        {Array.from({ length: filled }).map((_, i) => (
          <Star key={`f-${i}`} size={size} className="fill-[var(--gold)] text-[var(--gold)]" />
        ))}
        {hasHalf && (
          <span className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} className="text-[var(--gold)]/30 fill-[var(--gold)]/30" />
            <span className="absolute inset-0 overflow-hidden w-1/2">
              <Star size={size} className="fill-[var(--gold)] text-[var(--gold)]" />
            </span>
          </span>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`e-${i}`} size={size} className="text-[var(--gold)]/30 fill-transparent" />
        ))}
      </span>
      <span className="text-[var(--navy)] font-semibold text-sm">{rating.toFixed(2)}</span>
      {showCount && count && (
        <span className="text-[var(--text-muted)] text-xs">({count.toLocaleString()} reviews)</span>
      )}
    </span>
  )
}
