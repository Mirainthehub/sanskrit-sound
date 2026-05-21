import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson } from '../types/lesson'
import { ProgressBar } from './ProgressBar'
import { ListenMatch } from './exercises/ListenMatch'
import { SoundTap } from './exercises/SoundTap'
import { MeaningReflect } from './exercises/MeaningReflect'
import { MantraChant } from './exercises/MantraChant'
import { Assemble } from './exercises/Assemble'
import { Button } from './ui/Button'
import { useT } from '../i18n'
import { useLocale } from '../store/locale'

interface LessonFlowProps {
  lesson: Lesson
  onExit: () => void
  onComplete: () => void
}

function ExerciseRenderer({
  exercise,
  onStepComplete,
}: {
  exercise: Lesson['exercises'][0]
  onStepComplete: () => void
}) {
  switch (exercise.type) {
    case 'listen-match':
      return <ListenMatch exercise={exercise} onComplete={onStepComplete} />
    case 'sound-tap':
      return <SoundTap exercise={exercise} onComplete={onStepComplete} />
    case 'meaning-reflect':
      return <MeaningReflect exercise={exercise} onComplete={onStepComplete} />
    case 'mantra-chant':
      return <MantraChant exercise={exercise} onComplete={onStepComplete} />
    case 'assemble':
      return <Assemble exercise={exercise} onComplete={onStepComplete} />
    default:
      return null
  }
}

export function LessonFlow({ lesson, onExit, onComplete }: LessonFlowProps) {
  const locale = useLocale((s) => s.locale)
  const t = useT(locale)
  const [step, setStep] = useState(0)
  const exercise = lesson.exercises[step]
  const isLast = step >= lesson.exercises.length - 1

  const advance = () => {
    if (isLast) onComplete()
    else setStep((s) => s + 1)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pb-10 pt-6">
      <header className="mb-8 flex items-center gap-4">
        <button
          type="button"
          onClick={onExit}
          className="text-mist hover:text-pearl transition-colors p-1"
          aria-label={t.lesson.leaveAria}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="text-xs tracking-[0.15em] uppercase text-gold/80">{lesson.subtitle}</p>
          <h1 className="font-display text-lg text-pearl">{lesson.title}</h1>
        </div>
      </header>

      <ProgressBar current={step + 1} total={lesson.exercises.length} />

      <p className="mt-6 text-center text-xs italic text-mist/80">{lesson.intention}</p>

      <main className="mt-10 flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <ExerciseRenderer exercise={exercise} onStepComplete={advance} />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="mt-8 text-center">
        <Button variant="ghost" size="sm" onClick={onExit}>
          {t.lesson.pause}
        </Button>
      </footer>
    </div>
  )
}
