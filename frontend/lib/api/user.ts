import { userFollow as userFollowType, userProfile as userProfileType, userSearch as userSearchType } from "@/schema/api"
import { api } from "./client"
import { FeedType } from "@/schema/api"

export const userProfile = async (username : string) => {
    const response = await api.get<userProfileType | null>(`/user/profile?username=${username}`)
    return response.data
}

export const userPost = async (username: string, cursor: number | null) => {
    const url = cursor ? `/user/${username}/posts?cursor=${cursor}&limit=10` : `/user/${username}/posts?limit=10`

    const response = api.get<{
        posts: FeedType[],
        nextCursor: string
    }>(url)

    return (await response).data.posts

}

export const userFollowers = async (username: string) => {
    const response = await api.get<userFollowType[]>(`/user/${username}/followers`)
    return response.data
}

export const userFollowings = async (username: string) => {
    const response = await api.get<userFollowType[]>(`/user/${username}/following`)
    return response.data
}

export const userFollow = async (followingId: number) => {
    const response = await api.post<{
    followingId: number;
    createdAt: Date;
    followerId: number;
}>("/follow", {
        followingId: followingId
    })
    return response.data
}

export const userUnFollow = async (followingId: number) => {
    const response = await api.post<{
        message: string
}>("/follow/unfollow", {
        followingId: followingId
    })
    return response.data
}

export const userSearch = async (q: string) => {
    const response = await api.get<{
        response: userSearchType[]
    }>(`/user/search?q=${q}`)

    return response.data.response
}