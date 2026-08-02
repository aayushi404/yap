import { queryClient } from "@/app/providers"
import { api } from "@/lib/api/client"
import { userPost, userProfile, userFollowers, userFollowings} from "@/lib/api/user"
import { updateProfileInput } from "@/schema/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useProfile = (username: string) => {
    
    const {isPending, error, data} = useQuery({
        queryKey: ["userProfile", username],
        queryFn: () => userProfile(username)
    })
    return {isPending, error, data}
}

export const useProfileUpdate = () => {
    const mutation = useMutation({
        mutationFn: async ({data, id, username}: {data: updateProfileInput, id: number, username: string}) => {
            await api.post(`/user/profile?userId=${id}`, {
                name: data.name,
                bio: data.bio,
                profileImage: data.profileImage
            })
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({queryKey: ["userProfile", variables.username]})
            // Update the user data in the auth store
            // setUser({id: variables.id, name: variables.data.name, bio: variables.data.bio, profileImage: variables.data.profileImage})
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                console.log(error.response?.data)
            }
            if (error instanceof Error){
                console.log(error.message)
            }
            toast.error("Failed to update profile")
        }
    })
    return {updateProfile: mutation.mutate, isPending: mutation.isPending, isSuccess: mutation.isSuccess}
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

function setUser(arg0: any) {
    throw new Error("Function not implemented.")
}
