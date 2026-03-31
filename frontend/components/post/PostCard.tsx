import Image from "next/image"
import type { FeedType } from "@/schema/api"

type PostCardProps = {
    name: string,
    username: string,
    profileImage? :string,
    text: string,
    media?: []
}
const PostCard = ({postProps}: {postProps:FeedType}) => {
    return (
        <div>
            <div>
                <div>{postProps.author.name}</div>
                <div>{postProps.author.username}</div>
            </div>
            <div>{postProps.text}</div>
            {postProps.media && 
            (
                <div>
                    {postProps.media.map((img, idx) => (
                        <Image 
                            src={img}
                            width={100}
                            height={100}
                            alt=""
                            key={idx}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
export default PostCard