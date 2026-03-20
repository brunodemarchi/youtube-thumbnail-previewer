import './EditorPanel.css'

function formatDuration(raw) {
  const digits = raw.replace(/\D/g, '').slice(0, 6)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return digits.slice(0, -2) + ':' + digits.slice(-2)
  return digits.slice(0, -4) + ':' + digits.slice(-4, -2) + ':' + digits.slice(-2)
}

function EditorPanel({
  title, duration, channel,
  onTitleChange, onDurationChange, onChannelChange,
  onFileSelect, onClear,
  onRandomize, onRandomizePosition, onShuffleAll,
}) {
  const handleDurationChange = (e) => {
    onDurationChange(formatDuration(e.target.value))
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
    e.target.value = ''
  }

  return (
    <div className="editor-panel">
      <div className="editor-bar">
        <div className="field title-field">
          <span className="field-label">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Your Video Title Goes Here"
            maxLength={100}
          />
        </div>

        <div className="field duration-field">
          <span className="field-label">Duration</span>
          <input
            type="text"
            value={duration}
            onChange={handleDurationChange}
            placeholder="12:34"
            maxLength={7}
          />
        </div>

        <div className="field channel-field">
          <span className="field-label">Channel</span>
          <input
            type="text"
            value={channel}
            onChange={(e) => onChannelChange(e.target.value)}
            placeholder="Your Channel"
            maxLength={50}
          />
        </div>

        <div className="bar-divider" />

        <label className="bar-btn upload-btn">
          Upload
          <input type="file" accept="image/*" hidden onChange={handleFile} />
        </label>
        <button className="bar-btn clear-btn" onClick={onClear}>Clear</button>

        <div className="bar-divider" />

        <button className="bar-btn shuffle-btn" onClick={onShuffleAll}>Shuffle All</button>
        <button className="bar-btn shuffle-btn secondary" onClick={onRandomizePosition}>Randomize Position</button>
        <button className="bar-btn shuffle-btn secondary" onClick={onRandomize}>Randomize Thumbnails</button>
      </div>
    </div>
  )
}

export default EditorPanel
