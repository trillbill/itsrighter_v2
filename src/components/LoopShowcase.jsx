import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import ReactPlayer from 'react-player'
import ReactPaginate from 'react-paginate'
import { saveAs } from 'file-saver'
import { getAllLoops, getPackNumbers } from '../data/loops'
import './LoopShowcase.css'

const LoopShowcase = () => {
  const [allLoops, setAllLoops] = useState([])
  const [filteredLoops, setFilteredLoops] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [currentlyPlaying, setCurrentlyPlaying] = useState('')
  const [packNumbers, setPackNumbers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    note: '',
    key: '',
    tempo: '',
    pack: ''
  })

  const loopsPerPage = 7

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [loops, packNums] = await Promise.all([
          getAllLoops(),
          getPackNumbers()
        ])
        
        setAllLoops(loops)
        setFilteredLoops(loops)
        setPackNumbers(packNums)
      } catch (err) {
        console.error('Error loading loops data:', err)
        setError('Failed to load loops data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, allLoops])

  const applyFilters = () => {
    let filtered = [...allLoops]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(loop =>
        loop.title.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Note filter
    if (filters.note) {
      filtered = filtered.filter(loop => {
        const note = extractNote(loop.title)
        return note && note.toLowerCase().includes(filters.note.toLowerCase())
      })
    }

    // Key filter
    if (filters.key) {
      filtered = filtered.filter(loop => {
        const key = extractKey(loop.title)
        return key && key.toLowerCase().includes(filters.key.toLowerCase())
      })
    }

    // Tempo filter
    if (filters.tempo) {
      filtered = filtered.filter(loop => {
        const tempo = extractTempo(loop.title)
        const [min, max] = filters.tempo.split('-').map(Number)
        return tempo >= min && tempo < max
      })
    }

    // Pack filter
    if (filters.pack) {
      filtered = filtered.filter(loop => {
        const pack = extractPackNumber(loop.url)
        return pack === parseInt(filters.pack)
      })
    }

    setFilteredLoops(filtered)
    setCurrentPage(0)
  }

  const extractNote = (title) => {
    const parts = title.split(' ')
    return parts.find(part => /^[A-G]$/i.test(part))
  }

  const extractKey = (title) => {
    const key = title.split('bpm')
    return key[1].trim()
  }

  const extractTempo = (title) => {
    const match = title.match(/(\d+)bpm/i)
    return match ? parseInt(match[1]) : 0
  }

  const extractPackNumber = (url) => {
    const match = url.match(/RIGHTER_PACK(\d+)/)
    return match ? parseInt(match[1]) : 0
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      note: '',
      key: '',
      tempo: '',
      pack: ''
    })
  }

  const handlePlay = (url) => {
    setCurrentlyPlaying(url)
  }

  const handleDownload = (loop) => {
    const url = loop.url.replace('https://righter.s3.us-east-2.amazonaws.com/', 'https://d23vnzhpxwsomk.cloudfront.net/')
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, `itsrighter-${loop.title.replace(/ /g, '-')}.wav`)
      })
      .catch(error => {
        console.error('Error downloading:', error)
      })
  }

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
    setCurrentlyPlaying('')
  }

  const displayLoops = filteredLoops.slice(
    currentPage * loopsPerPage,
    (currentPage + 1) * loopsPerPage
  )

  const pageCount = Math.ceil(filteredLoops.length / loopsPerPage)

  if (loading) {
    return (
      <div className="loop-showcase">
        <div className="container">
          <div className="loading-state">
            <p>Loading loops data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="loop-showcase">
        <div className="container">
          <div className="error-state">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-button">
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="loops" className="loop-showcase">
      <div className="container">
        <div className="info-section">
          <h2>Browse & Download Guitar Loops</h2>
          <p>
            You can <strong>download any loop for free</strong> by clicking the download button. 
            Use these loops in your productions, royalty free. You can <a href="https://d23vnzhpxwsomk.cloudfront.net/tag.zip" className="tag-link">download my producer tag</a> and add it to your tracks.
          </p>
        </div>

        <div className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by title, BPM, key or pack #"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
            
            <div className="filters">
              <select
                value={filters.tempo}
                onChange={(e) => handleFilterChange('tempo', e.target.value)}
                className="filter-select"
              >
                <option value="">Tempo</option>
                <option value="50-60">50-60</option>
                <option value="60-70">60-70</option>
                <option value="70-80">70-80</option>
                <option value="80-90">80-90</option>
                <option value="90-100">90-100</option>
                <option value="100-110">100-110</option>
                <option value="110-120">110-120</option>
                <option value="120-130">120-130</option>
                <option value="130-140">130-140</option>
                <option value="140-150">140-150</option>
                <option value="150-160">150-160</option>
                <option value="160-170">160-170</option>
                <option value="170-180">170-180</option>
              </select>

              <select
                value={filters.note}
                onChange={(e) => handleFilterChange('note', e.target.value)}
                className="filter-select"
              >
                <option value="">Note</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>

              <select
                value={filters.key}
                onChange={(e) => handleFilterChange('key', e.target.value)}
                className="filter-select"
              >
                <option value="">Key</option>
                <option value="major">Major</option>
                <option value="minor">Minor</option>
              </select>

              <select
                value={filters.pack}
                onChange={(e) => handleFilterChange('pack', e.target.value)}
                className="filter-select"
              >
                <option value="">Pack #</option>
                {packNumbers.map(packNum => (
                  <option key={packNum} value={packNum}>
                    Pack {packNum}
                  </option>
                ))}
              </select>

              <button onClick={clearFilters} className="clear-button">
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="results-info">
          <p>Results ({filteredLoops.length})</p>
        </div>
        <div className="loops-table">
          <div className="table-header">
            <div className="header-cell">Title</div>
            <div className="header-cell">BPM</div>
            <div className="header-cell">Key</div>
            <div className="header-cell">Pack</div>
            <div className="header-cell">Player</div>
            <div className="header-cell">Download</div>
          </div>

          {displayLoops.map((loop, index) => {
            const title = loop.title.split(' ').slice(0, -2).join(' ')
            const bpm = extractTempo(loop.title)
            const key = extractKey(loop.title)
            const pack = extractPackNumber(loop.url)
            const isNewest = pack === Math.max(...packNumbers)

            return (
              <div key={index} className="table-row">
                <div className="table-cell">{title}</div>
                <div className="table-cell">{bpm}</div>
                <div className="table-cell">{key}</div>
                <div className="table-cell">
                  {pack}
                </div>
                <div className="table-cell player-cell">
                  <ReactPlayer
                    src={loop.url}
                    width="100%"
                    height="40px"
                    controls
                    loop
                    playing={loop.url === currentlyPlaying}
                    onPlay={() => handlePlay(loop.url)}
                    config={{
                      forceAudio: true
                    }}
                  />
                </div>
                <div className="table-cell">
                  <button
                    onClick={() => handleDownload(loop)}
                    className="download-button"
                    title="Download WAV"
                  >
                    <FontAwesomeIcon icon={faDownload} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {pageCount > 1 && (
          <div className="pagination-container">
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              pageCount={pageCount}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              activeClassName="active"
              pageRangeDisplayed={3}
              marginPagesDisplayed={0}
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default LoopShowcase
