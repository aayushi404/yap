import { createCommentInput } from "@/schema/validator"
import { api } from "./client"
import { CommentType, PostCommentsType } from "@/schema/api"

export const createComment = async (comment: createCommentInput) => {
    await api.post("/comment/", comment)
}

export const getPostComments = async (postId: number, cursor: number | null) => {
    const comments = await api.get<{comments:CommentType[], nextCursor: number | null}>(`/comment/${postId}/comments?limit=10&${cursor && cursor}`)
    return comments.data.comments
}

export const getCommentReplies = async (commentId: number, cursor: number | null) => {
    const replies = await api.get<{replies: CommentType[], nextCursor: number | null}>(`/comment/${commentId}/replies?limit=10&${cursor && cursor}`)
    return replies.data.replies
}

export const getCommentById = async (commentId: number) => {
    const comment = await api.get<{comment: CommentType}>(`/comment/${commentId}`)
    return comment.data.comment
}