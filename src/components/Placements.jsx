import React, { useState, useEffect } from 'react'
import './Placements.css'

const Placements = () => {
  // Sample YouTube video data - replace with your actual video IDs
  const videos = [
    { id: '2Rlrue-imXY-VE', title: 'Ruger ft Zlatan ibile - Giveaway' },
    { id: 'wnOr9sdQiNQ', title: 'Cosha TG - Big ft. Calboy' },
    { id: 'a9fC3FA41qQ', title: 'Fetty Wap - Cologne' },
    { id: '_WB4RJrrYwU', title: 'NFL Toon - Understand' },
    { id: 'orJfDav-VOc', title: 'YoungNef - October 5th' },
    { id: 'sTvzf1oLrhc', title: 'Kash Juliano ft XanMan - My Brother' },
    { id: 'c-e0SyC--CA', title: 'Hotboii - Gotta Question' },
    { id: 'd_yykxRBGwQ', title: 'Yung Plinko ft YFL Pooh & YFL Kelvin - Triplets' }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const videosPerPage = 3
  const nextDisabled = videos.length - currentIndex <= 3
  const prevDisabled = currentIndex === 0

  const nextVideos = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + videosPerPage >= videos.length ? 0 : prevIndex + videosPerPage
    )
  }

  const prevVideos = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - videosPerPage < 0 
          ? Math.max(0, videos.length - videosPerPage) 
          : prevIndex - videosPerPage
    )
  }

  const currentVideos = videos.slice(currentIndex, currentIndex + videosPerPage)

  return (
    <div id="placements" className="placements">
      <div className="container">
        <div className="info-section">
          <h2>Placements</h2>
          <p>
            Check out some of the songs that feature my guitar loops.
          </p>
        </div>
        
        <div className="carousel-container">
          <div className="videos-grid">
            {currentVideos.map((video, index) => (
              <div key={video.id} className="video-item">
                <div className="video-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h3 className="video-title">{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
        
        <div className="carousel-buttons">
          <button 
            className={prevDisabled ? "carousel-btn prev-btn disabled" : "carousel-btn prev-btn"}
            disabled={prevDisabled}
            onClick={prevVideos}
            aria-label="Previous videos"
          >
            ‹
          </button>
          <div className="carousel-indicators">
            <span className="indicator-text">
              {Math.floor(currentIndex / videosPerPage) + 1} of {Math.ceil(videos.length / videosPerPage)}
            </span>
          </div>
          <button 
            className={nextDisabled ? "carousel-btn next-btn disabled" : "carousel-btn next-btn"}
            disabled={nextDisabled}
            onClick={nextVideos}
            aria-label="Next videos"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  )
}

export default Placements