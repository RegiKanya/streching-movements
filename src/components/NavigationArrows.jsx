export default function NavigationArrows({ onPrev, onNext, isFirst, isLast }) {
  return (
    <>
      <button
        className={`nav-arrow nav-arrow-left ${isFirst ? 'hidden' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        aria-label="Előző oldal"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="15,4 7,12 15,20" />
        </svg>
      </button>

      <button
        className={`nav-arrow nav-arrow-right ${isLast ? 'hidden' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        aria-label="Következő oldal"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="9,4 17,12 9,20" />
        </svg>
      </button>
    </>
  )
}