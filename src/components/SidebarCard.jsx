import './SidebarCard.css'

function SidebarCard({ video, isUser, thumbnail, title, duration, channel, onFileSelect }) {
  const handleClick = () => {
    if (isUser && !thumbnail) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        const file = e.target.files?.[0]
        if (file) onFileSelect(file)
      }
      input.click()
    }
  }

  if (isUser) {
    return (
      <div className="sidebar-card user-card" onClick={handleClick}>
        <div className="sidebar-thumb-wrapper">
          <div className="sidebar-thumb">
            {thumbnail ? (
              <img src={thumbnail} alt="Your thumbnail" />
            ) : (
              <div className="placeholder-thumb-small">
                <span>Your<br />Thumb</span>
              </div>
            )}
          </div>
          <span className="duration-badge-sm">{duration}</span>
        </div>
        <div className="sidebar-meta">
          <h4 className="video-title">{title}</h4>
          <p className="channel-name">{channel}</p>
          <p className="video-stats">0 views &middot; Just now</p>
        </div>
      </div>
    )
  }

  return (
    <div className="sidebar-card">
      <div className="sidebar-thumb-wrapper">
        <div className="sidebar-thumb fake-thumb" style={{ background: video.gradient }}>
          <div className="fake-thumb-text-sm">{video.thumbTextSmall}</div>
        </div>
        <span className="duration-badge-sm">{video.duration}</span>
      </div>
      <div className="sidebar-meta">
        <h4 className="video-title">{video.title}</h4>
        <p className="channel-name">{video.channel}</p>
        <p className="video-stats">{video.views} &middot; {video.age}</p>
      </div>
    </div>
  )
}

export default SidebarCard
