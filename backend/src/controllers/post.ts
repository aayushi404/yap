import type { Response } from "express";
import type { AuthRequest } from "../utils/request.js";
import type { createPostInput } from "../schema/validator.js";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prismaCient.js";
import { createsPost, getPostById } from "../services/database.post.js";

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
    const postExist = await getPostById(postId)
    if (!postExist) {
        throw new AppError("Invalid Post id", StatusCodes.CONFLICT)
    }
    if (postExist.authorId !== req.user?.id) {
        throw new AppError("Forbidden request", StatusCodes.FORBIDDEN)
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
    const post = await getPostById(postId)
    if (!post) {
        throw new AppError("Invalid post Id", StatusCodes.CONFLICT)
    }
    if (post.authorId !== req.user?.id!) {
        throw new AppError("Forbidden request", StatusCodes.FORBIDDEN)
    }
    await prisma.post.delete({
        where: {
            id: postId
        }
    })
    return res.status(StatusCodes.OK).json({
        message: "Successfully deleted the post"
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
    return res.status(StatusCodes.CREATED).json({
        message: "Successfully deleted the like"
    })
}

const getPostWithComments = async (req: AuthRequest, res: Response) => {
    const postId : number = Number(req.params.postId)
    const post = await prisma.post.findFirst({
        where: {
            id: postId
        },
        include: {
            comments: {
                include: {
                    comments: true
                }
            },
            likes: true
        }
    })

    if (!post) {
        throw new AppError("Invalid post id", StatusCodes.BAD_REQUEST)
    }

    return res.status(StatusCodes.OK).json({post})
}

export {createPost, updatePost, deletePost, likePost, dislikePost, getPostWithComments}