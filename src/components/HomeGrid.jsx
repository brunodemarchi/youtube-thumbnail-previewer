import VideoCard from './VideoCard'
import './HomeGrid.css'

function HomeGrid({ thumbnail, title, duration, channel, onFileSelect, videos, userPosition, scrollKey, onPlaceAt }) {
  const userCard = (
    <VideoCard
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
      <VideoCard
        key={video.id + '-' + i}
        video={video}
        onContextMenu={(e) => { e.preventDefault(); onPlaceAt(visualIndex) }}
      />
    )
  })

  // Insert user card at the specified position
  const pos = Math.min(userPosition, fakeCards.length)
  const allCards = [...fakeCards]
  allCards.splice(pos, 0, userCard)

  return (
    <main className="yt-main">
      <div className="video-grid">
        {allCards}
      </div>
    </main>
  )
}

export default HomeGrid
