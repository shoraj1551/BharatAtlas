/**
 * Connect to MongoDB Atlas
 */
export function connectMongo(): Promise<any>;
/**
 * Get MongoDB database instance
 */
export function getMongoDb(): any;
/**
 * Close MongoDB connection
 */
export function closeMongo(): Promise<void>;
declare namespace _default {
    export { connectMongo };
    export { getMongoDb };
    export { closeMongo };
}
export default _default;
//# sourceMappingURL=mongoService.d.ts.map