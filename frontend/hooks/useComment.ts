import { queryClient } from "@/app/providers"
import { api } from "@/lib/api/client"
import { getCommentById, getCommentReplies, getPostComments } from "@/lib/api/comment"
import { createCommentInput } from "@/schema/validator"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { number } from "zod"

export const useCommentss = (postId: number) => {
    const {isPending, error, data} = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => {
            return getPostComments(postId, null)
        }
    })
    return {isPending, error, data}
}

export const useComments = ({commentType, id}: {commentType: "comments" | "replies", id: number}) => {
    const queryKey = commentType === "comments" ? ["comments", id] : ["replies", id];
    const queryFn = commentType === "comments" 
        ? () => getPostComments(id, null)
        : () => getCommentReplies(id, null);

    const {isPending, error, data} = useQuery({
        queryKey,
        queryFn
    });

    return {isPending, error, data};
}
export const useComment = (commentId:number) => {
    const {isPending, error, data} = useQuery({
        queryKey: ["comment", commentId],
        queryFn: () => {
            return getCommentById(commentId)
        }
    })
    return {isPending, error, data}
}

export const useReplies = (commentId: number) => {
    const {isPending, error, data} = useQuery({
        queryKey: ["replies", commentId],
        queryFn: () => {
            return getCommentReplies(commentId, null)
        }
    })
    return {isPending, error, data}
}

export const useCreateComment = () => {
    const mutation = useMutation({
        mutationFn: async ({comment, postId}: {comment: createCommentInput, postId: number}) => {
            await api.post("/comment", comment)
            return postId
        },
        onSuccess : (postId:number) => {
            queryClient.invalidateQueries({queryKey: ["comments", postId]})
            toast.success("Comment created")
        },
        onError : (error) => {
            console.log(error)
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error)
            }
        }
    })

    return {
        createComment: mutation.mutate,
        isPending: mutation.isPending
    }
}
export const useCreateReplies = () => {
    const mutation = useMutation({
        mutationFn: async ({comment, commentId}: {comment:createCommentInput, commentId: number}) => {
            await api.post("/comment", comment)
            return commentId
        },
        onSuccess: (commentId: number) => {
            queryClient.invalidateQueries({queryKey: ["replies", commentId]})
            toast.success("comment created!!")
        },
        onError: (error) => {
            console.log(error)
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error)
            }
        }
    })

    return {
        createReply: mutation.mutate,
        isPending: mutation.isPending
    }
}