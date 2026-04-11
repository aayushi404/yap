"use client"
import { queryClient } from "@/app/providers"
import { CreateCommentCard } from "@/components/comment/createComment"
import PostCard from "@/components/post/PostCard"
import { usePost } from "@/hooks/cratePost"
import { useComment } from "@/hooks/useComment"
import {use, useEffect} from "react"

export default function Post({
    params
}: {
    params: Promise<{post: string}>
}) {
    const {post: postId} = use(params)
    const {isPending: isPostPending, error: postError, data: post} = usePost(Number(postId))
    console.log(post)
    const {isPending: isCommentPending, error: commentError, data: comments} = useComment(Number(postId))
    
    return (
        <div>
            {post && <PostCard postProps={post}/>}
            <CreateCommentCard commentType="postComment" id={Number(postId)} postId={Number(postId)}/>
            postComment
        </div>
    )
}