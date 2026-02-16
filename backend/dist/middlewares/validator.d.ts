import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
export default function zodValidatorMiddlware(schema: z.ZodObject<any, any>): (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=validator.d.ts.map