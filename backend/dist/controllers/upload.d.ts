import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../utils/request.js";
declare const upload: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default upload;
//# sourceMappingURL=upload.d.ts.map