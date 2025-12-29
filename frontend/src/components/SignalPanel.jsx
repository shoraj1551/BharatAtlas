import './SignalPanel.css'
import { getSignalTransparency } from '../utils/signalSystem'

function SignalPanel({ signal }) {
    if (!signal) return null

    const transparency = getSignalTransparency(signal)

    return (
        <div className="signal-panel">
            {/* Story 137: Signal ≠ Recommendation */}
            <div className="signal-disclaimer">
                <em>{signal.disclaimer}</em>
            </div>

            {/* Story 139: Signal transparency panel */}
            <div className="signal-transparency">
                <h4>Why this signal exists:</h4>
                <ul className="signal-factors">
                    {transparency.factors.map((factor, i) => (
                        <li key={i}>{factor.explanation}</li>
                    ))}
                </ul>
            </div>

            {/* Story 140: Counter-signals shown */}
            {transparency.counterSignals.length > 0 && (
                <div className="counter-signals">
                    <h4>Risks to consider:</h4>
                    {transparency.counterSignals.map((counter, i) => (
                        <div key={i} className={`counter-signal severity-${counter.severity}`}>
                            ⚠️ {counter.message}
                        </div>
                    ))}
                </div>
            )}

            <div className="signal-methodology">
                <small>{transparency.methodology}</small>
            </div>
        </div>
    )
}

export default SignalPanel
