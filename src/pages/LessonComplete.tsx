import { motion } from 'framer-motion'
import type { Lesson } from '../types/lesson'
import { Button } from '../components/ui/Button'
import { useT } from '../i18n'
import { useLocale } from '../store/locale'

interface LessonCompleteProps {
  lesson: Lesson
  onHome: () => void
  onPath: () => void
}

export function LessonComplete({ lesson, onHome, onPath }: LessonCompleteProps) {
  const locale = useLocale((s) => s.locale)
  const t = useT(locale)

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-display text-6xl text-gold animate-breathe">ॐ</p>
        <h1 className="mt-8 font-display text-3xl text-pearl">{t.complete.title}</h1>
        <p className="mt-3 text-mist">{lesson.title}</p>
        <p className="mt-6 text-sm text-gold-soft">
          +{lesson.xp} {t.complete.xp}
        </p>
        <p className="mt-4 max-w-xs text-sm italic text-mist/80">{t.complete.message}</p>
      </motion.div>

      <div className="mt-14 flex w-full max-w-sm flex-col gap-3">
        <Button variant="gold" fullWidth size="lg" onClick={onPath}>
          {t.complete.continuePath}
        </Button>
        <Button variant="ghost" fullWidth onClick={onHome}>
          {t.complete.restHome}
        </Button>
      </div>
    </div>
  )
}
