import SearchCard from './SearchCard'
import './SearchView.css'

function SearchView({ thumbnail, title, duration, channel, onFileSelect, videos, userPosition, scrollKey }) {
  const userCard = (
    <SearchCard
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

  const fakeCards = videos.map((video, i) => (
    <SearchCard key={video.id + '-' + i} video={video} />
  ))

  const pos = Math.min(userPosition, fakeCards.length)
  const allCards = [...fakeCards]
  allCards.splice(pos, 0, userCard)

  return (
    <main className="yt-search-view">
      <div className="search-filters">
        <button className="filter-chip active">All</button>
        <button className="filter-chip">Videos</button>
        <button className="filter-chip">Channels</button>
        <button className="filter-chip">Playlists</button>
        <button className="filter-chip">Recently uploaded</button>
      </div>
      <div className="search-results">
        {allCards}
      </div>
    </main>
  )
}

export default SearchView
