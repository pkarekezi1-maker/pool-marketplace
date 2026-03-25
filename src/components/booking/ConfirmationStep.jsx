import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Lock, CheckCircle, Calendar, Clock, User, Package, CreditCard, Shield } from 'lucide-react'
import { useBooking } from '../../hooks/useBooking'
import StarRating from '../ui/StarRating'
import Button from '../ui/Button'

export default function ConfirmationStep() {
  const { service, date, timeSlot, pro, confirmed, bookingRef, confirm, prevStep } = useBooking()
  const [loading, setLoading] = useState(false)

  const total = service ? service.price : 0
  const platformFee = Math.round(total * 0.05)
  const proEarns = total - Math.round(total * 0.15)

  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      confirm()
      setLoading(false)
    }, 1800)
  }

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-lg mx-auto py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-emerald-500" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy)] mb-3">
            You're All Set!
          </h2>
          <p className="text-[var(--text-muted)] mb-6">
            Your booking has been confirmed. {pro?.name} will arrive at your scheduled time.
          </p>

          <div className="bg-[var(--cream-warm)] rounded-2xl border border-[var(--navy)]/8 p-6 mb-6 text-left">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--navy)]/8">
              <span className="text-[var(--text-muted)] text-sm">Booking Reference</span>
              <span className="font-mono font-bold text-[var(--navy)] text-lg tracking-wider">{bookingRef}</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">Service</span>
                <span className="font-medium text-[var(--navy)]">{service?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">Specialist</span>
                <span className="font-medium text-[var(--navy)]">{pro?.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">Date & Time</span>
                <span className="font-medium text-[var(--navy)]">
                  {date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {timeSlot}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-muted)]">Total Charged</span>
                <span className="font-bold text-[var(--navy)]">${service?.price}</span>
              </div>
            </div>
          </div>

          <p className="text-[var(--text-muted)] text-sm mb-6">
            A confirmation email has been sent. You'll receive a reminder 24 hours before your appointment.
          </p>

          <Button variant="primary" size="lg" onClick={() => window.location.href = '/'} className="w-full justify-center">
            Return Home
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy)] mb-3">
          Review & Confirm
        </h2>
        <p className="text-[var(--text-muted)]">Everything looks right? Confirm to lock in your booking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Summary — left */}
        <div className="md:col-span-3 space-y-4">
          {/* Booking summary card */}
          <div className="bg-white rounded-2xl border border-[var(--navy)]/8 shadow-sm p-6">
            <h3 className="font-semibold text-[var(--navy)] mb-4 flex items-center gap-2">
              <Package size={16} className="text-[var(--gold)]" />
              Booking Summary
            </h3>
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                  <Package size={14} className="text-[var(--gold)]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--text-muted)]">Service</p>
                  <p className="font-semibold text-[var(--navy)] text-sm">{service?.name}</p>
                </div>
                <span className="font-bold text-[var(--navy)]">${service?.price}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                  <Calendar size={14} className="text-[var(--gold)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Date</p>
                  <p className="font-semibold text-[var(--navy)] text-sm">
                    {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="text-[var(--gold)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Time</p>
                  <p className="font-semibold text-[var(--navy)] text-sm">{timeSlot}</p>
                </div>
              </div>

              {pro && (
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--navy)]/6">
                  <img src={pro.avatar} alt={pro.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[var(--gold)]/20" />
                  <div className="flex-1">
                    <p className="font-semibold text-[var(--navy)] text-sm">{pro.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{pro.title}</p>
                  </div>
                  <StarRating rating={pro.rating} showCount={false} size={12} />
                </div>
              )}
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-white rounded-2xl border border-[var(--navy)]/8 shadow-sm p-6">
            <h3 className="font-semibold text-[var(--navy)] mb-4">Price Breakdown</h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">{service?.name}</span>
                <span className="text-[var(--navy)]">${service?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Service fee</span>
                <span className="text-[var(--navy)]">${platformFee}</span>
              </div>
              <div className="border-t border-[var(--navy)]/8 pt-2.5 flex justify-between font-bold">
                <span className="text-[var(--navy)]">Total</span>
                <span className="text-[var(--navy)] text-base">${total + platformFee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment — right */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-[var(--navy)]/8 shadow-sm p-6">
            <h3 className="font-semibold text-[var(--navy)] mb-4 flex items-center gap-2">
              <Lock size={15} className="text-[var(--gold)]" />
              Payment
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[var(--text-muted)] font-medium block mb-1.5">Card Number</label>
                <div className="relative">
                  <input
                    readOnly
                    value="•••• •••• •••• 4242"
                    className="w-full bg-[var(--cream-warm)] border border-[var(--navy)]/10 rounded-lg px-3 py-2.5 text-sm text-[var(--navy)] outline-none pr-10"
                  />
                  <CreditCard size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[var(--text-muted)] font-medium block mb-1.5">Expiry</label>
                  <input readOnly value="12 / 27" className="w-full bg-[var(--cream-warm)] border border-[var(--navy)]/10 rounded-lg px-3 py-2.5 text-sm text-[var(--navy)] outline-none" />
                </div>
                <div>
                  <label className="text-xs text-[var(--text-muted)] font-medium block mb-1.5">CVC</label>
                  <input readOnly value="•••" className="w-full bg-[var(--cream-warm)] border border-[var(--navy)]/10 rounded-lg px-3 py-2.5 text-sm text-[var(--navy)] outline-none" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-[var(--text-muted)]">
              <Shield size={12} />
              <span className="text-xs">Secured by Stripe · 256-bit encryption</span>
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            loading={loading}
            onClick={handleConfirm}
            className="w-full justify-center gap-2"
          >
            <Lock size={15} />
            Confirm & Pay ${total + platformFee}
          </Button>

          <p className="text-center text-[var(--text-muted)] text-xs">
            Free cancellation up to 24 hours before your appointment.
          </p>
        </div>
      </div>

      <div className="flex justify-start mt-8">
        <Button variant="outline" size="md" onClick={prevStep} className="gap-1">
          <ChevronLeft size={16} /> Back
        </Button>
      </div>
    </div>
  )
}
