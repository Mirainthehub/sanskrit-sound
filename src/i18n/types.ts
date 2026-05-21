export type Messages = {
  meta: { title: string }
  home: {
    brand: string
    titleLine1: string
    titleLine2: string
    tagline: string
    streakLabel: string
    xpLabel: string
    attribution: string
    attributionLink: string
    todayPractice: string
    walkPath: string
    mantraChamber: string
    langSwitch: string
  }
  path: {
    back: string
    title: string
    subtitle: string
    locked: string
    done: string
    minutes: string
  }
  chamber: {
    back: string
    label: string
    title: string
    receive: string
    previous: string
    next: string
    mantras: { meaning: string }[]
  }
  lesson: { leaveAria: string; pause: string }
  complete: {
    title: string
    xp: string
    message: string
    continuePath: string
    restHome: string
  }
  exercise: {
    playSound: string
    hearAgain: string
    playSoundMatch: string
    continue: string
    haveListened: string
    listenMore: (n: number) => string
    listenMatch: string
    trustEar: string
    wisdomOk: string
    wisdomSoft: string
    tapSyllables: string
    notQuite: string
    offerAnswer: string
    tryAgain: string
    chantWithMe: string
    nextSyllable: string
    completeMantra: string
    hearFullMantra: string
    round: (n: number) => string
  }
  units: {
    awakening: { title: string; description: string }
    elements: { title: string; description: string }
  }
  coreLessons: Record<
    string,
    {
      title?: string
      subtitle?: string
      intention?: string
      exercises?: Record<
        string,
        {
          prompt?: string
          subPrompt?: string
          meaning?: string
          mantraMeaning?: string
          options?: string[]
        }
      >
    }
  >
}
