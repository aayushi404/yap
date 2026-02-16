import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../utils/request.js";
declare const authenticationMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export default authenticationMiddleware;
//# sourceMappingURL=authentication.d.ts.map