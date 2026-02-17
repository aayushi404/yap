import type { Request, Response } from "express";
import { findUserById } from "../services/database.user.js";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prismaCient.js";
import type { AuthRequest } from "../utils/request.js";

const getUserPost = async (req: Request, res: Response) => {
    const userId : number = Number(req.params.userId)
    const user = await findUserById(userId)
    if (!user) {
        throw new AppError("Invalid user Id", StatusCodes.BAD_REQUEST)
    }
}

const getUserFollower = async (req: Request, res: Response) => {
    const userId : number = Number(req.params.userId)
    const user = await findUserById(userId)
    if (!user) {
        throw new AppError("Invalid user Id", StatusCodes.BAD_REQUEST)
    }

}

const getUserFollowing = async (req: Request, res: Response) => {
    const userId : number = Number(req.params.userId)
    const user = await findUserById(userId)
    if (!user) {
        throw new AppError("Invalid user Id", StatusCodes.BAD_REQUEST)
    }

}

const getUserFeed = async (req: AuthRequest, res: Response) => {
    const userFollowing = await prisma.follow.findMany({
        where: {
            followerId: req.user?.id!
        },
        select: {
            followingId: true
        }
    })
    const userFollowingIds = userFollowing.map(d => d.followingId)
    userFollowingIds.push(req.user?.id!)
    const cursor = req.query.cursor
    const limit = Number(req.query.limit)
    if (limit > 20 || limit <= 0 ) {
        throw new AppError("Invalid limit value", StatusCodes.BAD_REQUEST)
    }

    const posts = await prisma.post.findMany({
        where: {
            authorId: {
                in: userFollowingIds
            },
        },
        orderBy: {
            createdAt: "desc"
        },
        take: limit,
        ...(cursor && {
            cursor: {id: Number(cursor)},
            skip: 1
        })
    })
    const lastPositionCursor = posts.at(-1)?.id
    return res.status(StatusCodes.OK).json({
        posts,
        nextCursor: posts.length === limit ? lastPositionCursor : null
    })
}

export {getUserFeed, getUserFollower, getUserFollowing, getUserPost}