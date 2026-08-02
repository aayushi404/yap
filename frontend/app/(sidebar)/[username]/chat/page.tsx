import { use } from "react"

export default function({
    params
}:{
    params: Promise<{username: string}>
}) {
    const {username} = use(params)

    return (
        <div className="flex justify-around items-center h-screen text-center text-lg font-semibold">
            Welcome to {username}'s chat page!
            This page is under construction. Please check back later for updates.
        </div>
    )
}