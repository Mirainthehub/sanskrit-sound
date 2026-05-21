import { useState } from 'react'
import { motion } from 'framer-motion'
import { AudioOrb } from '../components/AudioOrb'
import { useAudio } from '../hooks/useAudio'
import { Button } from '../components/ui/Button'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { useT } from '../i18n'
import { useLocale } from '../store/locale'

const mantraData = [
  { devanagari: 'ॐ', transliteration: 'oṃ', speech: 'Om' },
  { devanagari: 'सो ऽहम्', transliteration: 'so haṃ', speech: 'so hum' },
  { devanagari: 'गं गणपतये नमः', transliteration: 'gaṃ gaṇapataye namaḥ', speech: 'gam ganapataye namaha' },
]

interface MantraChamberProps {
  onBack: () => void
}

export function MantraChamber({ onBack }: MantraChamberProps) {
  const locale = useLocale((s) => s.locale)
  const t = useT(locale)
  const { speak } = useAudio()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const mantra = mantraData[index]
  const meaning = t.chamber.mantras[index].meaning

  const listen = () => {
    setPlaying(true)
    speak(mantra.speech, 0.6)
    setTimeout(() => setPlaying(false), 2000)
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center px-6 pb-12 pt-12">
      <div className="mb-8 flex w-full items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-mist hover:text-pearl"
        >
          {t.chamber.back}
        </button>
        <LanguageSwitcher />
      </div>

      <p className="text-xs tracking-[0.3em] uppercase text-gold/60">{t.chamber.label}</p>
      <h1 className="mt-2 font-display text-2xl text-pearl">{t.chamber.title}</h1>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="my-16 flex flex-col items-center text-center"
      >
        <p className="font-display text-6xl text-gold-soft">{mantra.devanagari}</p>
        <p className="mt-6 font-display text-2xl text-pearl">{mantra.transliteration}</p>
        <p className="mt-4 text-sm italic text-mist">{meaning}</p>
      </motion.div>

      <AudioOrb active={playing} onClick={listen} label={t.chamber.receive} />

      <div className="mt-16 flex w-full gap-3">
        <Button
          variant="soft"
          fullWidth
          onClick={() => setIndex((i) => (i - 1 + mantraData.length) % mantraData.length)}
        >
          {t.chamber.previous}
        </Button>
        <Button
          variant="soft"
          fullWidth
          onClick={() => setIndex((i) => (i + 1) % mantraData.length)}
        >
          {t.chamber.next}
        </Button>
      </div>
    </div>
  )
}
