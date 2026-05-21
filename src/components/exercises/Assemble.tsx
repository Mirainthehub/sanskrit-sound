import { useMemo, useState } from 'react'
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function Assemble({ exercise, onComplete }: Props) {
  const t = useT(useLocale((s) => s.locale))
  const { playSound, playSuccess, playSoftError } = useAudio()
  const bank = useMemo(
    () => shuffle(exercise.wordBank ?? []),
    [exercise.wordBank],
  )
  const [selected, setSelected] = useState<string[]>([])
  const [checked, setChecked] = useState(false)
  const sequence = exercise.sequence ?? []

  const toggle = (word: string) => {
    if (checked) return
    if (selected.includes(word)) {
      setSelected(selected.filter((w) => w !== word))
    } else {
      setSelected([...selected, word])
    }
  }

  const check = () => {
    setChecked(true)
    const ok =
      selected.length === sequence.length &&
      selected.every((w, i) => w === sequence[i])
    if (ok) playSuccess()
    else playSoftError()
  }

  const isCorrect =
    checked &&
    selected.length === sequence.length &&
    selected.every((w, i) => w === sequence[i])

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="font-display text-2xl text-pearl">{exercise.prompt}</h2>
        {exercise.subPrompt && (
          <p className="mt-2 text-sm text-mist">{exercise.subPrompt}</p>
        )}
      </div>

      <div className="min-h-[3rem] flex flex-wrap justify-center gap-2 rounded-2xl border border-dashed border-pearl/15 bg-night-card/40 p-4">
        <AnimatePresence mode="popLayout">
          {selected.length === 0 ? (
            <span className="text-sm text-mist/60">{t.exercise.tapSyllables}</span>
          ) : (
            selected.map((word, i) => (
              <motion.button
                key={`${word}-${i}`}
                layout
                type="button"
                onClick={() => toggle(word)}
                className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-2 font-display text-xl text-gold-soft"
              >
                {word}
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {bank.map((word) => {
          const used = selected.includes(word)
          return (
            <motion.button
              key={word}
              type="button"
              disabled={checked || used}
              onClick={() => {
                toggle(word)
                playSound(undefined, word)
              }}
              className={`rounded-xl border px-4 py-2 font-display text-xl transition-all ${
                used
                  ? 'border-transparent bg-transparent text-transparent'
                  : 'border-pearl/15 bg-night-card text-pearl hover:border-gold/30'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {word}
            </motion.button>
          )
        })}
      </div>

      {checked && !isCorrect && (
        <p className="text-center text-sm text-mist">
          {t.exercise.notQuite}
        </p>
      )}

      {!checked ? (
        <Button
          variant="gold"
          fullWidth
          size="lg"
          disabled={selected.length !== sequence.length}
          onClick={check}
        >
          {t.exercise.offerAnswer}
        </Button>
      ) : isCorrect ? (
        <Button variant="gold" fullWidth size="lg" onClick={onComplete}>
          {t.exercise.continue}
        </Button>
      ) : (
        <Button
          variant="soft"
          fullWidth
          onClick={() => {
            setSelected([])
            setChecked(false)
          }}
        >
          {t.exercise.tryAgain}
        </Button>
      )}
    </div>
  )
}
