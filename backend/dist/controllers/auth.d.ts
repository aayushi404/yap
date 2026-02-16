import type { Request, Response } from "express";
declare const signup: (req: Request, res: Response) => Promise<void>;
declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { signup, login };
//# sourceMappingURL=auth.d.ts.map