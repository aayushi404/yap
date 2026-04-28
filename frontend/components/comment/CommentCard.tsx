import Image from "next/image"
import Link from "next/link"
import { createTime } from "@/lib/services"
import { MediaPost } from "../mediaPost"
import { getFullTime } from "@/lib/services"
import { CommentType } from "@/schema/api"


const CommentCard = ({commentCardProps}: {commentCardProps: CommentType}) => {
    return (
        <div className="flex flex-col gap-2 border-t border-b py-2 border-t-neutral-800 ">
            <div className="flex flex-col gap-2 py-2">
                <div className="flex gap-2 items-start">
                    <Link href="/" className="flex w-fit cursor-pointer items-center justify-center rounded-full p-3 hover:bg-neutral-900 bg-neutral-800 transition-colors">
                        <div className="size-3 sm:size-4<tab>    rounded-full ">
                        {commentCardProps.author.profile?.profileImage && (
                            <Image
                            src={commentCardProps.author.profile?.profileImage}
                            alt="appLogo"
                            height={28}
                            width={28}
                        />
                        )}
                        </div>
                    </Link>
    
                    <div className="flex gap-2 items-end">
                        <div><Link href={`/${commentCardProps.author.username}`} className="hover:underline text-xl font-stretch-80%" onClick={e => e.stopPropagation()}>{commentCardProps.author.name}</Link></div>
                        <div><Link href={`/${commentCardProps.author.username}`} onClick={e => e.stopPropagation()}>{commentCardProps.author.username}</Link></div>
                        <div>{createTime(new Date(commentCardProps.createdAt))}</div>
                    </div>
                </div>

                <div className="sm:ml-2 ml-1">{commentCardProps.text}</div>
                <div className="sm:ml-2 ml-1">
                    {commentCardProps.media.length !== 0 && 
                    (<MediaPost media={commentCardProps.media}/>)}
                </div>

                <div className="sm:ml-2 ml-1 text-neutral-500">{getFullTime(new Date(commentCardProps.createdAt))}</div>

                </div>
            </div>
    )
}

export default CommentCard