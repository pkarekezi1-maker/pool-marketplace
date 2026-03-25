import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionHeading({ eyebrow, title, subtitle, center = true, light = false, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${center ? 'text-center' : 'text-left'} ${className}`}
    >
      {eyebrow && (
        <p className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${light ? 'text-[var(--gold-light)]' : 'text-[var(--gold)]'}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display mb-4 ${light ? 'text-[var(--cream)]' : 'text-[var(--navy)]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''} ${light ? 'text-[var(--cream)]/70' : 'text-[var(--text-muted)]'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
