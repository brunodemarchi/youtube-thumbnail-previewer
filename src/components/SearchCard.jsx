import { useRef, useEffect } from 'react'
import { avatarColor } from '../avatarColor'
import './SearchCard.css'

function SearchCard({ video, isUser, thumbnail, title, duration, channel, onFileSelect, scrollKey, onContextMenu }) {
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
      <div className="search-card" ref={ref} onClick={handleClick}>
        <div className="search-thumb-wrapper">
          <div className="search-thumb">
            {thumbnail ? (
              <img src={thumbnail} alt="Your thumbnail" />
            ) : (
              <div className="search-placeholder">
                <span>Your Thumbnail</span>
              </div>
            )}
          </div>
          <span className="search-duration">{duration}</span>
        </div>
        <div className="search-info">
          <h3 className="search-title">{title}</h3>
          <p className="search-stats">0 views &middot; Just now</p>
          <div className="search-channel">
            <div className="search-avatar" style={{ background: '#3ea6ff' }}>
              {(channel?.[0] || 'Y').toUpperCase()}
            </div>
            <span className="search-channel-name">{channel}</span>
          </div>
          <p className="search-description">
            Check out this amazing video! Don't forget to like and subscribe for more content.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="search-card" onContextMenu={onContextMenu}>
      <div className="search-thumb-wrapper">
        <div className="search-thumb">
          <img src={`${import.meta.env.BASE_URL}thumbs/${video.id}.jpg`} alt={video.title} />
        </div>
        <span className="search-duration">{video.duration}</span>
      </div>
      <div className="search-info">
        <h3 className="search-title">{video.title}</h3>
        <p className="search-stats">{video.views} &middot; {video.age}</p>
        <div className="search-channel">
          <div className="search-avatar" style={{ background: avatarColor(video.channel) }}>
            {video.channel[0].toUpperCase()}
          </div>
          <span className="search-channel-name">{video.channel}</span>
        </div>
        <p className="search-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  )
}

export default SearchCard
