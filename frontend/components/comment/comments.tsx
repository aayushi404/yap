import { useComment, useComments } from "@/hooks/useComment"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createTime } from "@/lib/services"
import { MediaPost } from "../mediaPost"
import { useRouter } from "next/navigation"
import { ChatCircleIcon } from "@phosphor-icons/react"
import PostCard from "../PostCard"

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
                   <PostCard postProps={{
                        username: comment.author.username,
                        profileImage: comment.author.profile?.profileImage || null,
                        name: comment.author.name,
                        text: comment.text,
                        media: comment.media,
                        createdAt: new Date(comment.createdAt),
                        id: comment.id,
                        onClickHandler: () => openComment(comment.author.username,comment.id)
                    }}/> 
                </div>
            ))}
        </div>
    )
}

export default Comments