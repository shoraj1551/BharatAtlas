/**
 * Express Request Extensions
 *
 * Extends Express Request type with custom properties
 */
import { Request } from 'express';
import { Logger } from 'winston';
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: 'admin' | 'user';
    };
}
export interface LoggedRequest extends Request {
    id: string;
    logger: Logger;
}
export interface FullRequest extends AuthenticatedRequest, LoggedRequest {
}
declare global {
    namespace Express {
        interface Request {
            id?: string;
            logger?: Logger;
            user?: {
                id: string;
                email: string;
                role: 'admin' | 'user';
            };
        }
    }
}
//# sourceMappingURL=request.types.d.ts.map