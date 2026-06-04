"use client"
import Header from "@/components/sidebars/header"
import { Spinner } from "@/components/ui/spinner"
import UserFollow from "@/components/user/UserFollow"
import { useFollowings } from "@/hooks/useProfile"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { use } from "react"

const Following = ({
    params
} : {
    params: Promise<{username: string}>
}) => {
    const {username} = use(params)
    const {isPending, error, data} = useFollowings(username)
    const router = useRouter()
    return (
        <div>
            <div className="flex-col gap-3">
                <Header onClickHandler={() => router.back()} header={username} subHeader=""/>
                <div className="flex justify-between h-10 mt-3 text-2xl px-4 items-center">
                    <Link href={`/${username}/followers`} className="">Followers</Link>
                    <Link href={`/${username}/following`} className="border-b-4 border-neutral-300">Following</Link>
                </div>
            </div>
            <div className="flex flex-col mt-3 gap-3">
                {data && data.map((u) => (
                    <UserFollow user={u} parentUsername={username} key={u.id}/>
                ))}
            </div>

            {isPending && (
                <div className="flex justify-center p-4">
                <Spinner className="size-8" />
                </div>
            )}

            {/* Error Handling */}
            {error && (
                <div className="p-4 text-center text-red-500">
                Failed to load feed.
                </div>
            )}
        </div>
    )
}

export default Following