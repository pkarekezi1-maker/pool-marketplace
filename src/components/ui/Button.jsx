import { motion } from 'framer-motion'

const variants = {
  primary: {
    base: 'text-[var(--navy)] font-semibold tracking-wide shadow-lg',
    bg: 'bg-[var(--gold)] hover:brightness-110',
    border: '',
  },
  ghost: {
    base: 'text-[var(--gold)] font-semibold tracking-wide',
    bg: 'bg-transparent hover:bg-[var(--gold)]/10',
    border: 'border border-[var(--gold)]',
  },
  dark: {
    base: 'text-[var(--cream)] font-semibold tracking-wide',
    bg: 'bg-[var(--navy)] hover:bg-[var(--navy-mid)]',
    border: 'border border-[var(--gold)]/30',
  },
  outline: {
    base: 'text-[var(--navy)] font-semibold tracking-wide',
    bg: 'bg-transparent hover:bg-[var(--navy)]/5',
    border: 'border border-[var(--navy)]/30',
  },
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-md',
  md: 'px-6 py-3 text-sm rounded-lg',
  lg: 'px-8 py-4 text-base rounded-xl',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const v = variants[variant]
  const s = sizes[size]

  return (
    <motion.button
      type={type}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${v.base} ${v.bg} ${v.border} ${s} ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  )
}
