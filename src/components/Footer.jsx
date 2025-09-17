import React from 'react'
import instagram from '../assets/instagram.svg'
import soundcloud from '../assets/soundcloud.svg'
import './Footer.css'

const Footer = () => {
  return (
    <footer id="socials" className="footer">
      <div className="footer-content">
        <div className="social-section">
          <h4>Follow Me</h4>
          <div className="footer-social-links">
            <a 
              href="https://www.instagram.com/itsrighter_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Follow on Instagram"
            >
              <img src={instagram} alt="Instagram" className="footer-social-image" />
            </a>
            <a 
              href="https://soundcloud.com/itsrighter" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Follow on SoundCloud"
            >
              <img src={soundcloud} alt="SoundCloud" className="footer-social-image" />
            </a>
          </div>
        </div>
        
        <div className="copyright-section">
          <h4>© Copyright Notice</h4>
          <p>
            All loops are free to use in commercial and non commercial projects.
          </p>
          <p>
            You may not redistribute these loops or claim them as your own. For example you cannot take the loops listed here and offer them as loops on your own site. While you may use loops in your own productions, tracks, video soundtracks etc. you cannot claim copyright of those loops. You may claim copyright of your composition but cannot directly claim content that is downloaded from this website.
          </p>
          <p>
            © 2025, William Finnegan AKA itsrighter.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
