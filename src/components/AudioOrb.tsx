import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface AudioOrbProps {
  active?: boolean
  size?: 'sm' | 'lg'
  onClick?: () => void
  label?: string
}

export function AudioOrb({ active, size = 'lg', onClick, label = 'Listen' }: AudioOrbProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group relative flex flex-col items-center gap-3 focus:outline-none"
    >
      <div className="relative">
        {active && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/30"
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/20"
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </>
        )}
        <motion.div
          className={clsx(
            'relative flex items-center justify-center rounded-full',
            'bg-gradient-to-br from-night-card to-night-elevated',
            'border border-gold/20 shadow-[0_0_40px_rgba(201,169,98,0.15)]',
            'group-hover:border-gold/40 transition-colors',
            size === 'lg' ? 'h-28 w-28' : 'h-16 w-16',
          )}
          whileTap={{ scale: 0.96 }}
        >
          <svg
            className={clsx('text-gold', size === 'lg' ? 'h-8 w-8' : 'h-5 w-5')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </motion.div>
      </div>
      <span className="text-xs tracking-[0.2em] uppercase text-mist group-hover:text-gold-soft transition-colors">
        {label}
      </span>
    </button>
  )
}
