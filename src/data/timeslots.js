const SLOT_TIMES = ['8:00 AM', '9:30 AM', '11:00 AM', '1:00 PM', '2:30 PM', '4:00 PM']

// Deterministic "random" based on date string so slots are stable per day
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getSlotsForDate(date) {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  return SLOT_TIMES.map((time, i) => ({
    time,
    available: seededRandom(seed + i) > 0.35,
  }))
}

export function generateSlots(daysAhead = 21) {
  const slots = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i <= daysAhead; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    const dayOfWeek = date.getDay()
    // Reduce availability on weekends
    const isSunday = dayOfWeek === 0
    if (isSunday) continue
    slots.push({
      date,
      slots: getSlotsForDate(date),
    })
  }
  return slots
}

export function getNextAvailableSlots(count = 3) {
  const all = generateSlots()
  const results = []
  for (const day of all) {
    const available = day.slots.filter(s => s.available)
    if (available.length > 0 && results.length < count) {
      results.push({ date: day.date, time: available[0].time })
    }
    if (results.length >= count) break
  }
  return results
}
