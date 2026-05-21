import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { useT } from '../i18n'
import { useLocale } from '../store/locale'

interface HomeProps {
  onBegin: () => void
  onPath: () => void
  onChamber: () => void
  streak: number
  totalXp: number
}

export function Home({ onBegin, onPath, onChamber, streak, totalXp }: HomeProps) {
  const locale = useLocale((s) => s.locale)
  const t = useT(locale)

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-6 pb-12 pt-16">
      <div className="mb-6 flex justify-end">
        <LanguageSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-1 flex-col"
      >
        <p className="text-xs tracking-[0.35em] uppercase text-gold/70">{t.home.brand}</p>
        <h1 className="mt-4 font-display text-5xl font-medium leading-tight text-pearl">
          {t.home.titleLine1}
          <br />
          <span className="italic text-gold-soft">{t.home.titleLine2}</span>
        </h1>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">{t.home.tagline}</p>

        <div className="mt-10 flex gap-6 text-sm">
          <div>
            <p className="font-display text-2xl text-gold">{streak}</p>
            <p className="text-xs text-mist">{t.home.streakLabel}</p>
          </div>
          <div>
            <p className="font-display text-2xl text-pearl">{totalXp}</p>
            <p className="text-xs text-mist">{t.home.xpLabel}</p>
          </div>
        </div>

        <motion.div
          className="my-12 flex justify-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          <span className="font-display text-7xl text-gold/90 drop-shadow-[0_0_40px_rgba(201,169,98,0.2)]">
            ॐ
          </span>
        </motion.div>

        <p className="mt-8 text-center text-[10px] leading-relaxed tracking-wide text-mist/50">
          {t.home.attribution}{' '}
          <a
            href="https://sanskrit.yuapp.top"
            target="_blank"
            rel="noreferrer"
            className="text-gold/60 hover:text-gold"
          >
            {t.home.attributionLink}
          </a>
          <span className="mx-1">·</span>
          <a
            href="https://github.com/Mirainthehub/sanskrit-sound"
            target="_blank"
            rel="noreferrer"
            className="text-gold/60 hover:text-gold"
          >
            {locale === 'zh' ? '开源 · Star' : 'Open source'}
          </a>
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Button variant="gold" size="lg" fullWidth onClick={onBegin}>
            {t.home.todayPractice}
          </Button>
          <Button variant="soft" size="md" fullWidth onClick={onPath}>
            {t.home.walkPath}
          </Button>
          <Button variant="ghost" size="md" fullWidth onClick={onChamber}>
            {t.home.mantraChamber}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
