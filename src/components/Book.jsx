import { useRef, useState, useCallback } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useSwipeable } from 'react-swipeable'
import Page from './Page'
import ProgressBar from './ProgressBar'
import AutoPlayControls from './AutoPlayControls'
import { useAutoPlay } from '../hooks/useAutoPlay'

export default function Book({ images }) {
  const bookRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const total = images.length

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
  })

  const handleBookClick = () => {
    toggle()
  }

  return (
    <div className="book-wrapper" {...swipeHandlers}>
      <div className="book-container" onClick={handleBookClick}>
        <HTMLFlipBook
          ref={bookRef}
          width={window.innerWidth}
          height={window.innerHeight - 80}
          size="stretch"
          minWidth={300}
          maxWidth={1200}
          minHeight={400}
          maxHeight={1600}
          showCover={true}
          flippingTime={600}
          usePortrait={true}
          startPage={0}
          drawShadow={true}
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