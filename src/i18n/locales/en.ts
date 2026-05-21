import type { Messages } from '../types'

export const en: Messages = {
  meta: {
    title: 'Svara — Sacred Sanskrit Sound',
  },
  home: {
    brand: 'Svara',
    titleLine1: 'Sacred',
    titleLine2: 'sound',
    tagline:
      'Duolingo-style progression, Calm-style stillness — listen, chant, wake gently. No drills.',
    streakLabel: 'day presence',
    xpLabel: 'prāṇa earned',
    attribution: 'Content licensed from',
    attributionLink: '唐僧梵文',
    todayPractice: "Today's practice",
    walkPath: 'Walk the path',
    mantraChamber: 'Mantra chamber',
    langSwitch: '中文',
  },
  path: {
    back: '← Return',
    title: 'The Path',
    subtitle: 'Each step opens the next — no hurry',
    locked: '🔒',
    done: '✓',
    minutes: 'm',
  },
  chamber: {
    back: '← Return',
    label: 'Mantra Chamber',
    title: 'Sit. Listen. Chant.',
    receive: 'Receive mantra',
    previous: 'Previous',
    next: 'Next',
    mantras: [
      { meaning: 'The sound of the universe' },
      { meaning: 'I am That' },
      { meaning: 'Salutations to Ganesha' },
    ],
  },
  lesson: {
    leaveAria: 'Leave lesson',
    pause: 'Pause practice',
  },
  complete: {
    title: 'Practice complete',
    xp: 'prāṇa',
    message: 'Carry this sound with you through the day',
    continuePath: 'Continue on the path',
    restHome: 'Rest at home',
  },
  exercise: {
    playSound: 'Play sound',
    hearAgain: 'Hear again',
    playSoundMatch: 'Play sound',
    continue: 'Continue',
    haveListened: 'I have listened',
    listenMore: (n: number) =>
      `Listen ${n} more time${n === 1 ? '' : 's'}`,
    listenMatch: 'Which sound did you hear?',
    trustEar: 'Trust your ear, not your mind',
    wisdomOk: 'Wisdom received — carry it gently',
    wisdomSoft: 'Sit with this answer — all paths lead inward',
    tapSyllables: 'Tap syllables below',
    notQuite: 'Not quite — listen inward, try again',
    offerAnswer: 'Offer answer',
    tryAgain: 'Try again',
    chantWithMe: 'Chant with me',
    nextSyllable: 'Next syllable',
    completeMantra: 'Complete mantra',
    hearFullMantra: 'Hear full mantra',
    round: (n: number) => `Round ${n} of 3`,
  },
  units: {
    awakening: {
      title: 'Awakening',
      description: 'The primordial sound — where all mantra begins',
    },
    elements: {
      title: 'Elements',
      description: 'Vowels as cosmic openings',
    },
  },
  coreLessons: {
    'om-origin': {
      title: 'Origin of Om',
      subtitle: 'Primordial resonance',
      intention: 'Feel the sound before naming it',
      exercises: {
        'om-1': {
          prompt: 'Touch the sacred syllable',
          subPrompt: 'Listen. Let the sound settle in your chest.',
          meaning: 'The whole universe in one breath',
        },
        'om-2': {
          prompt: 'Which sound did you hear?',
          subPrompt: 'Trust your ear, not your mind',
        },
        'om-3': {
          prompt: 'What does Om symbolize?',
          subPrompt: 'There is no rush to answer',
          options: [
            'The primordial vibration of existence',
            'A greeting between friends',
            'The name of a single deity only',
            'A mathematical constant',
          ],
        },
        'om-4': {
          prompt: 'Chant with the recording',
          subPrompt: 'Three breaths. Match the rhythm.',
          mantraMeaning: 'I bow to the sound that was never born',
        },
      },
    },
    'vowels-breath': {
      title: 'Breath & Vowels',
      subtitle: 'The open throat',
      intention: 'Open the channel of breath before form',
      exercises: {
        'a-1': {
          prompt: 'The first vowel',
          subPrompt: 'Short. Open. At the back of the throat.',
          meaning: 'Pure potential — before manifestation',
        },
        'a-2': { prompt: 'Match the vowel you heard' },
        'a-3': {
          prompt: 'Build the sacred phrase',
          subPrompt: 'Tap each syllable in order',
        },
        'a-4': {
          prompt: 'So Ham — I am That',
          options: [
            'The breath affirms unity with the cosmos',
            'A command to leave the body',
            'A name for the moon only',
            'A commercial brand mantra',
          ],
        },
      },
    },
    'a-ah': {
      title: 'A & Ā',
      subtitle: 'Creation and expansion',
      intention: 'Feel the difference between short and long',
      exercises: {
        'aa-1': {
          prompt: 'Long vowel — held on the breath',
          meaning: 'Expansion — the universe opening',
        },
        'aa-2': { prompt: 'Short or long?' },
      },
    },
  },
}
