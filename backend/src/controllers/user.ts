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
        include: {
            author: {
                select: {
                    name: true,
                    username:true,
                    profile: {
                        select: {
                            profileImage:true
                        }
                    }
                }
            },
            likes: {
                select: {
                    userId: true
                }
            }
        },
        take: limit,
        ...(cursor && {
            cursor: {id: Number(cursor)},
            skip: 1
        })
    })

    type PostType = {
        likes: number,
        isLikedByMe: boolean,
        author : {
            name: string,
            username: string,
            profileImage: string | null
        },
        id: number,
        createdAt : Date,
        text: string | null,
        media: string[],
        authorId: number
    }
    const result: PostType[] = posts.map(post => {
        return {
            likes: post.likes.length,
            isLikedByMe: post.likes.map(like => like.userId).includes(req.user?.id!),
            author: {
                name: post.author.name,
                username: post.author.username,
                profileImage: post.author.profile? post.author.profile.profileImage : null
            },
            id: post.id,
            createdAt: post.createdAt,
            text: post.text,
            media: post.media,
            authorId: post.authorId
    }})

    const lastPositionCursor = posts.at(-1)?.id
    return res.status(StatusCodes.OK).json({
        posts: result,
        nextCursor: posts.length === limit ? lastPositionCursor : null
    })
}

type userProfile = {
    profile: {
        name: string;
        id: number;
        updatedAt: Date;
        bio: string | null;
        profileImage: string;
        userId: number;
    } | null;
} & {
    createdAt: Date;
    name: string;
    id: number;
    updatedAt: Date;
    username: string;
    email: string;
    password: string;
}

const fetchProfile = async (req: AuthRequest, res: Response) => {
    const username = req.query.username
    const userId = Number(req.query.userId)

    let user: userProfile | null = null
    if (username) {
        user = await prisma.user.findFirst({
            where: {
                username: username as string
            },
            include: {
                profile: true
            }
        })
    } else if (userId) {
        user = await prisma.user.findFirst({
            where: {
                id: userId
            }, 
            include : {
                profile: true
            }
        })
    }
    if (!user) {
        new AppError("profile not found", StatusCodes.NOT_FOUND)
    }

    return res.status(StatusCodes.OK).json(user)
}

export {getUserFeed, getUserFollower, getUserFollowing, getUserPost, fetchProfile}