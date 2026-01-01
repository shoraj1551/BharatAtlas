/**
 * Data Tooltips for Map
 * 
 * Shows place information on hover
 */

import './MapTooltip.css'

/**
 * Add tooltip to map
 */
export function addMapTooltip(map) {
    // Create tooltip element
    const tooltip = document.createElement('div')
    tooltip.className = 'map-tooltip'
    tooltip.style.display = 'none'
    document.body.appendChild(tooltip)

    // Hover on states
    map.on('mousemove', 'state-boundaries', (e) => {
        if (e.features && e.features.length > 0) {
            const feature = e.features[0]
            const props = feature.properties

            // Format tooltip content
            const name = props.st_nm || props.ST_NM || props.name || 'Unknown'
            const population = props.population?.toLocaleString() || props.population_density ?
                `${(props.population_density * props.area_sq_km).toLocaleString()}` : 'N/A'
            const literacy = props.literacy_rate ? `${props.literacy_rate}%` : 'N/A'
            const density = props.population_density ? `${props.population_density.toLocaleString()}/km²` : 'N/A'

            tooltip.innerHTML = `
                <div class="tooltip-title">${name}</div>
                <div class="tooltip-row">
                    <span class="tooltip-label">Population:</span>
                    <span class="tooltip-value">${population}</span>
                </div>
                <div class="tooltip-row">
                    <span class="tooltip-label">Literacy:</span>
                    <span class="tooltip-value">${literacy}</span>
                </div>
                <div class="tooltip-row">
                    <span class="tooltip-label">Density:</span>
                    <span class="tooltip-value">${density}</span>
                </div>
            `

            // Position tooltip
            tooltip.style.left = e.originalEvent.pageX + 10 + 'px'
            tooltip.style.top = e.originalEvent.pageY + 10 + 'px'
            tooltip.style.display = 'block'

            // Change cursor
            map.getCanvas().style.cursor = 'pointer'
        }
    })

    // Hover on cities
    map.on('mousemove', 'city-markers', (e) => {
        if (e.features && e.features.length > 0) {
            const feature = e.features[0]
            const props = feature.properties

            const name = props.name || 'Unknown City'
            const population = props.population ? props.population.toLocaleString() : 'N/A'

            tooltip.innerHTML = `
                <div class="tooltip-title">${name}</div>
                <div class="tooltip-row">
                    <span class="tooltip-label">Population:</span>
                    <span class="tooltip-value">${population}</span>
                </div>
            `

            tooltip.style.left = e.originalEvent.pageX + 10 + 'px'
            tooltip.style.top = e.originalEvent.pageY + 10 + 'px'
            tooltip.style.display = 'block'

            map.getCanvas().style.cursor = 'pointer'
        }
    })

    // Hide on mouse leave
    map.on('mouseleave', 'state-boundaries', () => {
        tooltip.style.display = 'none'
        map.getCanvas().style.cursor = ''
    })

    map.on('mouseleave', 'city-markers', () => {
        tooltip.style.display = 'none'
        map.getCanvas().style.cursor = ''
    })

    console.log('✓ Map tooltips enabled')

    return tooltip
}

/**
 * Remove tooltip
 */
export function removeMapTooltip(tooltipElement) {
    if (tooltipElement && tooltipElement.parentNode) {
        tooltipElement.parentNode.removeChild(tooltipElement)
    }
}
