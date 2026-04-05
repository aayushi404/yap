import Image from "next/image"
import type { FeedType } from "@/schema/api"
import Link from "next/link"

const PostCard = ({postProps}: {postProps:FeedType}) => {
    function createTime(createdAt: Date) {
        const currentTime = new Date()
        
        if (createdAt.getFullYear() !== currentTime.getFullYear()) {
            const day = String(createdAt.getDate()).padStart(2, '0')
            const month = String(createdAt.getMonth() + 1).padStart(2, '0')
            const year = String(createdAt.getFullYear()).slice(-2)
            return `${day}/${month}/${year}`
        }
        
        const timeDiff = currentTime.getTime() - createdAt.getTime()
        const hoursDiff = timeDiff / (1000 * 60 * 60)
        const daysDiff = timeDiff / (1000 * 60 * 60 * 24)
        
        if (daysDiff < 1) {
            const hours = Math.floor(hoursDiff)
            if (hours === 0) {
                const minutes = Math.floor(timeDiff / (1000 * 60))
                return minutes === 0 ? 'now' : `${minutes}m`
            }
            return `${hours}h`
        }
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const day = createdAt.getDate()
        const month = monthNames[createdAt.getMonth()]
        return `${day} ${month}`
    }
    
    return (
        <div>
            <div className="flex gap-3">
                <div>{postProps.author.profileImage && (
                    <Image 
                    src={postProps.author.profileImage}
                    alt=""
                    width={30}
                    height={30}
                    />
                    )}
                </div>
                <div><Link href={`/${postProps.author.username}`} className="hover:underline text-xl font-stretch-80%">{postProps.author.name}</Link></div>
                <div><Link href={`/${postProps.author.username}`}>@{postProps.author.username}</Link></div>
                <div>{createTime(new Date(postProps.createdAt))}</div>
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