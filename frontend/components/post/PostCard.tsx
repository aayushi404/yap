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
    console.log(postProps)
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
                            width={600}
                            height={600}
                            alt=""
                            key={idx}
                            unoptimized
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
export default PostCard