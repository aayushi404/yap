import { queryClient } from "@/app/providers"
import { userPost, userProfile, userFollowers, userFollowings} from "@/lib/api/user"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useProfile = (username: string) => {
    
    const {isPending, error, data} = useQuery({
        queryKey: ["userProfile", username],
        queryFn: () => userProfile(username)
    })
    return {isPending, error, data}
}

export const useUserPost = (username: string) => {
    
    const {isPending, error, data} = useQuery({
        queryKey: ["userPost", username],
        queryFn: () => userPost(username, null)
    })
    return {isPending, error, data}
}

export const useFollowers = (username: string) => {
    const {isPending, error, data} = useQuery({
        queryKey: ["userFollowers", username],
        queryFn: () => userFollowers(username)
    })

    return {isPending, error, data}
}


export const useFollowings = (username: string) => {
    const {isPending, error, data} = useQuery({
        queryKey: ["userFollowing", username],
        queryFn: () => userFollowings(username)
    })

    return {isPending, error, data}
}