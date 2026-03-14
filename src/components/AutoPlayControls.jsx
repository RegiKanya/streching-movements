export default function AutoPlayControls({ isPlaying, onToggle, isLastPage }) {
  return (
    <button
      className={`autoplay-btn ${isPlaying ? 'playing' : 'paused'}`}
      onClick={onToggle}
      disabled={isLastPage}
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? (
        // Pause icon
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1"/>
          <rect x="14" y="4" width="4" height="16" rx="1"/>
        </svg>
      ) : (
        // Play icon
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
      )}
    </button>
  )
}