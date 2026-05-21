import { clsx } from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'soft' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold/50',
        'disabled:cursor-not-allowed disabled:opacity-40',
        fullWidth && 'w-full',
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-sm',
        size === 'lg' && 'px-8 py-4 text-base',
        variant === 'primary' &&
          'bg-pearl/10 text-pearl hover:bg-pearl/15 border border-pearl/10',
        variant === 'ghost' && 'text-mist hover:text-pearl bg-transparent',
        variant === 'soft' &&
          'bg-night-card text-pearl border border-pearl/5 hover:border-gold/20',
        variant === 'gold' &&
          'bg-gradient-to-r from-gold/90 to-saffron/80 text-night font-semibold hover:shadow-[0_0_24px_var(--color-glow)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
