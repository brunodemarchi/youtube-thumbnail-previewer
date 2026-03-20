import SidebarCard from './SidebarCard'
import fakeVideos from '../fakeVideos'
import './SidebarView.css'

function SidebarView({ thumbnail, title, duration, channel, onFileSelect }) {
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
          <SidebarCard
            isUser
            thumbnail={thumbnail}
            title={title}
            duration={duration}
            channel={channel}
            onFileSelect={onFileSelect}
          />
          {fakeVideos.map((video) => (
            <SidebarCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default SidebarView
