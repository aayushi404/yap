import Image from "next/image"
import Link from "next/link"
import { createTime } from "@/lib/services"
import { MediaPost } from "../mediaPost"
import { getFullTime } from "@/lib/services"

type CommentCardType = {
    id: Number,
    text: string | null,
    media: string[],
    createdAt: Date,
    author: {
        name: string,
        username: string,
        profileImage: string | null
    },
    replies: CommentCardType
}
const CommentCard = ({commentCardProps}: {commentCardProps: CommentCardType}) => {
    return (
        <div>
            <div>
                <div className="flex">
                    <div>{commentCardProps.author.profileImage && (
                        <Image 
                        src={commentCardProps.author.profileImage}
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