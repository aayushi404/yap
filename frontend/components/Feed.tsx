import useFeed from "@/hooks/feed"
import PostCard from "./post/PostCard"
import { CreatePost } from "./post/CreatePost"
import { Spinner } from "./ui/spinner"

const Feed = () => {
  const {isPending, error, data} = useFeed()
  
    return (
    <div className="mx-auto sm:w-175 border">
        <CreatePost />
        {isPending && (<Spinner className="size-8" />)}
        {data && data.posts.map((post) => (
            <PostCard postProps={post} key={post.id}/>
        ))}
    </div>

    )
}

export default Feed