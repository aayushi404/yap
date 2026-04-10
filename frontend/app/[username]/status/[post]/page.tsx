"use client"
import { useComment } from "@/hooks/useComment"
import {use} from "react"

export default function Post({
    params
}: {
    params: Promise<{post: number}>
}) {
    const {post} = use(params)
    const {isPending, error, data} = useComment(post)   
    if (data) { 
        return (
            <div>
                {JSON.stringify(data)}
            </div>
        )
    }
}