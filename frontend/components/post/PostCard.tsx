import Image from "next/image"
import type { FeedType } from "@/schema/api"
import Link from "next/link"
import { createTime } from "@/lib/services"

const PostCard = ({postProps}: {postProps:FeedType}) => {
    return (
        <div className="flex flex-col gap-2 border-t border-b py-2 border-t-neutral-800">
            <div className="flex">
                <div>{postProps.author.profileImage && (
                    <Image 
                    src={postProps.author.profileImage}
                    alt=""
                    width={30}
                    height={30}
                    />
                    )}
                </div>
                <div className="mx-auto sm:w-150 flex gap-2 items-end">
                    <div><Link href={`/${postProps.author.username}`} className="hover:underline text-xl font-stretch-80%">{postProps.author.name}</Link></div>
                    <div><Link href={`/${postProps.author.username}`}>@{postProps.author.username}</Link></div>
                    <div>{createTime(new Date(postProps.createdAt))}</div>
                </div>
            </div>

            <div className="mx-auto sm:w-150">{postProps.text}</div>

            {postProps.media.length !== 0 && 
            (
                <div className="sm:w-150 aspect-video grid gap-1 overflow-hidden rounded-xl mx-auto border border-neutral-500">
                    {postProps.media.length === 1 && (
                        <div className="relative w-full h-full">
                            <Image
                                src={postProps.media[0]}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    )}

                    {postProps.media.length === 2 && (
                        <div className="grid grid-cols-2">
                        {postProps.media.map((img, idx) => (
                            <div key={idx} className="relative w-full h-full">
                            <Image
                                src={img}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            </div>
                        ))}
                        </div>
                    )}

                    {postProps.media.length === 3 && (
                        <div className="grid grid-cols-2 grid-rows-2">
                        <div className="relative row-span-2">
                            <Image
                            src={postProps.media[0]}
                            alt=""
                            fill
                            unoptimized
                            className="object-cover"
                            />
                        </div>

                        {postProps.media.slice(1).map((img, idx) => (
                            <div key={idx} className="relative w-full h-full">
                            <Image
                                src={img}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            </div>
                        ))}
                        </div>
                    )}
                    {postProps.media.length === 4 && (
                        <div className="grid grid-cols-2 grid-rows-2">
                            {postProps.media.map((img, idx) => (
                                <div key={idx} className="relative w-full h-full">
                                <Image
                                    src={img}
                                    alt=""
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default PostCard