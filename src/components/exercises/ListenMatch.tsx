import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Exercise } from '../../types/lesson'
import { AudioOrb } from '../AudioOrb'
import { Button } from '../ui/Button'
import { useAudio } from '../../hooks/useAudio'
import { useT } from '../../i18n'
import { useLocale } from '../../store/locale'

interface Props {
  exercise: Exercise
  onComplete: () => void
}

export function ListenMatch({ exercise, onComplete }: Props) {
  const t = useT(useLocale((s) => s.locale))
  const { playSound, playSuccess, playSoftError } = useAudio()
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [playing, setPlaying] = useState(false)

  const handleListen = async () => {
    setPlaying(true)
    await playSound(exercise.sound?.audioKey, exercise.sound?.speechText)
    setTimeout(() => setPlaying(false), 1200)
  }

  const handleSelect = (index: number) => {
    if (revealed) return
    setSelected(index)
    setRevealed(true)
    if (index === exercise.correctIndex) playSuccess()
    else playSoftError()
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-medium text-pearl">{exercise.prompt}</h2>
        {exercise.subPrompt && (
          <p className="mt-2 text-sm text-mist">{exercise.subPrompt}</p>
        )}
      </div>

      <div className="flex justify-center py-4">
        <AudioOrb active={playing} onClick={handleListen} label={t.exercise.playSoundMatch} />
      </div>

      <div className="grid gap-3">
        {exercise.options?.map((opt, i) => {
          const isCorrect = i === exercise.correctIndex
          const isSelected = selected === i
          let style =
            'border-pearl/10 bg-night-card/80 text-pearl hover:border-gold/25'
          if (revealed && isSelected && isCorrect)
            style = 'border-success/50 bg-success/10 text-pearl'
          if (revealed && isSelected && !isCorrect)
            style = 'border-gold/20 bg-night-card text-mist'
          if (revealed && !isSelected && isCorrect)
            style = 'border-success/30 bg-success/5 text-pearl'

          return (
            <motion.button
              key={opt}
              type="button"
              disabled={revealed}
              onClick={() => handleSelect(i)}
              className={`rounded-2xl border px-5 py-4 text-left font-display text-xl transition-all ${style}`}
              whileTap={{ scale: 0.98 }}
            >
              {opt}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button variant="gold" fullWidth size="lg" onClick={onComplete}>
              {t.exercise.continue}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
