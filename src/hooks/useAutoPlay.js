import { useState, useEffect, useRef, useCallback } from 'react'
import { useSound } from './useSound'

const AUTOPLAY_SECONDS = 30
const TICK_THRESHOLD = 5 // utolsó 5 mp-ben hangjelzés

export function useAutoPlay(onNext, totalPages, currentPage) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(AUTOPLAY_SECONDS)
  const intervalRef = useRef(null)
  const timerRef = useRef(null)
  const { playTick } = useSound()

  const clearAll = useCallback(() => {
    clearInterval(intervalRef.current)
    clearInterval(timerRef.current)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
    clearAll()
    setSecondsLeft(AUTOPLAY_SECONDS)
  }, [clearAll])

  const play = useCallback(() => {
    if (currentPage >= totalPages - 1) return
    setIsPlaying(true)
    setSecondsLeft(AUTOPLAY_SECONDS)
  }, [currentPage, totalPages])

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, pause, play])

  // Countdown timer + hang effekt
  useEffect(() => {
    if (!isPlaying) return

    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        const next = prev <= 1 ? AUTOPLAY_SECONDS : prev - 1

        // Hang az utolsó 5 mp-ben
        if (prev <= TICK_THRESHOLD && prev > 1) {
          playTick()
        }

        return next
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [isPlaying, playTick])

  // Page advance
  useEffect(() => {
    if (!isPlaying) return

    intervalRef.current = setInterval(() => {
      if (currentPage >= totalPages - 1) {
        pause()
        return
      }
      onNext()
    }, AUTOPLAY_SECONDS * 1000)

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, currentPage, totalPages, onNext, pause])

  // Auto-pause az utolsó oldalon
  useEffect(() => {
    if (currentPage >= totalPages - 1 && isPlaying) {
      pause()
    }
  }, [currentPage, totalPages, isPlaying, pause])

  return { isPlaying, secondsLeft, toggle, pause }
}