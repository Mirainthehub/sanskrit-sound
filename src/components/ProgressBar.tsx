import { motion } from 'framer-motion'

interface ProgressBarProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0
  return (
    <div className="flex items-center gap-3">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-pearl/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sacred/80 to-gold/90"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs text-mist tabular-nums">
        {current}/{total}
      </span>
    </div>
  )
}
