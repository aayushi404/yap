import type { createPostInput } from "../schema/validator.js";
import prisma from "../utils/prismaCient.js";

const createsPost = async (data: {text?: string, media: string[]}, userId: number) => {
    let post : { text: string | null; media: string[]; createdAt: Date; updatedAt: Date; id: number; authorId: number; } | null = null
    if (data.text) {
        post = await prisma.post.create({
            data: {
                text: data.text,
                media: data.media,
                authorId: userId
            }
        })
    
    }else {
        post = await prisma.post.create({
            data: {
                media: data.media,
                authorId: userId
            }
        })
    }
    return post
}

const createsComment = async (data: {text? : string, media: string[], commentId?: number, postId?: number}, userId: number) => {
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
    if (data.text) {
        data.commentId ? 
        comment = await prisma.comment.create({
            data: {
                text: data.text,
                media: data.media,
                authorId: userId,
                commentId: data.commentId
            }
        }) :
        comment = await prisma.comment.create({
            data: {
                text: data.text,
                media: data.media,
                authorId: userId,
                postId: data.postId!
            }
        })
    } else {
        data.commentId ? 
        comment = await prisma.comment.create({
            data: {
                media: data.media,
                authorId: userId,
                commentId: data.commentId
            }
        }) :
        comment = await prisma.comment.create({
            data: {
                media: data.media,
                authorId: userId,
                postId: data.postId!
            }
        })
    }
    return comment
}

const getPostById = async (postId: number) => {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    return post
}

const getCommentById = async (commentId: number) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId
        }
    })
    return comment
}

export {createsPost, getPostById, getCommentById}