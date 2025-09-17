# itsrighter v2

A modern, clean version of the itsrighter guitar loop showcase website.

## Features

- 🎵 **Audio Player**: Built-in audio player for each loop
- 🔍 **Advanced Search**: Filter by BPM, key, note, and pack number
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⬇️ **Download**: Direct download of WAV files
- 🎨 **Modern UI**: Clean, professional design
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Player** - Audio playback
- **FontAwesome** - Icons
- **File Saver** - Download functionality
- **React Paginate** - Pagination

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration needed

## Data Structure

The loop data is stored in `src/data/loops.js`. Update this file with your actual loop data:

```javascript
export const loopPacks = [
  {
    pack_number: 37,
    pack_url: "https://d23vnzhpxwsomk.cloudfront.net/RIGHTER_PACK37/",
    loops: [
      {
        title: "Loop Name 120bpm Amaj",
        url: "https://d23vnzhpxwsomk.cloudfront.net/loop-file.wav"
      }
    ]
  }
]
```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Site header
│   ├── LoopShowcase.jsx    # Main loop display and functionality
│   ├── Footer.jsx          # Footer with newsletter signup
│   └── *.css               # Component styles
├── data/
│   └── loops.js            # Loop data
├── App.jsx                 # Main app component
├── App.css                 # Global app styles
├── main.jsx                # App entry point
└── index.css               # Global styles
```

## Features

### Search & Filter
- Search by title
- Filter by BPM range
- Filter by musical note (A-G)
- Filter by key (major/minor)
- Filter by pack number

### Audio Player
- Built-in ReactPlayer for each loop
- Auto-stop when switching between loops
- Loop playback
- Mobile-optimized controls

### Download
- Direct WAV file downloads
- Proper file naming
- CloudFront CDN integration

### Responsive Design
- Mobile-first approach
- Adaptive table layout
- Touch-friendly controls

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

© 2024 William Finnegan AKA itsrighter