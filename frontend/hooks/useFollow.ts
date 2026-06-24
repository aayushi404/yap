import { queryClient } from "@/app/providers"
import { userFollow, userUnFollow } from "@/lib/api/user"
import { userFollow as userFollowType, userProfile } from "@/schema/api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

type useFollowType = {
    followingId: number,
    task: "follow" | "unfollow",
    username: string,
    parentUsername: string
}

export const useFollow = () => {
    const mutation = useMutation({
        mutationFn: async ({followingId, task, username, parentUsername}: useFollowType) => {
            if (task === "follow") {
                await userFollow(followingId)
            } else {
                await userUnFollow(followingId)
            }
        },

        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({queryKey: ["userProfile", variables.username]})
            queryClient.invalidateQueries({queryKey: ["userProfile", variables.parentUsername]})
            queryClient.invalidateQueries({queryKey:["userFollowers", variables.parentUsername]})
            queryClient.invalidateQueries({queryKey:["userFollowing", variables.parentUsername]})
        },

        onMutate: ({followingId, task, username, parentUsername}: useFollowType) => {
            queryClient.cancelQueries({queryKey: ["userProfile", username]})
            queryClient.cancelQueries({queryKey: ["userProfile", parentUsername]})
            queryClient.cancelQueries({queryKey: ["userFollowers", parentUsername]})
            queryClient.cancelQueries({queryKey:["userFollowing", parentUsername]})

            const prevProfile = queryClient.getQueryData(["userProfile", username])
            const prevParentProfile = queryClient.getQueryData(["userProfile", parentUsername])
            const prevFollowers = queryClient.getQueryData(["userFollowers", parentUsername])
            const prevFollowing = queryClient.getQueryData(["userFollowing", parentUsername])
                
            queryClient.setQueryData(["userProfile", username], (old: userProfile | undefined) => {
                if (!old) return old

                if (task === "follow") {
                    return {...old,
                        isFollower: true,
                        followersCount: old.followersCount + 1
                    }
                }
                if (task === "unfollow") {
                    return {...old,
                        isFollower: false,
                        followersCount: old.followersCount - 1
                    }
                }
            })

            queryClient.setQueryData(["userProfile", parentUsername], (old: userProfile | undefined) => {
                if (!old) return old

                if (task === "follow") {
                    return {...old,
                        isFollower: true,
                        followersCount: old.followersCount + 1
                    }
                }

                if (task === "unfollow") {
                    return {
                        ...old,
                        isFollower: false,
                        followersCount: old.followersCount - 1
                    }
                }
            })

            queryClient.setQueryData(["userFollowers", parentUsername], (old: userFollowType[] |undefined) => {
                if (!old) return old

                if (task === "follow") {
                    return old.map(user => {
                        if (user.id === followingId) {
                            return {...user, isFollower: true}
                        } else return {...user}
                    })
                }

                if (task === "unfollow") {
                    return old.map(user => {
                        if (user.id === followingId) {
                            return {...user, isFollower: false}
                        } else return {...user}
                    })
                }
            })

            queryClient.setQueryData(["userFollowing", parentUsername], (old: userFollowType[] |undefined) => {
                if (!old) return old

                if (task === "follow") {
                    return old.map(user => {
                        if (user.id === followingId) {
                            return {...user, isFollower: true}
                        } else return {...user}
                    })
                }

                if (task === "unfollow") {
                    return old.map(user => {
                        if (user.id === followingId) {
                            return {...user, isFollower: false}
                        } else return {...user}
                    })
                }
            })


            return {prevProfile, prevFollowers, prevFollowing, prevParentProfile}
        },
        onError: (error, _variables, context) => {
            if (context?.prevProfile) {
                queryClient.setQueryData(["userProfile", _variables.username], context.prevProfile)
            }

            if (context?.prevParentProfile) {
                queryClient.setQueryData(["userPRofile", _variables.parentUsername], context.prevParentProfile)
            }

            if (context?.prevFollowers) {
                queryClient.setQueryData(["userFollowers", _variables.parentUsername], context.prevFollowers)
            }

            if (context?.prevFollowing) {
                queryClient.setQueryData(["userFollowing", _variables.parentUsername], context.prevFollowing)
            }

            console.log(error)

            if(error instanceof AxiosError) {
                toast.error(error.response?.data.error)
            }
        }
        
    })

    return {
        follow: (followindId:number, username:string, parentUsername:string) => mutation.mutate({followingId: followindId, task: "follow", username: username, parentUsername: parentUsername}),
        unfollow: (followingId: number, username:string,parentUsername: string) => mutation.mutate({followingId: followingId, task: "unfollow", username: username, parentUsername: parentUsername}),
        isPending: mutation.isPending
    }
}