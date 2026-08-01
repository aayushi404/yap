"use client";

import Image from "next/image";
import Link from "next/link";
import { createTime } from "@/lib/services";
import {MediaPost} from "@/components/mediaPost"
import { useRouter } from "next/navigation";

type postPropsType = {
    username: string;
    profileImage:string | null;
    name: string;
    text: string | null;
    media: string[];
    createdAt: Date;
    id: number;
    onClickHandler: () => void;
}

export default function PostCard({postProps}: {postProps:postPropsType}) {
    
    return (
        <div onClick={postProps.onClickHandler} className="hover:cursor-pointer flex flex-col gap-2 py-2">
                <div className="flex gap-2 items-start">
                    <Link href={`/${postProps.username}`} className="flex cursor-pointer items-center justify-center rounded-full hover:bg-neutral-900 bg-neutral-800 transition-colors">
                        <div className="size-8 sm:size-9 rounded-full object-cover overflow-hidden">
                        {postProps.profileImage && (
                            <Image
                            src={postProps.profileImage}
                            alt="appLogo"
                            height={36}
                            width={36}
                            className="object-contain"
                        />
                        )}
                        </div>
                    </Link>
          
                    <div className="flex gap-2 items-end">
                        <div>
                            <Link href={`/${postProps.username}`} className="hover:underline text-xl font-stretch-80%" onClick={e => e.stopPropagation()}>{postProps.name}</Link>
                        </div>
                        <div className="flex gap-1 text-sm text-neutral-400 items-center">
                            <div>
                                <Link href={`/${postProps.username}`} onClick={e => e.stopPropagation()}>@{postProps.username}</Link>
                            </div>
                            <div>.{createTime(new Date(postProps.createdAt))}</div>
                        </div>
                    </div>
                </div>

                <div className="sm:ml-12 ml-10">{postProps.text}</div>
                <div className="sm:ml-12 ml-10">
                    {postProps.media.length !== 0 && 
                    (<MediaPost media={postProps.media}/>)}
                </div>
            </div>
    )
}