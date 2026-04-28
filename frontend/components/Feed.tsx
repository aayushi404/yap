import useFeed from "@/hooks/feed"
import FeedPostCard from "./post/FeedPostCard"
import { CreatePost } from "./post/CreatePost"
import { Spinner } from "./ui/spinner"

const Feed = () => {
  const { isPending, error, data } = useFeed();
  
  return (
    <>      
        <div className="flex w-full gap-4 border-b border-neutral-800 py-4 pb-2 pt-4">
          <div className="size-10 shrink-0 rounded-full bg-neutral-700"></div>
            <CreatePost />
        </div>
        
        {/* Loading Spinner */}
        {isPending && (
          <div className="flex justify-center p-4">
            <Spinner className="size-8" />
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="p-4 text-center text-red-500">
            Failed to load feed.
          </div>
        )}
        
        {/* The Posts Map */}
        <div className="flex flex-col">
            {data && data.map((post) => (
                <FeedPostCard postProps={post} key={post.id} />
            ))}
        </div>

    </>
  )
}

export default Feed