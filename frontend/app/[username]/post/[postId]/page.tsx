"use client"
import { queryClient } from "@/app/providers"
import Comments from "@/components/comment/comments"
import { CreateCommentCard } from "@/components/comment/createComment"
import PostCard from "@/components/post/PostCard"
import { usePost } from "@/hooks/usePost"
import { useComments } from "@/hooks/useComment"
import {use, useEffect} from "react"
import FeedSidebar from "@/components/sidebars/FeedSidebar"

export default function Post({
    params
}: {
    params: Promise<{postId: string}>
}) {
    let {postId} = use(params)
    const {isPending: isPostPending, error: postError, data: post} = usePost(Number(postId))
    
    return (
        <>
            {post && <PostCard postProps={post}/>}
            <CreateCommentCard commentType="postComment" id={Number(postId)}/>
            <Comments commentType="comments" id={Number(postId)}/>
        </>
    )
}