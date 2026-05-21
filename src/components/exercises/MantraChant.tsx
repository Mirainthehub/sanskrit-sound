import { useState } from 'react'
import { motion } from 'framer-motion'
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

export function MantraChant({ exercise, onComplete }: Props) {
  const t = useT(useLocale((s) => s.locale))
  const { playSound, speak } = useAudio()
  const mantra = exercise.mantra!
  const [syllableIndex, setSyllableIndex] = useState(0)
  const [round, setRound] = useState(0)
  const [playing, setPlaying] = useState(false)

  const currentSyllable = mantra.syllables[syllableIndex]
  const finished = round >= 2

  const chant = async () => {
    setPlaying(true)
    await playSound(undefined, currentSyllable)
    setTimeout(() => setPlaying(false), 1000)
  }

  const advance = () => {
    if (syllableIndex < mantra.syllables.length - 1) {
      setSyllableIndex((i) => i + 1)
    } else {
      setSyllableIndex(0)
      setRound((r) => r + 1)
    }
  }

  const chantFull = () => {
    speak(mantra.transliteration, 0.65)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="font-display text-2xl text-pearl">{exercise.prompt}</h2>
        {exercise.subPrompt && (
          <p className="mt-2 text-sm text-mist">{exercise.subPrompt}</p>
        )}
      </div>

      <motion.div
        key={`${round}-${syllableIndex}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="font-display text-6xl text-gold-soft">{mantra.full}</p>
        <p className="mt-4 font-display text-3xl text-pearl">{currentSyllable}</p>
        <p className="mt-6 max-w-xs text-sm italic text-mist">{mantra.meaning}</p>
      </motion.div>

      <div className="flex gap-1">
        {mantra.syllables.map((_, i) => (
          <span
            key={i}
            className={`h-1 w-8 rounded-full transition-colors ${
              i === syllableIndex ? 'bg-gold' : 'bg-pearl/15'
            }`}
          />
        ))}
      </div>

      <p className="text-xs tracking-widest uppercase text-mist">
        Round {Math.min(round + 1, 3)} of 3
      </p>

      <AudioOrb active={playing} onClick={chant} label="Chant with me" />

      <div className="flex w-full max-w-sm flex-col gap-3">
        {!finished ? (
          <Button variant="soft" fullWidth onClick={advance}>
            {t.exercise.nextSyllable}
          </Button>
        ) : (
          <Button variant="gold" fullWidth size="lg" onClick={onComplete}>
            {t.exercise.completeMantra}
          </Button>
        )}
        <Button variant="ghost" fullWidth size="sm" onClick={chantFull}>
          {t.exercise.hearFullMantra}
        </Button>
      </div>
    </div>
  )
}
