import { AppError } from "../utils/appError.js";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwt.js";
const authenticationMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || authorization.startsWith("Bearer") || !authorization.split(" ")[1]) {
            throw new AppError("Invalid authorization header", StatusCodes.UNAUTHORIZED);
        }
        const token = authorization.split(" ")[1] || "";
        const payload = verifyToken(token);
        req.user = { id: payload.userId };
        next();
    }
    catch {
        throw new AppError("Invalid token", StatusCodes.UNAUTHORIZED);
    }
};
export default authenticationMiddleware;
//# sourceMappingURL=authentication.js.map