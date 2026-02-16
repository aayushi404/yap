import type { Response } from "express";
import type { AuthRequest } from "../utils/request.js";
import type { createPostInput } from "../schema/validator.js";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prismaCient.js";
import { createsPost } from "../services/database.post.js";

const createPost = async (req: AuthRequest, res: Response) => {
    const reqBody : createPostInput = req.body
    if (!reqBody.text && reqBody.media.length === 0) {
        throw new AppError("Cannot create an empty post", StatusCodes.BAD_REQUEST)
    }

    let post : { text: string | null; media: string[]; createdAt: Date; updatedAt: Date; id: number; authorId: number; } | null = null
    if (reqBody.text) {
        post = await createsPost({text: reqBody.text, media: reqBody.media}, req.user?.id!)
    } else {
        post = await createsPost({media: reqBody.media}, req.user?.id!)
    }
    return res.status(StatusCodes.CREATED).json({post})
}

const updatePost = async (req: AuthRequest, res: Response) => {
    const reqBody: createPostInput = req.body
    if (!reqBody.text && reqBody.media.length === 0) {
        throw new AppError("Cannot create an empty post", StatusCodes.BAD_REQUEST)
    }

    const postId = Number(req.params.id as string )
    const postExist = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    if (!postExist) {
        throw new AppError("Invalid Post id", StatusCodes.CONFLICT)
    }

    let post : { text: string | null; media: string[]; createdAt: Date; updatedAt: Date; id: number; authorId: number; } | null = null
    if (reqBody.text) {
        post = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                text: reqBody.text,
                media: reqBody.media
            }
        })
    } else {
        post = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                media: reqBody.media
            }
        })
    }
    return res.status(StatusCodes.CREATED).json({post})
}

const deletePost = async (req: AuthRequest, res: Response) => {
    const postId = Number(req.params.id as string)
    await prisma.post.delete({
        where: {
            id: postId
        }
    })
    return res.status(StatusCodes.OK).json({
        message: "Successfully deleted the content"
    })
}

const likePost = async (req: AuthRequest, res: Response) => {
    const postId = Number(req.params.id as string)
    await prisma.like.create({
        data: {
            postId,
            userId: req.user?.id!
        }
    })
    return res.status(StatusCodes.CREATED).json({
        message: "Like Successfully created"
    })
}

const dislikePost = async (req: AuthRequest, res: Response) => {
    const postId = Number(req.params.id as string)
    
    await prisma.like.delete({
        where: {
           userId_postId: {
            postId,
            userId: req.user?.id!
           }
        }
    })
    return res.status(StatusCodes.OK).json({
        message: "Successfully deleted the like"
    })
}

export {createPost, updatePost, deletePost, likePost, dislikePost}