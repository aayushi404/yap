import Image from "next/image"
import type { FeedType } from "@/schema/api"
import Link from "next/link"
import { createTime, getFullTime } from "@/lib/services"
import { HeartIcon } from "@phosphor-icons/react"
import { useLikePost } from "@/hooks/likePost"
import { useState } from "react"
import { useRouter } from "next/navigation"
import PostCard from "../PostCard"

const Post = ({postProps}: {postProps:FeedType}) => {
    const { likePost, unlikePost, isPending }= useLikePost()
    const [liked, setLiked] = useState(postProps.isLikedByMe)
    const router = useRouter()

    function likeClickHandler()  {
        if (liked) {
            unlikePost(postProps.id)
        }else {
            likePost(postProps.id)
        }
        setLiked(!liked)
    }

    return (
        <div className="flex flex-col gap-2 border-b py-2 border-t-neutral-800 ">
            <div  className="flex flex-col gap-3 py-2 ">
                
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
            
                <div className="sm:ml-2 ml-1 text-neutral-500">{getFullTime(new Date(postProps.createdAt))}</div>
            </div>
            <div className="border-t border-b py-2 px-4">
            <div className="">
                <button className={`flex gap-1 items-center cursor-pointer hover:text-pink-600 ${liked && "text-pink-600"}`} onClick={likeClickHandler}>
                    <HeartIcon size={26} />
                    <span>{postProps.likes}</span>
                </button>
            </div>
            </div>
        </div>
    )
}
export default Post