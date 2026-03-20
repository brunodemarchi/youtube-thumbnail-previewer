import { useState, useCallback, useEffect } from 'react'
import Header from './components/Header'
import EditorPanel from './components/EditorPanel'
import HomeGrid from './components/HomeGrid'
import SidebarView from './components/SidebarView'
import DropOverlay from './components/DropOverlay'
import './App.css'

function App() {
  const [view, setView] = useState('home')
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [channel, setChannel] = useState('')
  const [dragging, setDragging] = useState(false)

  const displayTitle = title || 'Your Video Title Goes Here'
  const displayDuration = duration || '12:34'
  const displayChannel = channel || 'Your Channel'

  const handleImage = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setThumbnail((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return url
      })
    }
  }, [])

  const handleClear = useCallback(() => {
    setThumbnail((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
  }, [])

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
      <Header />
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
      />

      {view === 'home' ? (
        <HomeGrid
          thumbnail={thumbnail}
          title={displayTitle}
          duration={displayDuration}
          channel={displayChannel}
          onFileSelect={handleImage}
        />
      ) : (
        <SidebarView
          thumbnail={thumbnail}
          title={displayTitle}
          duration={displayDuration}
          channel={displayChannel}
          onFileSelect={handleImage}
        />
      )}
    </>
  )
}

export default App
