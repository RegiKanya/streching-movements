import { useRef, useState, useCallback, useEffect } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useSwipeable } from 'react-swipeable'
import Page from './Page'
import ProgressBar from './ProgressBar'
import AutoPlayControls from './AutoPlayControls'
import NavigationArrows from './NavigationArrows'
import { useAutoPlay } from '../hooks/useAutoPlay'

export default function Book({ images }) {
  const bookRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 800,
    height: typeof window !== 'undefined' ? window.innerHeight - 80 : 600,
  })
  const dragStartX = useRef(0)
  const total = images.length

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - 80,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext()
  }, [])

  const goPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev()
  }, [])

  const { isPlaying, secondsLeft, toggle, pause } = useAutoPlay(
    goNext,
    total,
    currentPage
  )

  const handleFlip = (e) => {
    setCurrentPage(e.data)
  }

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      pause()
      goNext()
    },
    onSwipedRight: () => {
      pause()
      goPrev()
    },
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
        <HTMLFlipBook
          ref={bookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="stretch"
          minWidth={300}
          maxWidth={1200}
          minHeight={400}
          maxHeight={1600}
          showCover={true}
          flippingTime={600}
          usePortrait={true}
          startPage={0}
          drawShadow={false}
          onFlip={handleFlip}
          className="flipbook"
          style={{}}
          startZIndex={0}
          autoSize={true}
          clickEventForward={false}
          useMouseEvents={false}
          swipeDistance={30}
          showPageCorners={false}
          disableFlipByClick={true}
        >
          {images.map((image) => (
            <Page key={image.id} image={image} />
          ))}
        </HTMLFlipBook>

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