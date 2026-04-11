import { queryClient } from "@/app/providers"
import { api } from "@/lib/api/client"
import { getPostComments } from "@/lib/api/comment"
import { createCommentInput } from "@/schema/validator"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useComment = (postId: number) => {
    const {isPending, error, data} = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => {
            return getPostComments(postId)
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