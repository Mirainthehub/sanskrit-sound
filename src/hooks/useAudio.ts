import { useCallback, useRef } from 'react'

const audioCache = new Map<string, HTMLAudioElement>()

function playChime(frequency: number, duration = 0.4) {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
    setTimeout(() => ctx.close(), (duration + 0.1) * 1000)
  } catch {
    /* ambient optional */
  }
}

export function useAudio() {
  const speaking = useRef(false)

  const speak = useCallback((text: string, rate = 0.75) => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = rate
    utterance.pitch = 0.9
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(
      (v) =>
        v.lang.startsWith('hi') ||
        v.lang.startsWith('sa') ||
        v.name.toLowerCase().includes('hindi'),
    )
    if (preferred) utterance.voice = preferred
    speaking.current = true
    utterance.onend = () => {
      speaking.current = false
    }
    window.speechSynthesis.speak(utterance)
  }, [])

  const playSound = useCallback(
    async (audioKey?: string, speechText?: string) => {
      if (audioKey) {
        const url = `/audio/${audioKey}.mp3`
        let el = audioCache.get(url)
        if (!el) {
          el = new Audio(url)
          audioCache.set(url, el)
        }
        try {
          el.currentTime = 0
          await el.play()
          return
        } catch {
          /* fall through to speech */
        }
      }
      if (speechText) speak(speechText)
    },
    [speak],
  )

  const playSuccess = useCallback(() => playChime(528, 0.6), [])
  const playGentle = useCallback(() => playChime(396, 0.5), [])
  const playSoftError = useCallback(() => playChime(220, 0.35), [])

  return { playSound, speak, playSuccess, playGentle, playSoftError }
}
