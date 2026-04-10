import { getPostComments } from "@/lib/api/comment"
import { useQuery } from "@tanstack/react-query"

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
    
}