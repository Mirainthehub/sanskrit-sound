import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProgressState {
  completedLessons: string[]
  currentStreak: number
  lastPracticeDate: string | null
  totalXp: number
  hearts: number
  completeLesson: (lessonId: string, xp: number) => void
  useHeart: () => boolean
  restoreHearts: () => void
  recordPractice: () => void
  isLessonUnlocked: (lessonId: string, pathLessonIds: string[]) => boolean
  isLessonCompleted: (lessonId: string) => boolean
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      currentStreak: 0,
      lastPracticeDate: null,
      totalXp: 0,
      hearts: 5,

      completeLesson: (lessonId, xp) => {
        const { completedLessons, totalXp } = get()
        if (completedLessons.includes(lessonId)) return
        set({
          completedLessons: [...completedLessons, lessonId],
          totalXp: totalXp + xp,
        })
        get().recordPractice()
      },

      useHeart: () => {
        const { hearts } = get()
        if (hearts <= 0) return false
        set({ hearts: hearts - 1 })
        return true
      },

      restoreHearts: () => set({ hearts: 5 }),

      recordPractice: () => {
        const today = todayKey()
        const { lastPracticeDate, currentStreak } = get()
        if (lastPracticeDate === today) return

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayKey = yesterday.toISOString().slice(0, 10)

        const nextStreak =
          lastPracticeDate === yesterdayKey ? currentStreak + 1 : 1

        set({ lastPracticeDate: today, currentStreak: nextStreak })
      },

      isLessonCompleted: (lessonId) =>
        get().completedLessons.includes(lessonId),

      isLessonUnlocked: (lessonId, pathLessonIds) => {
        const index = pathLessonIds.indexOf(lessonId)
        if (index <= 0) return true
        const prev = pathLessonIds[index - 1]
        return get().completedLessons.includes(prev)
      },
    }),
    { name: 'svara-progress' },
  ),
)
