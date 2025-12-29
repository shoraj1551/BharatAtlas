import './ErrorMessage.css'

function ErrorMessage({ title = 'Error', message, onRetry }) {
    return (
        <div className="error-message">
            <div className="error-icon">⚠</div>
            <h2 className="error-title">{title}</h2>
            <p className="error-text">{message}</p>
            {onRetry && (
                <button className="error-retry" onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    )
}

export default ErrorMessage
