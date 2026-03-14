export default function ProgressBar({ current, total, secondsLeft, isPlaying }) {
  const progress = ((current) / (total - 1)) * 100

  return (
    <div className="progress-container">
      <div className="progress-info">
        <span className="page-counter">{current + 1} / {total}</span>
        {isPlaying && (
          <span className="countdown">⏱ {secondsLeft}s</span>
        )}
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}