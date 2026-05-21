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

export function SoundTap({ exercise, onComplete }: Props) {
  const t = useT(useLocale((s) => s.locale))
  const { playSound } = useAudio()
  const [listenCount, setListenCount] = useState(0)
  const [playing, setPlaying] = useState(false)
  const sound = exercise.sound!

  const handleListen = async () => {
    setPlaying(true)
    await playSound(sound.audioKey, sound.speechText)
    setListenCount((c) => c + 1)
    setTimeout(() => setPlaying(false), 1200)
  }

  const ready = listenCount >= 2

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="text-center max-w-sm">
        <h2 className="font-display text-2xl text-pearl">{exercise.prompt}</h2>
        {exercise.subPrompt && (
          <p className="mt-3 text-sm leading-relaxed text-mist">{exercise.subPrompt}</p>
        )}
      </div>

      <motion.div
        className="flex min-h-[5rem] items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {sound.image ? (
          <img
            src={`${import.meta.env.BASE_URL}images/${sound.image}`}
            alt={sound.transliteration}
            className="max-h-28 max-w-full object-contain drop-shadow-[0_0_30px_rgba(201,169,98,0.2)]"
          />
        ) : (
          <span className="font-display text-[5rem] leading-none text-gold-soft drop-shadow-[0_0_30px_rgba(201,169,98,0.25)]">
            {sound.devanagari}
          </span>
        )}
      </motion.div>

      <p className="font-display text-2xl tracking-wide text-pearl/80">{sound.transliteration}</p>

      {sound.meaning && (
        <p className="max-w-xs text-center text-sm italic text-mist/90">{sound.meaning}</p>
      )}

      <AudioOrb active={playing} onClick={handleListen} label="Hear again" />

      <motion.div
        className="w-full max-w-sm"
        initial={false}
        animate={{ opacity: ready ? 1 : 0.4 }}
      >
        <Button
          variant="gold"
          fullWidth
          size="lg"
          disabled={!ready}
          onClick={onComplete}
        >
          {ready
            ? t.exercise.haveListened
            : t.exercise.listenMore(2 - listenCount)}
        </Button>
      </motion.div>
    </div>
  )
}
