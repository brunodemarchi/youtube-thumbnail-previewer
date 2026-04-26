import { useState, useCallback, useEffect, useMemo } from 'react'
import Header from './components/Header'
import EditorPanel from './components/EditorPanel'
import HomeGrid from './components/HomeGrid'
import SidebarView from './components/SidebarView'
import SearchView from './components/SearchView'
import SettingsModal from './components/SettingsModal'
import DropOverlay from './components/DropOverlay'
import videoDatabase from './videoDatabase'
import './App.css'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const HOME_COUNT = 11
const SIDEBAR_COUNT = 9
const SEARCH_COUNT = 9

const VIEW_COUNTS = { home: HOME_COUNT, sidebar: SIDEBAR_COUNT, search: SEARCH_COUNT }
const DEFAULT_INITIAL_POSITION = { home: 5, sidebar: 4, search: 4 }

const STORAGE_KEY = 'yt-thumb-previewer'

function clampInt(v, max, fallback) {
  return Number.isInteger(v) && v >= 0 && v <= max ? v : fallback
}

function sanitizeInitialPosition(raw) {
  const ip = raw && typeof raw === 'object' ? raw : {}
  return {
    home: clampInt(ip.home, HOME_COUNT, DEFAULT_INITIAL_POSITION.home),
    sidebar: clampInt(ip.sidebar, SIDEBAR_COUNT, DEFAULT_INITIAL_POSITION.sidebar),
    search: clampInt(ip.search, SEARCH_COUNT, DEFAULT_INITIAL_POSITION.search),
  }
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      parsed.initialPosition = sanitizeInitialPosition(parsed.initialPosition)
      return parsed
    }
  } catch {}
  return { initialPosition: { ...DEFAULT_INITIAL_POSITION } }
}

function fileToDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
  })
}

