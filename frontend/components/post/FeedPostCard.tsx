import Image from "next/image"
import type { FeedType } from "@/schema/api"
import Link from "next/link"
import { createTime } from "@/lib/services"
import { HeartIcon } from "@phosphor-icons/react"
import { useLikePost } from "@/hooks/likePost"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MediaPost } from "../mediaPost"
import PostCard from "../PostCard"

const FeedPostCard = ({postProps}: {postProps:FeedType}) => {
    const router = useRouter()
    const { likePost, unlikePost, isPending }= useLikePost()
    const [liked, setLiked] = useState(postProps.isLikedByMe)

    function likeClickHandler()  {
        if (liked) {
            unlikePost(postProps.id)
        }else {
            likePost(postProps.id)
        }
        setLiked(!liked)
    }

    return (
        <div className="flex flex-col gap-2 py-2">
            <PostCard postProps={{
                username: postProps.author.username,
                profileImage: postProps.author.profileImage,
                name: postProps.author.name,
                text: postProps.text,
                media: postProps.media,
                createdAt: new Date(postProps.createdAt),
                id: postProps.id,
                onClickHandler: () => router.push(`/${postProps.author.username}/post/${postProps.id}`)
            }}/>
            <div className="sm:ml-12 ml-10">
                <button className={`flex gap-1 items-center cursor-pointer hover:text-pink-600 ${liked && "text-pink-600"}`} onClick={likeClickHandler}>
                    <HeartIcon size={26} />
                    <span>{postProps.likes}</span>
                </button>
            </div>
        </div>
    )
}
export default FeedPostCard