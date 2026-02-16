import { z } from "zod"
import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { AppError } from "../utils/appError.js"

export default function zodValidatorMiddlware(schema: z.ZodObject<any, any>) {
    return (req:Request, _res: Response, next:NextFunction) => {
        const val = schema.safeParse(req.body)

        if (!val.success){
            const error = val.error.issues.map(issue => {
                return {message:issue.message}
            })
            throw new AppError(JSON.stringify(error), StatusCodes.BAD_REQUEST)
        }
        next()
        
    }
}