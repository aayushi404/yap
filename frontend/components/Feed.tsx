import useFeed from "@/hooks/feed"
import FeedPostCard from "./post/FeedPostCard"
import { CreatePost } from "./post/CreatePost"

const FeedSkeleton = () => (
  <div className="mx-auto w-full max-w-3xl space-y-3">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-[24px] border border-white/10 bg-neutral-950/80 p-4 shadow-sm shadow-black/20"
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-neutral-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded-full bg-neutral-800" />
            <div className="h-3 w-32 rounded-full bg-neutral-800" />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-4 w-full rounded-full bg-neutral-800" />
          <div className="h-4 w-3/4 rounded-full bg-neutral-800" />
          <div className="h-28 rounded-[18px] bg-neutral-800" />
        </div>
      </div>
    ))}
  </div>
)

const Feed = () => {
  const { isPending, error, data } = useFeed()

  return (
    <div className="mx-auto w-full max-w-3xl px-2 py-3 sm:px-4 sm:py-4">
      
          <div className="min-w-0 flex-1">
            <CreatePost />
          </div>
      

      {isPending && <FeedSkeleton />}

      {error && (
        <div className="mx-auto mt-4 max-w-3xl rounded-[20px] border border-red-500/20 bg-red-500/10 px-4 py-4 text-center text-sm text-red-300">
          Failed to load feed. Please try again in a moment.
        </div>
      )}

      {data && data.length > 0 && (
        <div className="mx-auto mt-4 flex flex-col gap-3">
          {data.map((post) => (
            <FeedPostCard postProps={post} key={post.id} />
          ))}
        </div>
      )}

      {data && data.length === 0 && !isPending && !error && (
        <div className="mx-auto mt-4 max-w-3xl rounded-[20px] border border-white/10 bg-neutral-950/70 px-4 py-8 text-center text-sm text-neutral-400">
          Your feed is empty right now. Follow more people to see posts here.
        </div>
      )}
    </div>
  )
}

export default Feed