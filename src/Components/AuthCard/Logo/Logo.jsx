import React from 'react'
import './Logo.css'

function Logo() {
  return (
    <div className="logo">
      <div className="logo__icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="10" width="18" height="4" rx="2" fill="white" transform="rotate(-45 12 12)" />
          <rect x="3" y="10" width="18" height="4" rx="2" fill="white" transform="rotate(45 12 12)" />
        </svg>
      </div>
      <span className="logo__text">PharmaGuide</span>
    </div>
  )
}

export default Logo
