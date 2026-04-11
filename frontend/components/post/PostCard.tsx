import Image from "next/image"
import type { FeedType } from "@/schema/api"
import Link from "next/link"
import { createTime } from "@/lib/services"
import { HeartIcon } from "@phosphor-icons/react"
import { useLikePost } from "@/hooks/likePost"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MediaPost } from "../mediaPost"

const PostCard = ({postProps}: {postProps:FeedType}) => {
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

    function openPost() {
        router.push(`/${postProps.author.username}/status/${postProps.id}`)
    }
    return (
        <div className="flex flex-col gap-2 border-t border-b py-2 border-t-neutral-800 hover:cursor-pointer" onClick={openPost}>
            <div className="flex z-1000">
                <div>{postProps.author.profileImage && (
                    <Image 
                    src={postProps.author.profileImage}
                    alt=""
                    width={30}
                    height={30}
                    />
                    )}
                </div>
                <div className="mx-auto sm:w-150 flex gap-2 items-end">
                    <div><Link href={`/${postProps.author.username}`} className="hover:underline text-xl font-stretch-80%">{postProps.author.name}</Link></div>
                    <div><Link href={`/${postProps.author.username}`}>@{postProps.author.username}</Link></div>
                    <div>{createTime(new Date(postProps.createdAt))}</div>
                </div>
            </div>

            <div className="mx-auto sm:w-150">{postProps.text}</div>

            {postProps.media.length !== 0 && 
            (<MediaPost media={postProps.media}/>)}
            <div className="z-1000">
                <button className={`flex gap-1 items-center cursor-pointer hover:text-pink-600 ${liked && "text-pink-600"}`} onClick={likeClickHandler}>
                    <HeartIcon size={26} />
                    <span>{postProps.likes}</span>
                </button>
            </div>
        </div>
    )
}
export default PostCard