// Snapshot & Federation System
// Bulk access and decentralized hosting (Stories 296-301)

/**
 * Data Snapshot Manager (Stories 296-297)
 */
export class DataSnapshotManager {
    constructor() {
        this.snapshots = new Map()
    }

    /**
     * Create snapshot (Story 296: Bulk via snapshots)
     */
    createSnapshot(data, metadata) {
        // Story 297: Stable & citable IDs
        const snapshotId = this.generateStableId(metadata.created_at)

        const snapshot = {
            // Story 297: Citable
            snapshot_id: snapshotId,
            created_at: metadata.created_at,
            version: metadata.version || '1.0',

            // Data
            data: data,
            metadata: {
                record_count: data.length,
                places_covered: new Set(data.map(d => d.place_id)).size,
                metrics_included: metadata.metrics,
                data_valid_from: metadata.data_valid_from,
                data_valid_to: metadata.data_valid_to
            },

            // Story 297: Citation support
            citation: this.generateCitation(snapshotId, metadata.created_at),

            // Permanence
            permanent: true,
            archived_url: `https://archive.bharatatlas.in/snapshots/${snapshotId}`
        }

        this.snapshots.set(snapshotId, snapshot)

        return snapshot
    }

    /**
     * Generate stable ID (Story 297)
     */
    generateStableId(createdAt) {
        const date = new Date(createdAt)
        return `snapshot-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    }

    /**
     * Generate citation (Story 297)
     */
    generateCitation(snapshotId, createdAt) {
        const year = new Date(createdAt).getFullYear()

        return {
            apa: `BharatAtlas. (${year}). Data Snapshot ${snapshotId}. Retrieved from https://bharatatlas.in/api/v1/snapshot/${snapshotId}`,

            bibtex: `@misc{bharatatlas_${snapshotId.replace(/-/g, '_')},
  author = {BharatAtlas},
  title = {Data Snapshot ${snapshotId}},
  year = {${year}},
  url = {https://bharatatlas.in/api/v1/snapshot/${snapshotId}},
  note = {Permanent snapshot ID: ${snapshotId}}
}`,

            chicago: `BharatAtlas. "Data Snapshot ${snapshotId}." ${year}. https://bharatatlas.in/api/v1/snapshot/${snapshotId}.`
        }
    }

    /**
     * Get snapshot
     */
    getSnapshot(snapshotId) {
        return this.snapshots.get(snapshotId) || null
    }

    /**
     * List all snapshots
     */
    listSnapshots() {
        return Array.from(this.snapshots.values())
            .map(s => ({
                snapshot_id: s.snapshot_id,
                created_at: s.created_at,
                record_count: s.metadata.record_count,
                citation: s.citation
            }))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
}

/**
 * Federation Architecture (Stories 298-301)
 */
export class FederationArchitecture {
    constructor() {
        this.nodes = new Map() // nodeId -> node info
        this.schema = null // Story 299: Schema is the constitution
    }

    /**
     * Register federated node (Story 298)
     */
    registerNode(nodeInfo) {
        // Story 298: States, universities, NGOs can host mirrors
        const node = {
            id: nodeInfo.id,
            name: nodeInfo.name,
            type: nodeInfo.type, // 'state', 'university', 'ngo', 'mirror'
            host: nodeInfo.host,

            // Story 298: Shared schema, independent hosting
            schema_version: this.schema?.version,

            // Story 300: Pull-based sync
            sync_mode: 'pull',
            last_sync: null,

            // Story 301: Extensions allowed
            local_extensions: [],

            registered_at: new Date().toISOString()
        }

        this.nodes.set(node.id, node)

        return node
    }

    /**
     * Set schema (Story 299: Schema is the constitution)
     */
    setSchema(schema) {
        // Story 299: Schema changes are rare and deliberate
        if (this.schema && this.schema.version !== schema.version) {
            console.warn('[SCHEMA CHANGE] Schema version changed - this is a significant event')
        }

        this.schema = {
            ...schema,
            set_at: new Date().toISOString(),
            immutable: true
        }

        Object.freeze(this.schema)
    }

    /**
     * Pull sync (Story 300: No forced updates)
     */
    pullSync(nodeId) {
        // Story 300: Federation sync is pull-based
        const node = this.nodes.get(nodeId)

        if (!node) {
            throw new Error('Node not registered')
        }

        return {
            sync_mode: 'pull',
            message: 'Node pulls updates on its own schedule',
            available_updates: this.getAvailableUpdates(node),
            note: 'No forced updates from center'
        }
    }

    /**
     * Add local extension (Story 301)
     */
    addLocalExtension(nodeId, extension) {
        // Story 301: Local nodes can add layers, not rewrite
        const node = this.nodes.get(nodeId)

        if (!node) {
            throw new Error('Node not registered')
        }

        // Validate extension doesn't rewrite core
        if (this.rewritesCore(extension)) {
            throw new Error('Extensions cannot rewrite core schema')
        }

        node.local_extensions.push({
            name: extension.name,
            description: extension.description,
            added_at: new Date().toISOString()
        })

        return {
            allowed: true,
            message: 'Extension added as layer, core remains immutable'
        }
    }

    /**
     * Check if extension rewrites core
     */
    rewritesCore(extension) {
        // Simplified - in production, validate against schema
        return extension.modifies_core_fields === true
    }

    /**
     * Get available updates
     */
    getAvailableUpdates(node) {
        return []
    }
}

/**
 * Schema Governance (Story 299)
 */
export const SCHEMA_GOVERNANCE = {
    // Story 299: Treat schema as law
    principles: [
        'Schema changes require community consensus',
        'Breaking changes have 6-month notice period',
        'Backward compatibility is mandatory',
        'Schema is versioned semantically (major.minor.patch)'
    ],

    changeProcess: [
        '1. Proposal published publicly',
        '2. 30-day comment period',
        '3. Impact assessment',
        '4. Vote by federation members',
        '5. 6-month migration period',
        '6. Deployment'
    ],

    currentVersion: '1.0.0',

    note: 'Schema is the constitution - changes are rare and deliberate'
}

export default {
    DataSnapshotManager,
    FederationArchitecture,
    SCHEMA_GOVERNANCE
}
