import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Waves } from 'lucide-react'
import Button from '../ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isLight = location.pathname === '/' && !scrolled

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !isLight
            ? 'bg-[var(--navy)]/95 backdrop-blur-md border-b border-[var(--gold)]/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center shadow-md group-hover:shadow-[var(--gold)]/40 transition-shadow">
                <Waves size={16} className="text-[var(--navy)]" />
              </div>
              <span className="font-display text-xl font-semibold text-[var(--cream)] tracking-wide">
                Aqua<span className="text-[var(--gold)]">Valet</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: 'Services', href: '/#services' },
                { label: 'Our Pros', href: '/#pros' },
                { label: 'How It Works', href: '/#how-it-works' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="text-[var(--cream)]/80 hover:text-[var(--gold)] text-sm font-medium transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/book" className="text-[var(--cream)]/70 hover:text-[var(--cream)] text-sm font-medium transition-colors">
                Sign In
              </Link>
              <Button size="sm" variant="primary" onClick={() => {}}>
                Book a Pro
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 text-[var(--cream)] hover:text-[var(--gold)] transition-colors"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-[var(--navy-deep)] pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {[
                { label: 'Services', href: '/#services' },
                { label: 'Our Pros', href: '/#pros' },
                { label: 'How It Works', href: '/#how-it-works' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  to={href}
                  className="text-[var(--cream)] text-2xl font-display hover:text-[var(--gold)] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="border-t border-[var(--gold)]/20 pt-6 mt-2">
                <Link to="/book" onClick={() => setMobileOpen(false)}>
                  <Button size="lg" variant="primary" className="w-full justify-center">
                    Book a Pro
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
