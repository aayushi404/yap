import { api } from "./client"
import type { FeedType } from "@/schema/api"

const getFeed = async (cursor?:number) => {
    const url = cursor ? `/user/feed?limit=10&cursor=${cursor}` : "/user/feed?limit=10"
    const response = await api.get<{
        posts:FeedType[], 
        nextCursor:string
    }>(url)
    console.log(response.data   )
    return response.data.posts
}

const getPost = async (postId: number) => {
    const post = await api.get<{post:FeedType}>(`/post/${postId}`)
    return post.data.post
}

export {getFeed, getPost}