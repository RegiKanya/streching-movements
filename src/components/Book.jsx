import { useState, useCallback, useEffect, useRef } from 'react'
import { useSwipeable } from 'react-swipeable'
import ProgressBar from './ProgressBar'
import AutoPlayControls from './AutoPlayControls'
import NavigationArrows from './NavigationArrows'
import { useAutoPlay } from '../hooks/useAutoPlay'

export default function Book({ images }) {
  const [currentPage, setCurrentPage] = useState(0)
  const dragStartX = useRef(0)
  const total = images.length

  const goNext = useCallback(() => {
    setCurrentPage(prev => (prev >= total - 1 ? prev : prev + 1))
  }, [total])

  const goPrev = useCallback(() => {
    setCurrentPage(prev => (prev <= 0 ? prev : prev - 1))
  }, [])

  const { isPlaying, secondsLeft, toggle, pause } = useAutoPlay(
    goNext,
    total,
    currentPage
  )

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => { pause(); goNext() },
    onSwipedRight: () => { pause(); goPrev() },
    preventScrollOnSwipe: true,
    trackMouse: true,
    trackTouch: true,
    delta: 30,
  })

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX
  }

  const handleClick = (e) => {
    if (e.target.closest('.autoplay-btn')) return
    if (e.target.closest('.nav-arrow')) return
    const dragDistance = Math.abs(e.clientX - dragStartX.current)
    if (dragDistance > 10) return
    pause()
    goNext()
  }

  return (
    <div className="book-wrapper" {...swipeHandlers}>
      <div
        className="book-container"
        onMouseDown={handleMouseDown}
        onClick={handleClick}
      >
        <img
          key={images[currentPage].src}
          src={images[currentPage].src}
          alt={`Page ${images[currentPage].id}`}
          className="page-image"
          draggable={false}
        />

        <AutoPlayControls
          isPlaying={isPlaying}
          onToggle={toggle}
          isLastPage={currentPage >= total - 1}
        />

        <NavigationArrows
          onPrev={() => { pause(); goPrev() }}
          onNext={() => { pause(); goNext() }}
          isFirst={currentPage === 0}
          isLast={currentPage >= total - 1}
        />
      </div>

      <ProgressBar
        current={currentPage}
        total={total}
        secondsLeft={secondsLeft}
        isPlaying={isPlaying}
      />
    </div>
  )
}