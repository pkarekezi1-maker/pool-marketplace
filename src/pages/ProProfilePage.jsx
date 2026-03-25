import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, Briefcase, Star, Calendar, ArrowLeft, CheckCircle } from 'lucide-react'
import { PROS } from '../data/pros'
import { getNextAvailableSlots } from '../data/timeslots'
import StarRating from '../components/ui/StarRating'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'

export default function ProProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pro = PROS.find(p => p.id === id)

  if (!pro) {
    navigate('/')
    return null
  }

  const nextSlots = getNextAvailableSlots(3)

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-20">
      {/* Hero strip */}
      <div className="bg-[var(--navy)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--navy-deep)] to-[var(--navy)]" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1200&q=60')] bg-cover" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Back link */}
          <Link to="/#pros" className="inline-flex items-center gap-2 text-[var(--cream)]/50 hover:text-[var(--cream)] text-sm mb-8 transition-colors">
            <ArrowLeft size={15} /> Back to Pros
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-[var(--gold)]/30 shadow-2xl">
                <img src={pro.avatar} alt={pro.name} className="w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-1"
            >
              <div className="flex flex-wrap items-start gap-3 mb-2">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--cream)]">{pro.name}</h1>
                {pro.badges.slice(0, 1).map(b => (
                  <Badge key={b} variant="gold">{b}</Badge>
                ))}
              </div>
              <p className="text-[var(--cream)]/60 text-lg mb-4">{pro.title}</p>

              <StarRating rating={pro.rating} count={pro.reviewCount} size={16} />

              <div className="flex flex-wrap gap-4 mt-5 text-sm text-[var(--cream)]/60">
                <span className="flex items-center gap-1.5"><MapPin size={14} /> {pro.location}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> Responds {pro.responseTime}</span>
                <span className="flex items-center gap-1.5"><Briefcase size={14} /> {pro.yearsExp} years experience</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="bg-white border-b border-[var(--navy)]/6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-[var(--navy)]/8">
            {[
              { label: 'Services Completed', value: pro.completedJobs.toLocaleString() },
              { label: 'Years Experience', value: `${pro.yearsExp}+` },
              { label: 'Verified Reviews', value: pro.reviewCount.toLocaleString() },
            ].map(({ label, value }) => (
              <div key={label} className="py-6 text-center">
                <p className="font-display text-3xl font-bold text-[var(--navy)]">{value}</p>
                <p className="text-[var(--text-muted)] text-xs mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--navy)] mb-4">About {pro.name.split(' ')[0]}</h2>
              <p className="text-[var(--text-muted)] leading-relaxed">{pro.bio}</p>
            </section>

            {/* Specialties */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--navy)] mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {pro.specialties.map(s => (
                  <Badge key={s} variant="cream" className="text-sm px-3 py-1.5">{s}</Badge>
                ))}
              </div>
            </section>

            {/* Credentials */}
            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--navy)] mb-4">Credentials & Badges</h2>
              <div className="flex flex-wrap gap-2">
                {pro.badges.map(b => (
                  <div key={b} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5">
                    <CheckCircle size={14} className="text-[var(--gold)]" />
                    <span className="text-[var(--navy)] text-sm font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold text-[var(--navy)]">
                  Client Reviews
                </h2>
                <StarRating rating={pro.rating} count={pro.reviewCount} size={14} />
              </div>
              <div className="space-y-4">
                {pro.reviews.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl border border-[var(--navy)]/8 p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-[var(--navy)] text-sm">{review.author}</p>
                        <p className="text-[var(--text-muted)] text-xs mt-0.5">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} size={13} className="fill-[var(--gold)] text-[var(--gold)]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{review.text}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar — sticky booking CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-[var(--navy)]/8 shadow-lg p-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-3xl font-bold text-[var(--navy)]">${pro.hourlyRate}</span>
                  <span className="text-[var(--text-muted)] text-sm">/hr</span>
                </div>
                <StarRating rating={pro.rating} count={pro.reviewCount} size={13} />

                <div className="mt-5 mb-4">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
                    <Calendar size={13} className="text-[var(--gold)]" /> Next Available
                  </p>
                  <div className="space-y-2">
                    {nextSlots.map((slot, i) => (
                      <div key={i} className="flex items-center justify-between bg-[var(--cream-warm)] rounded-lg px-3 py-2">
                        <span className="text-[var(--navy)] text-xs font-medium">
                          {slot.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        <span className="text-[var(--gold)] text-xs font-semibold">{slot.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to={`/book?pro=${pro.id}`}>
                  <Button variant="primary" size="lg" className="w-full justify-center">
                    Book {pro.name.split(' ')[0]}
                  </Button>
                </Link>

                <p className="text-center text-[var(--text-muted)] text-xs mt-3">
                  Free cancellation up to 24hrs before
                </p>
              </div>

              {/* Response time */}
              <div className="bg-[var(--cream-warm)] rounded-xl border border-[var(--navy)]/6 p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-[var(--navy)] text-sm font-semibold">Fast Responder</p>
                  <p className="text-[var(--text-muted)] text-xs">Typically replies {pro.responseTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
