/**
 * Touch Gesture Support
 * 
 * Enhanced touch interactions for mobile
 */

export class TouchGestureHandler {
    constructor(element, options = {}) {
        this.element = element
        this.options = {
            swipeThreshold: 50,
            longPressDelay: 500,
            ...options
        }

        this.touchStart = null
        this.longPressTimer = null
        this.init()
    }

    init() {
        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this))
        this.element.addEventListener('touchmove', this.handleTouchMove.bind(this))
        this.element.addEventListener('touchend', this.handleTouchEnd.bind(this))
    }

    handleTouchStart(e) {
        this.touchStart = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now()
        }

        // Long press detection
        this.longPressTimer = setTimeout(() => {
            this.onLongPress?.(this.touchStart)
        }, this.options.longPressDelay)
    }

    handleTouchMove(e) {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer)
            this.longPressTimer = null
        }
    }

    handleTouchEnd(e) {
        if (this.longPressTimer) {
            clearTimeout(this.longPressTimer)
        }

        if (!this.touchStart) return

        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
            time: Date.now()
        }

        const deltaX = touchEnd.x - this.touchStart.x
        const deltaY = touchEnd.y - this.touchStart.y
        const deltaTime = touchEnd.time - this.touchStart.time

        // Detect swipe
        if (Math.abs(deltaX) > this.options.swipeThreshold ||
            Math.abs(deltaY) > this.options.swipeThreshold) {

            const direction = Math.abs(deltaX) > Math.abs(deltaY)
                ? (deltaX > 0 ? 'right' : 'left')
                : (deltaY > 0 ? 'down' : 'up')

            this.onSwipe?.(direction, { deltaX, deltaY, deltaTime })
        } else if (deltaTime < 300) {
            // Quick tap
            this.onTap?.(this.touchStart)
        }

        this.touchStart = null
    }

    onSwipe(callback) {
        this.onSwipe = callback
        return this
    }

    onTap(callback) {
        this.onTap = callback
        return this
    }

    onLongPress(callback) {
        this.onLongPress = callback
        return this
    }

    destroy() {
        this.element.removeEventListener('touchstart', this.handleTouchStart)
        this.element.removeEventListener('touchmove', this.handleTouchMove)
        this.element.removeEventListener('touchend', this.handleTouchEnd)
    }
}

/**
 * Enable haptic feedback (if available)
 */
export function hapticFeedback(type = 'light') {
    if ('vibrate' in navigator) {
        const patterns = {
            light: 10,
            medium: 20,
            heavy: 30
        }
        navigator.vibrate(patterns[type] || 10)
    }
}
