"use client"
import CommentCard from "@/components/comment/CommentCard";
import Comments from "@/components/comment/comments";
import { CreateCommentCard } from "@/components/comment/createComment";
import { useComment, useReplies } from "@/hooks/useComment";
import { use } from "react";

export default function Page({
    params
}: {
    params: Promise<{commentId: string}>
}) {
    const {commentId} = use(params)
    const {isPending: isCommentPending, error: commentError, data: comment} = useComment(Number(commentId))

    return (
        <div className="mx-auto sm:w-175 border-x border-neutral-700 mt-2">
            {comment && <CommentCard commentCardProps={comment}/>}
            <CreateCommentCard commentType="replyComment" id={Number(commentId)}/>
            <Comments commentType="replies" id={Number(commentId)}/>
        </div>
    )
}