import { useEffect } from 'react'
import './SettingsModal.css'

const FIELDS = [
  { key: 'home', label: 'Home Grid' },
  { key: 'sidebar', label: 'Sidebar / Up Next' },
  { key: 'search', label: 'Search Results' },
]

function clamp(v, max) {
  if (!Number.isFinite(v)) return 0
  return Math.min(max, Math.max(0, Math.floor(v)))
}

function SettingsModal({ open, onClose, initialPosition, onChange, viewCounts }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const handleFieldChange = (key, raw) => {
    const max = viewCounts[key]
    const clamped = clamp(Number(raw), max)
    onChange({ ...initialPosition, [key]: clamped })
  }

  return (
    <div className="settings-backdrop" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close" aria-label="Close" onClick={onClose}>×</button>
        </div>

        <p className="settings-intro">
          Where your thumbnail lands on the <em>first</em> upload (or after Clear). After that, use the shuffle buttons.
        </p>

        <div className="settings-fields">
          {FIELDS.map(({ key, label }) => {
            const max = viewCounts[key]
            return (
              <label key={key} className="settings-field">
                <span className="settings-field-label">{label} <span className="settings-range">(0–{max})</span></span>
                <input
                  type="number"
                  min={0}
                  max={max}
                  value={initialPosition[key]}
                  onChange={(e) => handleFieldChange(key, e.target.value)}
                />
              </label>
            )
          })}
        </div>

        <p className="settings-tip">
          <strong>Tip:</strong> right-click any video card to instantly place your preview in that slot.
        </p>
      </div>
    </div>
  )
}

export default SettingsModal
