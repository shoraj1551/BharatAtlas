import { useState } from 'react'
import './DataStory.css'

export default function DataStory({ story }) {
    const [currentStep, setCurrentStep] = useState(0)

    if (!story) return null

    const step = story.steps[currentStep]
    const progress = ((currentStep + 1) / story.steps.length) * 100

    return (
        <div className="data-story">
            <div className="story-header">
                <h2>{story.title}</h2>
                <div className="story-progress">
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="story-content">
                <h3>{step.title}</h3>
                <p>{step.content}</p>
            </div>

            <div className="story-navigation">
                <button
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                    disabled={currentStep === 0}
                    className="story-btn"
                >
                    ← Previous
                </button>

                <span className="story-counter">
                    {currentStep + 1} / {story.steps.length}
                </span>

                <button
                    onClick={() => setCurrentStep(Math.min(story.steps.length - 1, currentStep + 1))}
                    disabled={currentStep === story.steps.length - 1}
                    className="story-btn story-btn-primary"
                >
                    Next →
                </button>
            </div>
        </div>
    )
}
