import type { Response } from "express";
import type { AuthRequest } from "../utils/request.js";
import type { createCommentInput, createPostInput } from "../schema/validator.js";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prismaCient.js";
import { getCommentById, getPostById } from "../services/database.post.js";

const createComment = async (req: AuthRequest, res: Response) => {
    const reqBody: createCommentInput = req.body

    if (!reqBody.text && reqBody.media.length === 0) {
        throw new AppError("Cannot create an empty comment", StatusCodes.BAD_REQUEST)
    }

    if ((!reqBody.postId && !reqBody.commentId) || (reqBody.postId && reqBody.commentId)) {
        throw new AppError("Invalid request body", StatusCodes.BAD_REQUEST)
    }

    let comment : {
    commentId: number | null;
    postId: number | null;
    id: number;
    text: string | null;
    media: string[];
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
    } | null = null

    if (reqBody.postId) {
        //create reply on post
        const post = await getPostById(reqBody.postId)
        if (!post) {
            throw new AppError("Invalid comment: post doest not exist", StatusCodes.CONFLICT)
        }

        reqBody.text ? 
        comment = await prisma.comment.create({
            data: {
                text: reqBody.text,
                media: reqBody.media,
                authorId: req.user?.id!,
                postId: reqBody.postId
            }
        }) : 
        comment = await prisma.comment.create({
            data: {
                media: reqBody.media,
                authorId: req.user?.id!,
                postId: reqBody.postId
            }
        })
    } else if (reqBody.commentId){
        // create reply on comment
        const comm = await getPostById(reqBody.commentId)
        if (!comm) {
            throw new AppError("Invalid reply: comment doest not exist", StatusCodes.CONFLICT)
        }

        reqBody.text ? 
        comment = await prisma.comment.create({
            data: {
                text: reqBody.text,
                media: reqBody.media,
                authorId: req.user?.id!,
                commentId: reqBody.commentId
            }
        }) : 
        comment = await prisma.comment.create({
            data: {
                media: reqBody.media,
                authorId: req.user?.id!,
                commentId: reqBody.commentId
            }
        })
 
    }

    return res.status(StatusCodes.CREATED).json({
        comment
    })
}

const updateComment = async (req: AuthRequest, res: Response) => {
    const reqBody: createPostInput = req.body

    if (!reqBody.text && reqBody.media.length === 0) {
        throw new AppError("Cannot create an empty comment", StatusCodes.BAD_REQUEST)
    }

    const commentId: number = Number(req.params.commentId)
    const comment = await getCommentById(commentId)
    if (!comment) {
        throw new AppError("Invalid comment Id", StatusCodes.BAD_REQUEST)
    }
    if (comment.authorId !== req.user?.id!) {
        throw new AppError("Request Forbidden", StatusCodes.FORBIDDEN)
    }
    let c : {
    id: number;
    text: string | null;
    media: string[];
    createdAt: Date;
    updatedAt: Date;
    postId: number | null;
    commentId: number | null;
    authorId: number;
    } |  null = null
    reqBody.text ?
    c = await prisma.comment.update({
        where: {
            id: commentId
        }, 
        data : {
            media: reqBody.media,
            text: reqBody.text
        }
    }) :
    c = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            media: reqBody.media
        }
    })

    return res.status(StatusCodes.CREATED).json({comment: c})
}

const deleteComment = async (req: AuthRequest, res: Response) => {
    const commentId: number = Number(req.params.commentId)

    const comment = await getCommentById(commentId)
    if (!comment) {
        throw new AppError("Invalid comment id", StatusCodes.BAD_REQUEST)
    }
    if (comment.authorId !== req.user?.id!) {
        throw new AppError("Request Forbidden", StatusCodes.FORBIDDEN)
    }

    await prisma.comment.delete({
        where: {
            id: commentId
        }
    })
    return res.status(StatusCodes.OK).json({
        message: "Comment Successfully deleted"
    })
}

const getComments = async (req: AuthRequest, res: Response) => {
   const commentId : number = Number(req.params.commentId)
   
   const comment = await prisma.comment.findFirst({
    where: {
        id : commentId
    },
    include: {
        comments: true
    }
   })
    if (!comment) {
        throw new AppError("Invalid comment id", StatusCodes.BAD_REQUEST)
    }

    return res.status(StatusCodes.OK).json({comment})
}

const getPostComments = async (req: AuthRequest, res: Response) => {
    const postId: number = Number(req.params.postId)
    console.log(postId)

    const postComments = await prisma.comment.findMany({
        where: {
            postId: postId
        },
        include : {
            comments: true
        }
    })

    return res.status(StatusCodes.OK).json({postComments})
}

export {createComment, updateComment, deleteComment, getComments, getPostComments}