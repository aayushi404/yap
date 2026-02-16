import { z } from "zod";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/appError.js";
export default function zodValidatorMiddlware(schema) {
    return (req, _res, next) => {
        const val = schema.safeParse(req.body);
        if (!val.success) {
            const error = val.error.issues.map(issue => {
                return { message: issue.message };
            });
            throw new AppError(JSON.stringify(error), StatusCodes.BAD_REQUEST);
        }
        next();
    };
}
//# sourceMappingURL=validator.js.map