import React, { useState } from 'react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false) // Close mobile menu after navigation
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">    
          <nav className="nav-desktop">
            <button onClick={() => scrollToSection('loops')} className="nav-link">Loops</button>
            <button onClick={() => scrollToSection('placements')} className="nav-link">Placements</button>
            <button onClick={() => scrollToSection('socials')} className="nav-link">Socials</button>
          </nav>

          <button 
            className="hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'active' : ''}`}></span>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="nav-mobile open">
            <button onClick={() => scrollToSection('loops')} className="nav-link">Loops</button>
            <button onClick={() => scrollToSection('placements')} className="nav-link">Placements</button>
            <button onClick={() => scrollToSection('socials')} className="nav-link">Socials</button>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
