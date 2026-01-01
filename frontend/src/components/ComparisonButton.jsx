import { useComparisonStore } from '../store/comparisonStore'
import './ComparisonButton.css'

/**
 * Comparison Button Component
 * 
 * Allows users to add/remove places from comparison
 */
function ComparisonButton({ place, variant = 'default' }) {
    const { isPlaceSelected, togglePlace, canAddMore } = useComparisonStore()

    const isSelected = isPlaceSelected(place.place_id)
    const canAdd = canAddMore()

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!isSelected && !canAdd) {
            alert('Maximum 4 places can be compared. Remove a place to add another.')
            return
        }

        togglePlace(place)
    }

    const buttonText = isSelected ? '✓ Added to Compare' : '+ Add to Compare'
    const buttonClass = `comparison-btn ${variant} ${isSelected ? 'selected' : ''} ${!canAdd && !isSelected ? 'disabled' : ''}`

    return (
        <button
            onClick={handleClick}
            className={buttonClass}
            disabled={!canAdd && !isSelected}
            aria-label={isSelected ? `Remove ${place.canonical_name} from comparison` : `Add ${place.canonical_name} to comparison`}
        >
            {buttonText}
        </button>
    )
}

export default ComparisonButton
