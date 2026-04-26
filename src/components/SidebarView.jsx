import SidebarCard from './SidebarCard'
import './SidebarView.css'

function SidebarView({ thumbnail, title, duration, channel, onFileSelect, videos, userPosition, scrollKey, onPlaceAt }) {
  const userCard = (
    <SidebarCard
      key="user"
      isUser
      thumbnail={thumbnail}
      title={title}
      duration={duration}
      channel={channel}
      onFileSelect={onFileSelect}
      scrollKey={scrollKey}
    />
  )

  const fakeCards = videos.map((video, i) => {
    const visualIndex = i < userPosition ? i : i + 1
    return (
      <SidebarCard
        key={video.id + '-' + i}
        video={video}
        onContextMenu={(e) => { e.preventDefault(); onPlaceAt(visualIndex) }}
      />
    )
  })

  const pos = Math.min(userPosition, fakeCards.length)
  const allCards = [...fakeCards]
  allCards.splice(pos, 0, userCard)

  return (
    <main className="yt-sidebar-view">
      <div className="sidebar-layout">
        <div className="player-area">
          <div className="player-placeholder">
            <svg viewBox="0 0 24 24" width="64" height="64">
              <path fill="#fff" d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="player-info">
            <h2 className="player-title">Some Video You're Watching Right Now</h2>
            <p className="player-stats">1.5M views &middot; 2 days ago</p>
            <div className="player-channel">
              <div className="channel-avatar" style={{ background: '#e53935' }}>S</div>
              <div>
                <p className="channel-name">SomeCreator</p>
                <p className="sub-count">2.3M subscribers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-suggestions">
          <h3 className="sidebar-heading">Up next</h3>
          {allCards}
        </div>
      </div>
    </main>
  )
}

export default SidebarView
