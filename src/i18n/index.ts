import type { Lesson, PathUnit } from '../types/lesson'
import type { Locale } from '../store/locale'
import { en } from './locales/en'
import { zh } from './locales/zh'

const dicts = { zh, en } as const

export function useT(locale: Locale) {
  return dicts[locale]
}

export function localizePathUnits(units: PathUnit[], locale: Locale): PathUnit[] {
  if (locale === 'en') return units
  const t = zh
  return units.map((unit) => {
    if (unit.id === 'awakening' || unit.id === 'elements') {
      const u = t.units[unit.id]
      return {
        ...unit,
        title: u.title,
        description: u.description,
        lessons: unit.lessons.map((l) => {
          const core = t.coreLessons[l.id]
          if (!core) return l
          return {
            ...l,
            title: core.title ?? l.title,
            subtitle: core.subtitle ?? l.subtitle,
          }
        }),
      }
    }
    return unit
  })
}

export function localizeLesson(lesson: Lesson, locale: Locale): Lesson {
  if (locale === 'en' || lesson.id.startsWith('yuapp')) return lesson

  const patch = zh.coreLessons[lesson.id]
  if (!patch) return lesson

  return {
    ...lesson,
    title: patch.title ?? lesson.title,
    subtitle: patch.subtitle ?? lesson.subtitle,
    intention: patch.intention ?? lesson.intention,
    exercises: lesson.exercises.map((ex) => {
      const exPatch = patch.exercises?.[ex.id]
      if (!exPatch) return ex
      const next = { ...ex }
      if (exPatch.prompt) next.prompt = exPatch.prompt
      if ('subPrompt' in exPatch && exPatch.subPrompt) next.subPrompt = exPatch.subPrompt
      if (exPatch.options) next.options = [...exPatch.options]
      if (ex.sound && exPatch.meaning) {
        next.sound = { ...ex.sound, meaning: exPatch.meaning }
      }
      if (ex.mantra && exPatch.mantraMeaning) {
        next.mantra = { ...ex.mantra, meaning: exPatch.mantraMeaning }
      }
      return next
    }),
  }
}

export function defaultLessonId(locale: Locale): string {
  return locale === 'zh' ? 'yuapp-1-1' : 'om-origin'
}