function App() {
  const saved = useMemo(loadSaved, [])

  const [view, setView] = useState('home')
  const [thumbnail, setThumbnail] = useState(saved.thumbnail || null)
  const [title, setTitle] = useState(saved.title || '')
  const [duration, setDuration] = useState(saved.duration || '')
  const [channel, setChannel] = useState(saved.channel || '')
  const [dragging, setDragging] = useState(false)
  const [seed, setSeed] = useState(0)
  const [userPosition, setUserPosition] = useState(0)
  const [scrollKey, setScrollKey] = useState(0)
  const [theme, setTheme] = useState(saved.theme || 'dark')
  const [initialPosition, setInitialPosition] = useState(saved.initialPosition || DEFAULT_INITIAL_POSITION)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((t) => t === 'dark' ? 'light' : 'dark')
  }, [])

  const displayTitle = title || 'Your Video Title Goes Here'
  const displayDuration = duration || '12:34'
  const displayChannel = channel || 'Your Channel'

  // Persist to localStorage
  useEffect(() => {
    const data = { title, duration, channel, thumbnail, theme, initialPosition }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [title, duration, channel, thumbnail, theme, initialPosition])

  // Pick random videos whenever seed changes
  const { homeVideos, sidebarVideos, searchVideos } = useMemo(() => {
    const shuffled = shuffle(videoDatabase)
    return {
      homeVideos: shuffled.slice(0, HOME_COUNT),
      sidebarVideos: shuffled.slice(HOME_COUNT, HOME_COUNT + SIDEBAR_COUNT),
      searchVideos: shuffled.slice(HOME_COUNT + SIDEBAR_COUNT, HOME_COUNT + SIDEBAR_COUNT + SEARCH_COUNT),
    }
  }, [seed])

  const getMaxPos = useCallback(() => {
    if (view === 'home') return HOME_COUNT
    if (view === 'sidebar') return SIDEBAR_COUNT
    return SEARCH_COUNT
  }, [view])

  const handleRandomize = useCallback(() => {
    setSeed((s) => s + 1)
  }, [])

  const handleRandomizePosition = useCallback(() => {
    setUserPosition(Math.floor(Math.random() * (getMaxPos() + 1)))
    setScrollKey((s) => s + 1)
  }, [getMaxPos])

  const handleShuffleAll = useCallback(() => {
    setSeed((s) => s + 1)
    setUserPosition(Math.floor(Math.random() * (getMaxPos() + 1)))
    setScrollKey((s) => s + 1)
  }, [getMaxPos])

  const handlePlaceAtVisual = useCallback((visualIndex) => {
    setUserPosition(visualIndex)
    setScrollKey((s) => s + 1)
  }, [])

  const handleImage = useCallback(async (file) => {
    if (file && file.type.startsWith('image/')) {
      const dataURL = await fileToDataURL(file)
      const isFirst = !thumbnail
      setThumbnail(dataURL)
      if (isFirst) {
        setUserPosition(initialPosition[view] ?? 0)
        setScrollKey((s) => s + 1)
      }
    }
  }, [thumbnail, view, initialPosition])

  const handleClear = useCallback(() => {
    setThumbnail(null)
  }, [])

  // Keyboard shortcuts (R = shuffle, when not typing)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'r' || e.key === 'R') {
        handleShuffleAll()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleShuffleAll])

  // Global paste handler
  useEffect(() => {
    const onPaste = (e) => {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault()
          handleImage(item.getAsFile())
          return
        }
      }
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [handleImage])

  // Global drag & drop
  useEffect(() => {
    let dragCounter = 0

    const onDragEnter = (e) => {
      e.preventDefault()
      dragCounter++
      if (e.dataTransfer.types.includes('Files')) {
        setDragging(true)
      }
    }
    const onDragLeave = (e) => {
      e.preventDefault()
      dragCounter--
      if (dragCounter <= 0) {
        dragCounter = 0
        setDragging(false)
      }
    }
    const onDragOver = (e) => e.preventDefault()
    const onDrop = (e) => {
      e.preventDefault()
      dragCounter = 0
      setDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) handleImage(file)
    }

    window.addEventListener('dragenter', onDragEnter)
    window.addEventListener('dragleave', onDragLeave)
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('drop', onDrop)
    return () => {
      window.removeEventListener('dragenter', onDragEnter)
      window.removeEventListener('dragleave', onDragLeave)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('drop', onDrop)
    }
  }, [handleImage])

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} onOpenSettings={() => setSettingsOpen(true)} />
      <nav className="yt-tabs">
        <button
          className={`tab ${view === 'home' ? 'active' : ''}`}
          onClick={() => setView('home')}
        >
          Home Grid
        </button>
        <button
          className={`tab ${view === 'sidebar' ? 'active' : ''}`}
          onClick={() => setView('sidebar')}
        >
          Sidebar / Up Next
        </button>
        <button
          className={`tab ${view === 'search' ? 'active' : ''}`}
          onClick={() => setView('search')}
        >
          Search Results
        </button>
      </nav>

      <DropOverlay active={dragging} />

      <EditorPanel
        title={title}
        duration={duration}
        channel={channel}
        onTitleChange={setTitle}
        onDurationChange={setDuration}
        onChannelChange={setChannel}
        onFileSelect={handleImage}
        onClear={handleClear}
        onRandomize={handleRandomize}
        onRandomizePosition={handleRandomizePosition}
        onShuffleAll={handleShuffleAll}
      />

      {view === 'home' && (
        <HomeGrid
          thumbnail={thumbnail}
          title={displayTitle}
          duration={displayDuration}
          channel={displayChannel}
          onFileSelect={handleImage}
          videos={homeVideos}
          userPosition={userPosition}
          scrollKey={scrollKey}
          onPlaceAt={handlePlaceAtVisual}
        />
      )}
      {view === 'sidebar' && (
        <SidebarView
          thumbnail={thumbnail}
          title={displayTitle}
          duration={displayDuration}
          channel={displayChannel}
          onFileSelect={handleImage}
          videos={sidebarVideos}
          userPosition={userPosition}
          scrollKey={scrollKey}
          onPlaceAt={handlePlaceAtVisual}
        />
      )}
      {view === 'search' && (
        <SearchView
          thumbnail={thumbnail}
          title={displayTitle}
          duration={displayDuration}
          channel={displayChannel}
          onFileSelect={handleImage}
          videos={searchVideos}
          userPosition={userPosition}
          scrollKey={scrollKey}
          onPlaceAt={handlePlaceAtVisual}
        />
      )}

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        initialPosition={initialPosition}
        onChange={setInitialPosition}
        viewCounts={VIEW_COUNTS}
      />
    </>
  )
}

export default App
