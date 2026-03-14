import { useState, useEffect, useRef, useCallback } from 'react'

const AUTOPLAY_SECONDS = 30

export function useAutoPlay(onNext, totalPages, currentPage) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(AUTOPLAY_SECONDS)
  const intervalRef = useRef(null)
  const timerRef = useRef(null)

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

  // Countdown timer
  useEffect(() => {
    if (!isPlaying) return

    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          return AUTOPLAY_SECONDS
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [isPlaying])

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

  // Auto-pause on last page
  useEffect(() => {
    if (currentPage >= totalPages - 1 && isPlaying) {
      pause()
    }
  }, [currentPage, totalPages, isPlaying, pause])

  return { isPlaying, secondsLeft, toggle, pause }
}