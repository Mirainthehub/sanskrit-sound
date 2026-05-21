import { useLocale } from '../store/locale'

export function LanguageSwitcher() {
  const { locale, toggleLocale } = useLocale()

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="rounded-full border border-pearl/15 bg-night-card/60 px-3 py-1.5 text-xs tracking-wide text-mist transition-colors hover:border-gold/30 hover:text-gold-soft"
      aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
    >
      {locale === 'zh' ? 'EN' : '中文'}
    </button>
  )
}
