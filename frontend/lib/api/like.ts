import { api } from "./client"

const likePost = async (postId:number) => {
    await api.get(`/post/like/${postId}`)
}

const unlikePost = async (postId:number) => {
    await api.delete(`/post/dislike/${postId}`)
}

export {likePost, unlikePost}