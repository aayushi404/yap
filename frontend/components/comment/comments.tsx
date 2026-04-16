import { useComment } from "@/hooks/useComment"

const Comments = ({postId} : {postId: number}) => {
    const {isPending, error, data} = useComment(postId)
    return (
        <div>
        </div>
    )
}

export default Comments