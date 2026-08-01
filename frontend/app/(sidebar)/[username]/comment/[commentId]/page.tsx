"use client"
import CommentCard from "@/components/comment/CommentCard";
import Comments from "@/components/comment/comments";
import { CreateCommentCard } from "@/components/comment/createComment";
import Header from "@/components/sidebars/header";
import { useComment } from "@/hooks/useComment";
import { useRouter } from "next/navigation";
import { use } from "react";

const CommentPageSkeleton = () => (
  <div className="mx-auto w-full max-w-3xl space-y-3 px-3 py-3 sm:px-4">
    <div className="animate-pulse rounded-[24px] border border-white/10 bg-neutral-950/80 p-4 shadow-sm shadow-black/20">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-neutral-800" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 rounded-full bg-neutral-800" />
          <div className="h-3 w-32 rounded-full bg-neutral-800" />
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="h-4 w-full rounded-full bg-neutral-800" />
        <div className="h-4 w-3/4 rounded-full bg-neutral-800" />
        <div className="h-24 rounded-[18px] bg-neutral-800" />
      </div>
    </div>

    <div className="animate-pulse rounded-[20px] border border-white/10 bg-neutral-950/70 p-4">
      <div className="h-4 w-28 rounded-full bg-neutral-800" />
      <div className="mt-3 h-10 rounded-[14px] bg-neutral-800" />
    </div>
  </div>
)

export default function Page({
    params
}: {
    params: Promise<{commentId: string}>
}) {
    const {commentId} = use(params)
    const {isPending: isCommentPending, error: commentError, data: comment} = useComment(Number(commentId))
    const router = useRouter()

    return (
        <div className="mx-auto w-full max-w-3xl px-2 py-3 sm:px-4 sm:py-4">
            <Header onClickHandler={() => router.back()} header="Post" subHeader=""/>

            {isCommentPending && <CommentPageSkeleton />}

            {comment && !isCommentPending && (
                <div className="space-y-3 px-1 sm:px-0">
                    
                        <CommentCard commentCardProps={comment}/>
                        <CreateCommentCard commentType="replyComment" id={Number(commentId)}/>
                        <Comments commentType="replies" id={Number(commentId)}/>
                </div>
            )}

            {!isCommentPending && !comment && commentError && (
                <div className="mx-auto mt-3 max-w-3xl rounded-[20px] border border-red-500/20 bg-red-500/10 px-4 py-4 text-center text-sm text-red-300">
                    Failed to load this post.
                </div>
            )}
        </div>
    )
}