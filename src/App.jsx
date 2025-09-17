import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import LoopShowcase from './components/LoopShowcase'
import Placements from './components/Placements'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <LoopShowcase />
        <Placements />
      </main>
      <Footer />
    </div>
  )
}

export default App