import { useRef, useEffect } from 'react'
import { avatarColor } from '../avatarColor'
import './VideoCard.css'

function VideoCard({ video, isUser, thumbnail, title, duration, channel, onFileSelect, scrollKey, onContextMenu }) {
  const ref = useRef(null)

  useEffect(() => {
    if (isUser && scrollKey > 0 && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [scrollKey, isUser])
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
      <div className="video-card user-card" ref={ref} onClick={handleClick}>
        <div className="thumbnail-wrapper">
          <div className="thumbnail">
            {thumbnail ? (
              <img src={thumbnail} alt="Your thumbnail" />
            ) : (
              <div className="placeholder-thumb">
                <span>Click, paste, or drag<br />your thumbnail here</span>
              </div>
            )}
          </div>
          <span className="duration-badge">{duration}</span>
        </div>
        <div className="video-info">
          <div className="channel-avatar" style={{ background: '#3ea6ff' }}>
            {(channel?.[0] || 'Y').toUpperCase()}
          </div>
          <div className="video-meta">
            <h3 className="video-title">{title}</h3>
            <p className="channel-name">{channel}</p>
            <p className="video-stats">0 views &middot; Just now</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="video-card" onContextMenu={onContextMenu}>
      <div className="thumbnail-wrapper">
        <div className="thumbnail">
          <img src={`${import.meta.env.BASE_URL}thumbs/${video.id}.jpg`} alt={video.title} />
        </div>
        <span className="duration-badge">{video.duration}</span>
      </div>
      <div className="video-info">
        <div className="channel-avatar" style={{ background: avatarColor(video.channel) }}>
          {video.channel[0].toUpperCase()}
        </div>
        <div className="video-meta">
          <h3 className="video-title">{video.title}</h3>
          <p className="channel-name">{video.channel}</p>
          <p className="video-stats">{video.views} &middot; {video.age}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
