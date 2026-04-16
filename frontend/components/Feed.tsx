import useFeed from "@/hooks/feed"
import FeedPostCard from "./post/FeedPostCard"
import { CreatePost } from "./post/CreatePost"
import { Spinner } from "./ui/spinner"

const Feed = () => {
  const {isPending, error, data} = useFeed()
  
    return (
    <div className="mx-auto sm:w-175 border border-neutral-700 mt-2">
        <CreatePost />
        {isPending && (<Spinner className="size-8" />)}
        <div className="">
            {data && data.map((post) => (
                <FeedPostCard postProps={post} key={post.id}/>
            ))}
        </div>
    </div>

    )
}

export default Feed