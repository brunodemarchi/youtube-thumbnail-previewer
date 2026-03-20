import VideoCard from './VideoCard'
import fakeVideos from '../fakeVideos'
import './HomeGrid.css'

function HomeGrid({ thumbnail, title, duration, channel, onFileSelect }) {
  return (
    <main className="yt-main">
      <div className="video-grid">
        <VideoCard
          isUser
          thumbnail={thumbnail}
          title={title}
          duration={duration}
          channel={channel}
          onFileSelect={onFileSelect}
        />
        {fakeVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </main>
  )
}

export default HomeGrid
