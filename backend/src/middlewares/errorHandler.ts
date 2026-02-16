import type { AuthRequest } from "../utils/request.js";
import type { NextFunction, Response } from "express";
import { AppError } from "../utils/appError.js";

const GlobalErrorMiddleware = (error: any, req: AuthRequest, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            error: error.message,
            statusCode: error.statusCode
        })
        console.log(`${error.name}: ${error.stack}`)
        return
    }

    if (error instanceof Error) {
        res.status(500).json({
            error: error.message,
            statusCode: 500
        })
        console.log(`${error.name}: ${error.stack}`)
        return
    }

    return res.status(500).json({
        error: "Internal server error",
        statusCode: 500
    })
}

export default GlobalErrorMiddleware