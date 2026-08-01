import Image from "next/image"
import Link from "next/link"
import { createTime } from "@/lib/services"
import { MediaPost } from "../mediaPost"
import { getFullTime } from "@/lib/services"
import { CommentType } from "@/schema/api"
import PostCard from "../PostCard"


const CommentCard = ({commentCardProps}: {commentCardProps: CommentType}) => {
    return (
        <div className="flex flex-col gap-2 border-t border-b p-4 border-t-neutral-800 ">
            <PostCard postProps={{
                username: commentCardProps.author.username,
                profileImage: commentCardProps.author.profile?.profileImage || null,
                name: commentCardProps.author.name,
                text: commentCardProps.text,
                media: commentCardProps.media,
                createdAt: new Date(commentCardProps.createdAt),
                id: commentCardProps.id,
                onClickHandler: () => {}
            }}/>
            <div className="sm:ml-12 ml-10 text-neutral-500">{getFullTime(new Date(commentCardProps.createdAt))}</div>    
        </div>
    )
}

export default CommentCard