import { useUserPost } from "@/hooks/useProfile"
import { Spinner } from "../ui/spinner"
import FeedPostCard from "../post/FeedPostCard"

const UserPosts = ({username}: 
    {
        username: string
    }
) => {
    const {isPending, error, data} = useUserPost(username)
    return (
        <>
        <div className="flex flex-col px-4">
            {data && data.map((post) => (
                <FeedPostCard postProps={post} key={post.id} />
            ))}
        </div>


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
        
        </>
    )
}

export default UserPosts