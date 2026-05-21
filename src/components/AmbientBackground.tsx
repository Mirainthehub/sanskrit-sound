import { motion } from 'framer-motion'

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(107, 127, 212, 0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(201, 169, 98, 0.08), transparent 50%), radial-gradient(ellipse 50% 30% at 10% 80%, rgba(90, 154, 122, 0.06), transparent 45%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'rgba(201, 169, 98, 0.06)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
