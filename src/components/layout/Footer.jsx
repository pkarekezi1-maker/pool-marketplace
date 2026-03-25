import { Link } from 'react-router-dom'
import { Waves, Globe, Send, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[var(--navy-deep)] border-t border-[var(--gold)]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--gold)] flex items-center justify-center">
                <Waves size={16} className="text-[var(--navy)]" />
              </div>
              <span className="font-display text-xl font-semibold text-[var(--cream)]">
                Aqua<span className="text-[var(--gold)]">Valet</span>
              </span>
            </Link>
            <p className="text-[var(--cream)]/50 text-sm leading-relaxed max-w-xs">
              Connecting discerning pool owners with the finest certified specialists. Your pool, impeccably maintained.
            </p>
            <div className="flex gap-4 mt-6">
              {[Globe, Send, Share2].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[var(--cream)]/50 hover:text-[var(--gold)] hover:border-[var(--gold)]/50 transition-colors">
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[var(--cream)] text-sm font-semibold tracking-wide mb-4">Platform</h4>
            <ul className="space-y-3">
              {['For Pool Owners', 'For Professionals', 'Pricing', 'How It Works'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-[var(--cream)]/50 hover:text-[var(--gold)] text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--cream)] text-sm font-semibold tracking-wide mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service', 'Contact'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-[var(--cream)]/50 hover:text-[var(--gold)] text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--gold)]/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--cream)]/30 text-xs">
            © 2025 AquaValet, Inc. All rights reserved.
          </p>
          <p className="text-[var(--cream)]/30 text-xs">
            Luxury pool care, delivered.
          </p>
        </div>
      </div>
    </footer>
  )
}
