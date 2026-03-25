import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { generateSlots } from '../../data/timeslots'
import { useBooking } from '../../hooks/useBooking'
import Button from '../ui/Button'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function isSameDay(a, b) {
  return a && b && a.toDateString() === b.toDateString()
}

function isToday(d) {
  return isSameDay(d, new Date())
}

export default function DateTimeStep() {
  const { service, date: selectedDate, timeSlot: selectedTime, selectDateTime, prevStep } = useBooking()

  const allSlots = useMemo(() => generateSlots(28), [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [localDate, setLocalDate] = useState(selectedDate)
  const [localTime, setLocalTime] = useState(selectedTime)

  // Build 42-cell calendar grid
  const calendarCells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const cells = []

    // Previous month padding
    const prevDays = new Date(viewYear, viewMonth, 0).getDate()
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ date: new Date(viewYear, viewMonth - 1, prevDays - i), currentMonth: false })
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(viewYear, viewMonth, d), currentMonth: true })
    }
    // Next month padding
    const remaining = 42 - cells.length
    for (let d = 1; d <= remaining; d++) {
      cells.push({ date: new Date(viewYear, viewMonth + 1, d), currentMonth: false })
    }
    return cells
  }, [viewMonth, viewYear])

  const slotMap = useMemo(() => {
    const map = {}
    allSlots.forEach(s => {
      map[s.date.toDateString()] = s.slots
    })
    return map
  }, [allSlots])

  const timeSlotsForDate = localDate ? (slotMap[localDate.toDateString()] || []) : []

  const isPast = (date) => date < today
  const hasSlots = (date) => !!(slotMap[date.toDateString()])

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const canPrev = viewMonth > today.getMonth() || viewYear > today.getFullYear()

  const handleConfirm = () => {
    if (localDate && localTime) selectDateTime(localDate, localTime)
  }

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-[var(--navy)] mb-3">
          Choose Your Date & Time
        </h2>
        <p className="text-[var(--text-muted)]">
          Scheduling for <span className="font-semibold text-[var(--navy)]">{service?.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-[var(--navy)]/8 shadow-sm p-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={prevMonth}
              disabled={!canPrev}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--cream-warm)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} className="text-[var(--navy)]" />
            </button>
            <span className="font-display font-semibold text-[var(--navy)]">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--cream-warm)] transition-colors"
            >
              <ChevronRight size={16} className="text-[var(--navy)]" />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-[var(--text-muted)] py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div className="grid grid-cols-7 gap-0.5">
            {calendarCells.map((cell, i) => {
              const past = isPast(cell.date)
              const available = !past && hasSlots(cell.date) && cell.currentMonth
              const selected = isSameDay(cell.date, localDate)
              const today_ = isToday(cell.date)

              return (
                <button
                  key={i}
                  onClick={() => { if (available) { setLocalDate(cell.date); setLocalTime(null) } }}
                  disabled={!available}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-150
                    ${!cell.currentMonth ? 'opacity-20 cursor-default' : ''}
                    ${past && cell.currentMonth ? 'text-[var(--text-muted)]/40 cursor-not-allowed' : ''}
                    ${available && !selected ? 'hover:bg-[var(--gold)]/10 cursor-pointer text-[var(--navy)] font-medium' : ''}
                    ${selected ? 'bg-[var(--gold)] text-[var(--navy)] font-bold shadow-md shadow-[var(--gold)]/30' : ''}
                    ${today_ && !selected ? 'ring-1 ring-[var(--gold)]/40 font-semibold' : ''}
                    ${!available && cell.currentMonth && !past ? 'text-[var(--text-muted)]/50 cursor-not-allowed line-through text-xs' : ''}
                  `}
                >
                  {cell.date.getDate()}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--navy)]/6 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[var(--gold)]" />
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-white ring-1 ring-[var(--gold)]/40" />
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div className="bg-white rounded-2xl border border-[var(--navy)]/8 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock size={16} className="text-[var(--gold)]" />
            <span className="font-semibold text-[var(--navy)] text-sm">
              {localDate
                ? `Available Times — ${localDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`
                : 'Select a date to see available times'
              }
            </span>
          </div>

          {!localDate ? (
            <div className="flex flex-col items-center justify-center h-48 text-[var(--text-muted)] text-sm">
              <div className="w-16 h-16 rounded-full bg-[var(--cream-warm)] flex items-center justify-center mb-3">
                <Clock size={24} className="text-[var(--gold)]/50" />
              </div>
              Pick a date on the left to see available time slots
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {timeSlotsForDate.map(({ time, available }) => (
                <motion.button
                  key={time}
                  whileHover={available ? { scale: 1.02 } : {}}
                  whileTap={available ? { scale: 0.98 } : {}}
                  onClick={() => available && setLocalTime(time)}
                  disabled={!available}
                  className={`
                    py-3 px-4 rounded-xl text-sm font-medium transition-all duration-150
                    ${localTime === time
                      ? 'bg-[var(--navy)] text-[var(--cream)] shadow-md ring-2 ring-[var(--gold)] ring-offset-1'
                      : available
                      ? 'bg-[var(--cream-warm)] text-[var(--navy)] hover:bg-[var(--gold)]/15 hover:text-[var(--navy)] border border-transparent hover:border-[var(--gold)]/30'
                      : 'bg-[var(--cream-warm)]/40 text-[var(--text-muted)]/40 cursor-not-allowed line-through'
                    }
                  `}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          )}

          {localDate && localTime && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-xl bg-[var(--gold)]/8 border border-[var(--gold)]/20"
            >
              <p className="text-[var(--navy)] text-sm font-medium">
                ✓ {localDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {localTime}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 max-w-4xl mx-auto">
        <Button variant="outline" size="md" onClick={prevStep} className="gap-1">
          <ChevronLeft size={16} /> Back
        </Button>
        <Button
          variant="primary"
          size="lg"
          disabled={!localDate || !localTime}
          onClick={handleConfirm}
        >
          Continue to Pro Selection
        </Button>
      </div>
    </div>
  )
}
