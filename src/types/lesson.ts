export type ExerciseType =
  | 'listen-match'
  | 'sound-tap'
  | 'meaning-reflect'
  | 'mantra-chant'
  | 'assemble'

export interface SoundUnit {
  devanagari: string
  transliteration: string
  ipa?: string
  meaning?: string
  /** Optional path under /audio/ — falls back to speech synthesis */
  audioKey?: string
  /** Text passed to Web Speech API when no recording exists */
  speechText?: string
  /** Devanagari image from yuapp import, under /images/ */
  image?: string
}

export interface Exercise {
  id: string
  type: ExerciseType
  prompt: string
  subPrompt?: string
  sound?: SoundUnit
  options?: string[]
  correctIndex?: number
  /** For assemble: ordered syllables / words */
  sequence?: string[]
  /** Word bank for assemble (shuffled in UI) */
  wordBank?: string[]
  mantra?: {
    full: string
    transliteration: string
    syllables: string[]
    meaning: string
  }
}

export interface Lesson {
  id: string
  unitId: string
  title: string
  subtitle: string
  intention: string
  durationMinutes: number
  exercises: Exercise[]
  xp: number
}

export interface PathUnit {
  id: string
  title: string
  symbol: string
  description: string
  lessons: Pick<Lesson, 'id' | 'title' | 'subtitle'>[]
}

export type AppView = 'home' | 'path' | 'lesson' | 'chamber' | 'complete'
