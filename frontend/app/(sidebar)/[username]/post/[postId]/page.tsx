"use client"
import Comments from "@/components/comment/comments"
import { CreateCommentCard } from "@/components/comment/createComment"
import PostCard from "@/components/post/Post"
import { usePost } from "@/hooks/usePost"
import { useRouter } from "next/navigation"
import Header from "@/components/sidebars/header"
import { use } from "react"

const PostPageSkeleton = () => (
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

export default function Post({
    params
}: {
    params: Promise<{postId: string}>
}) {
    const router = useRouter()
    const {postId} = use(params)
    const {isPending: isPostPending, error: postError, data: post} = usePost(Number(postId))

    return (
        <div className="mx-auto w-full max-w-3xl px-2 py-3 sm:px-4 sm:py-4">
           <Header onClickHandler={() => router.back()} header="Post" subHeader=""/>

            {isPostPending && <PostPageSkeleton />}

            {!isPostPending && post && (
                <div className="flex flex-col gap-3 px-1 sm:px-0">
                        <PostCard postProps={post}/>
                        <CreateCommentCard commentType="postComment" id={Number(postId)}/>
                        <Comments commentType="comments" id={Number(postId)}/>
                </div>
            )}

            {!isPostPending && !post && postError && (
                <div className="mx-auto mt-3 max-w-3xl rounded-[20px] border border-red-500/20 bg-red-500/10 px-4 py-4 text-center text-sm text-red-300">
                    Failed to load this post.
                </div>
            )}
        </div>
    )
}