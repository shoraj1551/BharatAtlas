/**
 * Execute a query
 * @param {string} text - SQL query
 * @param {Array} params - Query parameters
 * @returns {Promise} Query result
 */
export function query(text: string, params: any[]): Promise<any>;
/**
 * Get a client from the pool for transactions
 * @returns {Promise} Database client
 */
export function getClient(): Promise<any>;
export default pool;
declare const pool: any;
//# sourceMappingURL=database.d.ts.map