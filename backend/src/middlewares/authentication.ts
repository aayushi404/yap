import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../utils/request.js";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwt.js";

const authenticationMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization
        console.log(authorization)

        if(!authorization || !authorization.startsWith("Bearer") || !authorization.split(" ")[1]) {
            throw new AppError("Invalid authorization header", StatusCodes.UNAUTHORIZED)
        }

        const token = authorization.split(" ")[1] || ""
        const payload = verifyToken(token)
        req.user = {id: payload.userId }
        next()
    } catch (err) {
        if (err instanceof Error)
            throw new AppError(err.message, StatusCodes.UNAUTHORIZED)
    }
}
export default authenticationMiddleware