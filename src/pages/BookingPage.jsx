import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BookingProvider, useBooking } from '../hooks/useBooking'
import BookingProgress from '../components/booking/BookingProgress'
import ServiceStep from '../components/booking/ServiceStep'
import DateTimeStep from '../components/booking/DateTimeStep'
import ProSelectionStep from '../components/booking/ProSelectionStep'
import ConfirmationStep from '../components/booking/ConfirmationStep'
import { SERVICES } from '../data/services'

const stepVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
}

function BookingInner() {
  const [searchParams] = useSearchParams()
  const { step, selectService, setStep } = useBooking()

  // Handle ?service= query param pre-fill
  useEffect(() => {
    const serviceId = searchParams.get('service')
    if (serviceId) {
      const found = SERVICES.find(s => s.id === serviceId)
      if (found) selectService(found)
    }
  }, []) // eslint-disable-line

  return (
    <main className="min-h-screen bg-[var(--cream)] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--gold)] mb-3">
            Booking
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--navy)]">
            Reserve Your Service
          </h1>
        </div>

        {/* Progress */}
        {step < 5 && (
          <div className="mb-12">
            <BookingProgress />
          </div>
        )}

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && <ServiceStep />}
            {step === 2 && <DateTimeStep />}
            {step === 3 && <ProSelectionStep />}
            {step === 4 && <ConfirmationStep />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingInner />
    </BookingProvider>
  )
}
