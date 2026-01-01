/**
 * Web Worker Manager
 * 
 * Manages web worker pool for parallel processing
 */

class WorkerPool {
    constructor(workerPath, poolSize = 2) {
        this.workerPath = workerPath
        this.poolSize = poolSize
        this.workers = []
        this.queue = []
        this.activeWorkers = new Set()

        this.init()
    }

    init() {
        for (let i = 0; i < this.poolSize; i++) {
            const worker = new Worker(this.workerPath)
            this.workers.push(worker)
        }
    }

    async execute(type, data) {
        return new Promise((resolve, reject) => {
            const task = { type, data, resolve, reject }

            // Find available worker
            const worker = this.getAvailableWorker()

            if (worker) {
                this.runTask(worker, task)
            } else {
                this.queue.push(task)
            }
        })
    }

    getAvailableWorker() {
        return this.workers.find(w => !this.activeWorkers.has(w))
    }

    runTask(worker, task) {
        this.activeWorkers.add(worker)

        const handleMessage = (event) => {
            worker.removeEventListener('message', handleMessage)
            worker.removeEventListener('error', handleError)
            this.activeWorkers.delete(worker)

            if (event.data.type === 'SUCCESS') {
                task.resolve(event.data.result)
            } else {
                task.reject(new Error(event.data.error))
            }

            // Process next task in queue
            if (this.queue.length > 0) {
                const nextTask = this.queue.shift()
                this.runTask(worker, nextTask)
            }
        }

        const handleError = (error) => {
            worker.removeEventListener('message', handleMessage)
            worker.removeEventListener('error', handleError)
            this.activeWorkers.delete(worker)
            task.reject(error)
        }

        worker.addEventListener('message', handleMessage)
        worker.addEventListener('error', handleError)
        worker.postMessage({ type: task.type, data: task.data })
    }

    terminate() {
        this.workers.forEach(w => w.terminate())
        this.workers = []
        this.activeWorkers.clear()
        this.queue = []
    }
}

// Create singleton worker pool
let geoWorkerPool = null

export function getGeoWorkerPool() {
    if (!geoWorkerPool) {
        geoWorkerPool = new WorkerPool('/geoWorker.js', 2)
    }
    return geoWorkerPool
}

export function terminateGeoWorkerPool() {
    if (geoWorkerPool) {
        geoWorkerPool.terminate()
        geoWorkerPool = null
    }
}
