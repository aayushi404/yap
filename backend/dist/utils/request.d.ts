import type { Request } from "express";
export interface AuthRequest extends Request {
    user?: {
        id: number;
    };
}
//# sourceMappingURL=request.d.ts.map