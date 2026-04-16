"use client"
import { queryClient } from "@/app/providers"
import Comments from "@/components/comment/comments"
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
    let {post: postId} = use(params)
    const {isPending: isPostPending, error: postError, data: post} = usePost(Number(postId))
    console.log(post)
    const {isPending: isCommentPending, error: commentError, data: comments} = useComment(Number(postId))
    
    return (
        <div className="mx-auto sm:w-175 border-x border-neutral-700 mt-2">
            {post && <PostCard postProps={post}/>}
            <CreateCommentCard commentType="postComment" id={Number(postId)} postId={Number(postId)}/>
            <Comments postId={Number(postId)}/>
        </div>
    )
}