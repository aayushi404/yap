import Image from "next/image"
import Link from "next/link"
import { createTime } from "@/lib/services"
import { MediaPost } from "../mediaPost"
import { getFullTime } from "@/lib/services"
import { CommentType } from "@/schema/api"


const CommentCard = ({commentCardProps}: {commentCardProps: CommentType}) => {
    return (
        <div className="flex flex-col gap-2 border-t border-b py-2 border-t-neutral-800 ">
            <div className="flex flex-col gap-2 py-2 mx-auto sm:w-150">
                <div className="flex">
                    <div>{commentCardProps.author.profile?.profileImage && (
                        <Image 
                        src={commentCardProps.author.profile.profileImage}
                        alt=""
                        width={30}
                        height={30}
                        />
                        )}
                    </div>
                    <div className="flex gap-2 items-end">
                        <div><Link href={`/${commentCardProps.author.username}`} className="hover:underline text-xl font-stretch-80%" onClick={e => e.stopPropagation()}>{commentCardProps.author.name}</Link></div>
                        <div><Link href={`/${commentCardProps.author.username}`} onClick={e => e.stopPropagation()}>{commentCardProps.author.username}</Link></div>
                        <div>{createTime(new Date(commentCardProps.createdAt))}</div>
                    </div>
                </div>

                <div className="">{commentCardProps.text}</div>

                {commentCardProps.media.length !== 0 && 
                (<MediaPost media={commentCardProps.media}/>)}
            
                <div>{getFullTime(new Date(commentCardProps.createdAt))}</div>

                </div>
            </div>
    )
}

export default CommentCard