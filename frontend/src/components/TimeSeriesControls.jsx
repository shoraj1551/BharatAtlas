import { useState } from 'react'
import './TimeSeriesControls.css'

export default function TimeSeriesControls({ animator, years }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentYear, setCurrentYear] = useState(years[0])
    const [speed, setSpeed] = useState(1000)

    const handlePlayPause = () => {
        if (isPlaying) {
            animator.pause()
        } else {
            animator.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleYearChange = (e) => {
        const year = parseInt(e.target.value)
        setCurrentYear(year)
        animator.goToYear(year)
    }

    const handleSpeedChange = (e) => {
        const newSpeed = parseInt(e.target.value)
        setSpeed(newSpeed)
        animator.setSpeed(newSpeed)
    }

    return (
        <div className="time-series-controls">
            <button className="play-pause-btn" onClick={handlePlayPause}>
                {isPlaying ? '⏸️' : '▶️'}
            </button>

            <div className="timeline-slider">
                <input
                    type="range"
                    min={years[0]}
                    max={years[years.length - 1]}
                    value={currentYear}
                    onChange={handleYearChange}
                    className="year-slider"
                />
                <div className="year-display">{currentYear}</div>
            </div>

            <div className="speed-control">
                <label>Speed:</label>
                <select value={speed} onChange={handleSpeedChange}>
                    <option value={2000}>0.5x</option>
                    <option value={1000}>1x</option>
                    <option value={500}>2x</option>
                    <option value={250}>4x</option>
                </select>
            </div>
        </div>
    )
}
