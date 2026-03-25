import { createContext, useContext, useReducer, useCallback } from 'react'

const BookingContext = createContext(null)

const initialState = {
  step: 1,
  service: null,
  date: null,
  timeSlot: null,
  pro: null,
  confirmed: false,
  bookingRef: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'SELECT_SERVICE':
      return { ...state, service: action.payload, step: 2 }
    case 'SELECT_DATETIME':
      return { ...state, date: action.payload.date, timeSlot: action.payload.timeSlot, step: 3 }
    case 'SELECT_PRO':
      return { ...state, pro: action.payload, step: 4 }
    case 'CONFIRM':
      return {
        ...state,
        confirmed: true,
        bookingRef: 'AV-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      }
    case 'PREV_STEP':
      return { ...state, step: Math.max(1, state.step - 1) }
    case 'RESET':
      return { ...initialState }
    default:
      return state
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const selectService = useCallback((service) => dispatch({ type: 'SELECT_SERVICE', payload: service }), [])
  const selectDateTime = useCallback((date, timeSlot) => dispatch({ type: 'SELECT_DATETIME', payload: { date, timeSlot } }), [])
  const selectPro = useCallback((pro) => dispatch({ type: 'SELECT_PRO', payload: pro }), [])
  const confirm = useCallback(() => dispatch({ type: 'CONFIRM' }), [])
  const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), [])
  const setStep = useCallback((step) => dispatch({ type: 'SET_STEP', payload: step }), [])
  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  return (
    <BookingContext.Provider value={{ ...state, selectService, selectDateTime, selectPro, confirm, prevStep, setStep, reset }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
