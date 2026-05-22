import React from 'react'
import './Navbar.css'
import Logo from '../Logo/Logo'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">
        <Logo />
        <nav className="navbar__nav">
          <button className="navbar__pharmacies">
            <svg
              className="navbar__pharmacies-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="currentColor"
              />
            </svg>
            Pharmacies
          </button>
          <button className="navbar__signin">Sign in</button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
