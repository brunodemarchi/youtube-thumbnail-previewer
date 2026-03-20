import './DropOverlay.css'

function DropOverlay({ active }) {
  if (!active) return null
  return (
    <div className="drop-overlay">
      <div className="drop-message">Drop your thumbnail image here</div>
    </div>
  )
}

export default DropOverlay
