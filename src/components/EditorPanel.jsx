import { useState } from 'react'
import './EditorPanel.css'

function EditorPanel({
  title, duration, channel,
  onTitleChange, onDurationChange, onChannelChange,
  onFileSelect, onClear,
}) {
  const [collapsed, setCollapsed] = useState(false)

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
    e.target.value = ''
  }

  return (
    <div className="editor-panel">
      <div className="editor-header" onClick={() => setCollapsed(!collapsed)}>
        <span className="editor-title">Thumbnail Settings</span>
        <button
          className={`editor-toggle ${collapsed ? 'collapsed' : ''}`}
          aria-label="Toggle editor"
        >
          &#9660;
        </button>
      </div>
      {!collapsed && (
        <div className="editor-body">
          <label>
            Video Title
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Your Video Title Goes Here"
              maxLength={100}
            />
          </label>
          <label>
            Duration
            <input
              type="text"
              value={duration}
              onChange={(e) => onDurationChange(e.target.value)}
              placeholder="12:34"
              maxLength={8}
            />
          </label>
          <label>
            Channel Name
            <input
              type="text"
              value={channel}
              onChange={(e) => onChannelChange(e.target.value)}
              placeholder="Your Channel"
              maxLength={50}
            />
          </label>
          <div className="upload-area">
            <label className="upload-btn">
              Upload Thumbnail
              <input type="file" accept="image/*" hidden onChange={handleFile} />
            </label>
            <button className="clear-btn" onClick={onClear}>Clear</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditorPanel
