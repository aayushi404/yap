import { createCommentInput } from "@/schema/validator"
import { api } from "./client"
import { PostCommentsType } from "@/schema/api"

export const createComment = async (comment: createCommentInput) => {
    await api.post("/comment/", comment)
}

export const getPostComments = async (postId: number) => {
    const comments = await api.get<PostCommentsType>(`/comment/post/${postId}`)
    return comments.data
}