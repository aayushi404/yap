import { queryClient } from "@/app/providers"
import { likePost, unlikePost } from "@/lib/api/like"
import { FeedType } from "@/schema/api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosHeaders } from "axios"
import { toast } from "sonner"

type LikePostType = {
    postId: number,
    task: "like" | "unlike"
}

export const useLikePost = () => {
    const mutation =  useMutation({
        mutationFn: async ({postId, task}: LikePostType) => {
            if (task === "like") {
                await likePost(postId)
            } else {
                await unlikePost(postId)
            }
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["fetchFeed"]})
        },

        onMutate: ({postId, task}: LikePostType) => {

            queryClient.cancelQueries({queryKey: ["fetchFeed"]})

            const prevPosts = queryClient.getQueryData(["fetchFeed"])

            queryClient.setQueryData(["fetchFeed"], (old: FeedType[]|undefined) => {
            
                if (!old) return old

                if (task === "like") {
                    return old.map(post => {
                                    if (post.id === postId) {
                                        return {...post, likes: post.likes+1, isLikedByMe: true}
                                    } else {
                                        return post
                                    }
                                })
                }else {
                    return old.map(post => {
                        if (post.id === postId) {
                            return {...post, likes: post.likes - 1, isLikedByMe: false}
                        } else {
                            return post
                        }
                        })
                }
            })
            return prevPosts
        },
        onError: (error, _variables, context) => {
            if (context) {
                queryClient.setQueryData(["fetchFeed"], context)
            }
            console.log(error)
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.error)
            }
        }
    })
    return {
        likePost: (postId:number) => mutation.mutate({postId:postId, task:"like"}),
        unlikePost: (postId: number) => mutation.mutate({postId:postId, task: "unlike"}),
        isPending: mutation.isPending
    }
}