"use client"

import { use } from "react"

export default function({
    params
}:{
    params: Promise<{username: string}>
}) {
    const {username} = use(params)

    return (
        <div>
            {username}
            
        </div>
    )
}