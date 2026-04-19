import { useComment, useComments } from "@/hooks/useComment"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createTime } from "@/lib/services"
import { MediaPost } from "../mediaPost"
import { useRouter } from "next/navigation"
import { ChatCircleIcon } from "@phosphor-icons/react"

const Comments = ({commentType, id} : {commentType: "comments" | "replies",id: number}) => {
    const {isPending, error, data:comments} = useComments({commentType, id})
    const router = useRouter()
    const openComment = (username: string,commentId: number) => {
        router.push(`/${username}/comment/${commentId}`)
    }
    return (
        <div>
            {comments && comments.map((comment) => (
                <div className="flex flex-col gap-2 border-t border-b py-2 border-t-neutral-800" key={comment.id}>
                    <div onClick={() => openComment(comment.author.username, comment.id)} className="hover:cursor-pointer flex flex-col gap-2 py-2">
                        <div className="flex">
                            <div>{comment.author.profile?.profileImage && (
                                <Image 
                                src={comment.author.profile?.profileImage}
                                alt=""
                                width={30}
                                height={30}
                                />
                                )}
                            </div>
                            <div className="mx-auto sm:w-150 flex gap-2 items-end">
                                <div><Link href={`/${comment.author.username}`} className="hover:underline text-xl font-stretch-80%" onClick={e => e.stopPropagation()}>{comment.author.name}</Link></div>
                                <div><Link href={`/${comment.author.username}`} onClick={e => e.stopPropagation()}>{comment.author.username}</Link></div>
                                <div>{createTime(new Date(comment.createdAt))}</div>
                            </div>
                        </div>

                        <div className="mx-auto sm:w-150">{comment.text}</div>

                        {comment.media.length !== 0 && 
                        (<MediaPost media={comment.media}/>)}
                    </div>
                    <div className="border-t border-b py-2 mx-auto sm:w-150 px-4">
                    <div className="">
                        <button className={`flex gap-1 items-center cursor-pointer`} onClick={() => openComment(comment.author.username, comment.id)}>
                            <ChatCircleIcon size={26}/>
                            <span>{comment._count.comments}</span>
                        </button>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments