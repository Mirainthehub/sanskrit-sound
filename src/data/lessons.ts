import type { Lesson, PathUnit } from '../types/lesson'
import { yuappLessons, yuappPathUnits } from './yuapp/lessons.generated'

const corePathUnits: PathUnit[] = [
  {
    id: 'awakening',
    title: 'Awakening',
    symbol: 'ॐ',
    description: 'The primordial sound — where all mantra begins',
    lessons: [
      { id: 'om-origin', title: 'Origin of Om', subtitle: 'Primordial resonance' },
      { id: 'vowels-breath', title: 'Breath & Vowels', subtitle: 'The open throat' },
    ],
  },
  {
    id: 'elements',
    title: 'Elements',
    symbol: 'अ',
    description: 'Vowels as cosmic openings',
    lessons: [
      { id: 'a-ah', title: 'A & Ā', subtitle: 'Creation and expansion' },
    ],
  },
]

const coreLessons: Record<string, Lesson> = {
  'om-origin': {
    id: 'om-origin',
    unitId: 'awakening',
    title: 'Origin of Om',
    subtitle: 'Primordial resonance',
    intention: 'Feel the sound before naming it',
    durationMinutes: 5,
    xp: 20,
    exercises: [
      {
        id: 'om-1',
        type: 'sound-tap',
        prompt: 'Touch the sacred syllable',
        subPrompt: 'Listen. Let the sound settle in your chest.',
        sound: {
          devanagari: 'ॐ',
          transliteration: 'oṃ',
          meaning: 'The whole universe in one breath',
          speechText: 'Om',
          audioKey: 'om',
        },
      },
      {
        id: 'om-2',
        type: 'listen-match',
        prompt: 'Which sound did you hear?',
        subPrompt: 'Trust your ear, not your mind',
        sound: {
          devanagari: 'ॐ',
          transliteration: 'oṃ',
          speechText: 'Om',
          audioKey: 'om',
        },
        options: ['oṃ', 'ahaṃ', 'so haṃ', 'gaṃ'],
        correctIndex: 0,
      },
      {
        id: 'om-3',
        type: 'meaning-reflect',
        prompt: 'What does Om symbolize?',
        subPrompt: 'There is no rush to answer',
        options: [
          'The primordial vibration of existence',
          'A greeting between friends',
          'The name of a single deity only',
          'A mathematical constant',
        ],
        correctIndex: 0,
      },
      {
        id: 'om-4',
        type: 'mantra-chant',
        prompt: 'Chant with the recording',
        subPrompt: 'Three breaths. Match the rhythm.',
        mantra: {
          full: 'ॐ',
          transliteration: 'oṃ',
          syllables: ['oṃ'],
          meaning: 'I bow to the sound that was never born',
        },
      },
    ],
  },
  'vowels-breath': {
    id: 'vowels-breath',
    unitId: 'awakening',
    title: 'Breath & Vowels',
    subtitle: 'The open throat',
    intention: 'Open the channel of breath before form',
    durationMinutes: 6,
    xp: 25,
    exercises: [
      {
        id: 'a-1',
        type: 'sound-tap',
        prompt: 'The first vowel',
        subPrompt: 'Short. Open. At the back of the throat.',
        sound: {
          devanagari: 'अ',
          transliteration: 'a',
          meaning: 'Pure potential — before manifestation',
          speechText: 'a',
          audioKey: 'a',
        },
      },
      {
        id: 'a-2',
        type: 'listen-match',
        prompt: 'Match the vowel you heard',
        sound: {
          devanagari: 'अ',
          transliteration: 'a',
          speechText: 'a',
          audioKey: 'a',
        },
        options: ['a', 'ā', 'i', 'u'],
        correctIndex: 0,
      },
      {
        id: 'a-3',
        type: 'assemble',
        prompt: 'Build the sacred phrase',
        subPrompt: 'Tap each syllable in order',
        sequence: ['so', 'haṃ'],
        wordBank: ['haṃ', 'gaṃ', 'so', 'oṃ'],
      },
      {
        id: 'a-4',
        type: 'meaning-reflect',
        prompt: 'So Ham — I am That',
        options: [
          'The breath affirms unity with the cosmos',
          'A command to leave the body',
          'A name for the moon only',
          'A commercial brand mantra',
        ],
        correctIndex: 0,
      },
    ],
  },
  'a-ah': {
    id: 'a-ah',
    unitId: 'elements',
    title: 'A & Ā',
    subtitle: 'Creation and expansion',
    intention: 'Feel the difference between short and long',
    durationMinutes: 4,
    xp: 15,
    exercises: [
      {
        id: 'aa-1',
        type: 'sound-tap',
        prompt: 'Long vowel — held on the breath',
        sound: {
          devanagari: 'आ',
          transliteration: 'ā',
          meaning: 'Expansion — the universe opening',
          speechText: 'aa',
          audioKey: 'aa',
        },
      },
      {
        id: 'aa-2',
        type: 'listen-match',
        prompt: 'Short or long?',
        sound: {
          devanagari: 'आ',
          transliteration: 'ā',
          speechText: 'aa',
          audioKey: 'aa',
        },
        options: ['a', 'ā', 'e', 'o'],
        correctIndex: 1,
      },
    ],
  },
}

/** Core Svara lessons + imported 唐僧梵文 (yuapp) content */
export const pathUnits: PathUnit[] = [...corePathUnits, ...yuappPathUnits]

export const lessons: Record<string, Lesson> = {
  ...coreLessons,
  ...yuappLessons,
}
