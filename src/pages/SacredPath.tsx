import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { pathUnits, lessons } from '../data/lessons'
import { useProgress } from '../store/progress'
import { useLocale } from '../store/locale'
import { localizeLesson, localizePathUnits } from '../i18n'
import { LanguageSwitcher } from '../components/LanguageSwitcher'

interface SacredPathProps {
  onBack: () => void
  onSelectLesson: (lessonId: string) => void
}

export function SacredPath({ onBack, onSelectLesson }: SacredPathProps) {
  const { isLessonUnlocked, isLessonCompleted } = useProgress()
  const locale = useLocale((s) => s.locale)
  const units = useMemo(() => localizePathUnits(pathUnits, locale), [locale])

  return (
    <div className="mx-auto min-h-dvh max-w-lg px-5 pb-12 pt-8">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-mist hover:text-pearl"
        >
          {locale === 'zh' ? '← 返回' : '← Return'}
        </button>
        <LanguageSwitcher />
      </div>

      <h1 className="font-display text-3xl text-pearl">
        {locale === 'zh' ? '修行之路' : 'The Path'}
      </h1>
      <p className="mt-2 text-sm text-mist">
        {locale === 'zh' ? '一步开启下一步——不必匆忙' : 'Each step opens the next — no hurry'}
      </p>

      <div className="relative mt-12">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-sacred/20 to-transparent" />

        {units.map((unit, ui) => (
          <motion.section
            key={unit.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ui * 0.15 }}
            className="relative mb-14 pl-14"
          >
            <div className="absolute left-3 flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-night-elevated font-display text-sm text-gold">
              {unit.symbol}
            </div>

            <h2 className="font-display text-xl text-pearl">{unit.title}</h2>
            <p className="mt-1 text-xs text-mist">{unit.description}</p>

            <ul className="mt-6 space-y-3">
              {unit.lessons.map((meta) => {
                const pathIds = unit.lessons.map((l) => l.id)
                const unlocked = isLessonUnlocked(meta.id, pathIds)
                const done = isLessonCompleted(meta.id)
                const raw = lessons[meta.id]
                const lesson = raw ? localizeLesson(raw, locale) : null
                const suffix = locale === 'zh' ? '分钟' : 'm'

                return (
                  <li key={meta.id}>
                    <button
                      type="button"
                      disabled={!unlocked}
                      onClick={() => unlocked && onSelectLesson(meta.id)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                        !unlocked
                          ? 'cursor-not-allowed border-pearl/5 bg-night-card/30 opacity-40'
                          : done
                            ? 'border-success/25 bg-success/5'
                            : 'border-pearl/10 bg-night-card hover:border-gold/25'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-pearl">{lesson?.title ?? meta.title}</p>
                          <p className="text-xs text-mist">{lesson?.subtitle ?? meta.subtitle}</p>
                        </div>
                        <span className="text-xs text-mist">
                          {done ? '✓' : unlocked ? `${lesson?.durationMinutes}${suffix}` : '🔒'}
                        </span>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.section>
        ))}
      </div>
    </div>
  )
}
