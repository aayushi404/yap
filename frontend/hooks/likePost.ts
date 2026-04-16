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

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({queryKey: ["fetchFeed"]})
            queryClient.invalidateQueries({queryKey: ["post", variables.postId]})
        },

        onMutate: ({postId, task}: LikePostType) => {

            queryClient.cancelQueries({queryKey: ["fetchFeed"]})
            queryClient.cancelQueries({queryKey: ["post", postId]})

            const prevPosts = queryClient.getQueryData(["fetchFeed"])
            const prevPost = queryClient.getQueryData(["post", postId])

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

            queryClient.setQueryData(["post", postId], (old: FeedType | undefined) => {
                if (!old) return old
                
                if (task === "like") {
                    return {...old, likes: old.likes + 1, isLikedByMe: true}
                } else {
                    return {...old, likes: old.likes - 1, isLikedByMe: false}
                }
            })
            return {prevPosts, prevPost}
        },
        onError: (error, _variables, context) => {
            if (context?.prevPosts) {
                queryClient.setQueryData(["fetchFeed"], context.prevPosts)
            }
            if (context?.prevPost) {
                queryClient.setQueryData(["post", _variables.postId], context.prevPost)
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