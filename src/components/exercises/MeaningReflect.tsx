import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Exercise } from '../../types/lesson'
import { Button } from '../ui/Button'
import { useAudio } from '../../hooks/useAudio'
import { useT } from '../../i18n'
import { useLocale } from '../../store/locale'

interface Props {
  exercise: Exercise
  onComplete: () => void
}

export function MeaningReflect({ exercise, onComplete }: Props) {
  const t = useT(useLocale((s) => s.locale))
  const { playSuccess, playGentle } = useAudio()
  const [selected, setSelected] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    setSelected(index)
    if (index === exercise.correctIndex) playSuccess()
    else playGentle()
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="font-display text-2xl text-pearl">{exercise.prompt}</h2>
        {exercise.subPrompt && (
          <p className="mt-2 text-sm text-mist">{exercise.subPrompt}</p>
        )}
      </div>

      <div className="grid gap-3">
        {exercise.options?.map((opt, i) => (
          <motion.button
            key={opt}
            type="button"
            onClick={() => handleSelect(i)}
            className={`rounded-2xl border px-5 py-4 text-left text-sm leading-relaxed transition-all ${
              selected === i
                ? 'border-gold/40 bg-gold/5 text-pearl'
                : 'border-pearl/10 bg-night-card/60 text-mist hover:border-pearl/20 hover:text-pearl'
            }`}
            whileTap={{ scale: 0.99 }}
          >
            {opt}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-mist"
          >
            {selected === exercise.correctIndex
              ? t.exercise.wisdomOk
              : t.exercise.wisdomSoft}
          </motion.p>
        )}
      </AnimatePresence>

      {selected !== null && (
        <Button variant="gold" fullWidth size="lg" onClick={onComplete}>
          {t.exercise.continue}
        </Button>
      )}
    </div>
  )
}
