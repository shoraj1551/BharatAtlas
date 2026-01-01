import { useState } from 'react'
import './Toggle3D.css'

export default function Toggle3D({ map }) {
    const [is3D, setIs3D] = useState(false)

    const handleToggle = async () => {
        try {
            const { toggle3DView } = await import('../map/population3D')
            await toggle3DView(map, !is3D)
            setIs3D(!is3D)
        } catch (error) {
            console.error('Error toggling 3D view:', error)
        }
    }

    return (
        <button
            className={`toggle-3d-btn ${is3D ? 'active' : ''}`}
            onClick={handleToggle}
            title={is3D ? 'Switch to 2D' : 'Switch to 3D'}
        >
            {is3D ? '2D' : '3D'}
        </button>
    )
}
