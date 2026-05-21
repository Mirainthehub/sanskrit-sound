import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Locale = 'zh' | 'en'

interface LocaleState {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

export const useLocale = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: 'zh',
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set({ locale: get().locale === 'zh' ? 'en' : 'zh' }),
    }),
    { name: 'svara-locale' },
  ),
)
