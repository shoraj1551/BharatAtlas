import { useState, useEffect } from 'react'
import './OnboardingTour.css'

const TOUR_STEPS = [
    {
        id: 'welcome',
        title: '👋 Welcome to BharatAtlas!',
        content: 'Explore comprehensive data about India - from demographics to economic indicators.',
        target: null,
        position: 'center'
    },
    {
        id: 'map',
        title: '🗺️ Interactive Map',
        content: 'Visualize data with our interactive map. Click on states to explore details.',
        target: '.map-container',
        position: 'right'
    },
    {
        id: 'search',
        title: '🔍 Search Places',
        content: 'Use Ctrl+K to quickly search for any place. Try advanced filters for better results.',
        target: '.search-bar',
        position: 'bottom'
    },
    {
        id: 'compare',
        title: '⚖️ Compare Places',
        content: 'Select multiple places to compare demographics, economy, and more side-by-side.',
        target: '.compare-btn',
        position: 'bottom'
    },
    {
        id: 'shortcuts',
        title: '⌨️ Keyboard Shortcuts',
        content: 'Press ? to see all keyboard shortcuts. Power users love this!',
        target: null,
        position: 'center'
    },
    {
        id: 'complete',
        title: '🎉 You\'re All Set!',
        content: 'Start exploring India\'s data. You can replay this tour anytime from settings.',
        target: null,
        position: 'center'
    }
]

export default function OnboardingTour({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has seen tour
        const hasSeenTour = localStorage.getItem('hasSeenOnboarding')
        if (!hasSeenTour) {
            setIsVisible(true)
        }
    }, [])

    const handleNext = () => {
        if (currentStep < TOUR_STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            handleComplete()
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSkip = () => {
        handleComplete()
    }

    const handleComplete = () => {
        localStorage.setItem('hasSeenOnboarding', 'true')
        setIsVisible(false)
        onComplete?.()
    }

    if (!isVisible) return null

    const step = TOUR_STEPS[currentStep]
    const isCenter = step.position === 'center'

    return (
        <>
            {/* Overlay */}
            <div className="tour-overlay" />

            {/* Tour Card */}
            <div className={`tour-card ${isCenter ? 'tour-center' : ''}`}>
                <div className="tour-progress">
                    {TOUR_STEPS.map((_, index) => (
                        <div
                            key={index}
                            className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                        />
                    ))}
                </div>

                <h2>{step.title}</h2>
                <p>{step.content}</p>

                <div className="tour-actions">
                    {currentStep > 0 && (
                        <button className="tour-btn tour-btn-secondary" onClick={handlePrev}>
                            ← Back
                        </button>
                    )}

                    {currentStep < TOUR_STEPS.length - 1 ? (
                        <>
                            <button className="tour-btn tour-btn-secondary" onClick={handleSkip}>
                                Skip Tour
                            </button>
                            <button className="tour-btn tour-btn-primary" onClick={handleNext}>
                                Next →
                            </button>
                        </>
                    ) : (
                        <button className="tour-btn tour-btn-primary" onClick={handleComplete}>
                            Get Started 🚀
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

// Hook to replay tour
export function useOnboardingTour() {
    const replayTour = () => {
        localStorage.removeItem('hasSeenOnboarding')
        window.location.reload()
    }

    return { replayTour }
}
