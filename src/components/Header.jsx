import { useMemo } from 'react'
import './Header.css'

function Header() {
  const initial = useMemo(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)], [])
  return (
    <header className="yt-header">
      <div className="header-left">
        <button className="menu-btn" aria-label="Menu">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>
        <div className="yt-logo">
          <svg viewBox="0 0 90 20" width="90" height="20">
            <path fill="#ff0000" d="M27.97 3.12a3.02 3.02 0 0 0-2.12-2.13C23.73.5 14.6.5 14.6.5S5.47.5 3.35.99A3.02 3.02 0 0 0 1.23 3.12C.74 5.24.74 10 .74 10s0 4.76.49 6.88a3.02 3.02 0 0 0 2.12 2.13c2.12.49 11.25.49 11.25.49s9.13 0 11.25-.49a3.02 3.02 0 0 0 2.12-2.13c.49-2.12.49-6.88.49-6.88s0-4.76-.49-6.88z" />
            <path fill="#fff" d="M11.74 14.26L19.2 10l-7.46-4.26z" />
            <text x="32" y="15" fill="white" fontFamily="Roboto, Arial, sans-serif" fontSize="14" fontWeight="bold">YouTube</text>
          </svg>
        </div>
      </div>
      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="Search" disabled />
          <button className="search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="header-right">
        <div className="avatar">{initial}</div>
      </div>
    </header>
  )
}

export default Header
