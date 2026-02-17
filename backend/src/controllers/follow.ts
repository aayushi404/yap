import type { Response } from "express";
import type { AuthRequest } from "../utils/request.js";
import type { createFollowInput } from "../schema/validator.js";
import { findUserById } from "../services/database.user.js";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prismaCient.js";

const createFollowRequest = async (req: AuthRequest, res: Response) => {
    const reqBody : createFollowInput = req.body
    const following = await findUserById(reqBody.followingId)
    if(!following) {
        throw new AppError("Invalid user id", StatusCodes.BAD_REQUEST)
    }
    const follow = await prisma.follow.create({
        data: {
            followerId: req.user?.id!,
            followingId: reqBody.followingId
        }
    })
    return res.status(StatusCodes.CREATED).json({follow})
}

export {createFollowRequest}