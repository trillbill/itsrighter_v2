import React from 'react'
import Subscribe from './Subscribe'
import logo from '../assets/itsrighter_logo.png'
import './Hero.css'

const Hero = () => {
  return (
    <div id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <div className="profile-section">
              <img 
                src="https://d23vnzhpxwsomk.cloudfront.net/circleProfile-052623.png" 
                alt="itsrighter profile" 
                className="profile-image"
              />
              <img src={logo} alt="itsrighter logo" className="hero-logo" />
              <p className="hero-tagline">guitarist / producer</p>
            </div>
          </div>
          
          <div className="hero-right">
            <Subscribe />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
