import type { AuthRequest } from "../utils/request.js";
import type { NextFunction, Response } from "express";
declare const GlobalErrorMiddleware: (error: any, req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default GlobalErrorMiddleware;
//# sourceMappingURL=errorHandler.d.ts.map