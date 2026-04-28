import Image from "next/image"
import type { FeedType } from "@/schema/api"
import Link from "next/link"
import { createTime, getFullTime } from "@/lib/services"
import { HeartIcon } from "@phosphor-icons/react"
import { useLikePost } from "@/hooks/likePost"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MediaPost } from "../mediaPost"

const PostCard = ({postProps}: {postProps:FeedType}) => {
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
        <div className="flex flex-col gap-2 border-t border-b py-2 border-t-neutral-800 ">
            <div  className="flex flex-col gap-3 py-2 ">
                <div className="flex gap-2 items-start">
                    <Link href="/" className="flex w-fit cursor-pointer items-center justify-center rounded-full p-3 hover:bg-neutral-900 bg-neutral-800 transition-colors">
                        <div className="size-4 sm:size-5 rounded-full ">
                        {postProps.author.profileImage && (
                            <Image
                            src={postProps.author.profileImage}
                            alt="appLogo"
                            height={28}
                            width={28}
                        />
                        )}
                        </div>
                    </Link>
          
                    <div className="flex gap-2 items-end">
                        <div><Link href={`/${postProps.author.username}`} className="hover:underline text-xl font-stretch-80%" onClick={e => e.stopPropagation()}>{postProps.author.name}</Link></div>
                        <div><Link href={`/${postProps.author.username}`} onClick={e => e.stopPropagation()}>{postProps.author.username}</Link></div>
                        <div>{createTime(new Date(postProps.createdAt))}</div>
                    </div>
                </div>



                <div className="sm:ml-2 ml-1">{postProps.text}</div>
                
                <div className="sm:ml-2 ml-1">
                {postProps.media.length !== 0 && 
                (<MediaPost media={postProps.media}/>)}
                </div>
            
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
export default PostCard