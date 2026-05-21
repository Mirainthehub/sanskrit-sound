import { useEffect, useMemo, useState } from 'react'
import type { AppView } from './types/lesson'
import { lessons } from './data/lessons'
import { useProgress } from './store/progress'
import { useLocale } from './store/locale'
import { defaultLessonId, localizeLesson, useT } from './i18n'
import { AmbientBackground } from './components/AmbientBackground'
import { LessonFlow } from './components/LessonFlow'
import { Home } from './pages/Home'
import { SacredPath } from './pages/SacredPath'
import { MantraChamber } from './pages/MantraChamber'
import { LessonComplete } from './pages/LessonComplete'

function App() {
  const [view, setView] = useState<AppView>('home')
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null)
  const { currentStreak, totalXp, completeLesson } = useProgress()
  const locale = useLocale((s) => s.locale)
  const t = useT(locale)

  const activeLesson = useMemo(() => {
    if (!activeLessonId) return null
    const raw = lessons[activeLessonId]
    return raw ? localizeLesson(raw, locale) : null
  }, [activeLessonId, locale])

  useEffect(() => {
    document.title = t.meta.title
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale, t.meta.title])

  const startLesson = (id: string) => {
    setActiveLessonId(id)
    setView('lesson')
  }

  const finishLesson = () => {
    if (activeLesson) completeLesson(activeLesson.id, activeLesson.xp)
    setView('complete')
  }

  return (
    <div className="relative min-h-dvh bg-night text-pearl">
      <AmbientBackground />

      {view === 'home' && (
        <Home
          streak={currentStreak}
          totalXp={totalXp}
          onBegin={() => startLesson(defaultLessonId(locale))}
          onPath={() => setView('path')}
          onChamber={() => setView('chamber')}
        />
      )}

      {view === 'path' && (
        <SacredPath
          onBack={() => setView('home')}
          onSelectLesson={startLesson}
        />
      )}

      {view === 'chamber' && (
        <MantraChamber onBack={() => setView('home')} />
      )}

      {view === 'lesson' && activeLesson && (
        <LessonFlow
          lesson={activeLesson}
          onExit={() => setView('path')}
          onComplete={finishLesson}
        />
      )}

      {view === 'complete' && activeLesson && (
        <LessonComplete
          lesson={activeLesson}
          onHome={() => {
            setActiveLessonId(null)
            setView('home')
          }}
          onPath={() => {
            setActiveLessonId(null)
            setView('path')
          }}
        />
      )}
    </div>
  )
}

export default App
