"use client"

import UserPosts from "@/components/user/UserPosts"
import UserProfile from "@/components/user/UserProfile"
import { use } from "react"

export default function({
    params
}:{
    params: Promise<{username: string}>
}) {
    const {username} = use(params)

    return (
        <div className="">
            <UserProfile username={username}/>
            <UserPosts username={username}/>
        </div>
    )
}