export function errorHandler(err: any, req: any, res: any, next: any): void;
export class AppError extends Error {
    constructor(message: any, statusCode: any);
    statusCode: any;
    status: string;
    isOperational: boolean;
}
//# sourceMappingURL=errorHandler.d.ts.map