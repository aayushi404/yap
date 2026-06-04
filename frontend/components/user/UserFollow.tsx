import { userFollow } from "@/schema/api"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { useFollow } from "@/hooks/useFolow"
import { useAuthStore } from "@/hooks/auth"
import { UnFollowButton } from "../ui/buttons"

const UserFollow = ({user, parentUsername}:
    {
        user: userFollow,
        parentUsername: string
    }
) => {
    const {follow, unfollow} = useFollow()
    const username = useAuthStore(state => state.user?.username)
    if (!username) return
    return (
        <div className="flex justify-between">
            <div className="flex gap-4">
                <Link href="/" className="flex w-fit cursor-pointer items-center justify-center rounded-full p-3 hover:bg-neutral-900 bg-neutral-800 transition-colors">
                    <div className="size-3 sm:size-4 rounded-full ">
                    {user.profileImage && (
                        <Image
                        src={user.profileImage}
                        alt="appLogo"
                        height={28}
                        width={28}
                    />
                    )}
                    </div>
                </Link>
                <div>
                    <div>
                        <Link href={`/${user.username}`} className="hover:underline text-xl font-stretch-80%" onClick={e => e.stopPropagation()}>{user.name}</Link>
                    </div>
                    <div className="text-neutral-400">
                        <Link href={`/${user.username}`} onClick={e => e.stopPropagation()}>@{user.username}</Link>
                        {user.isFollowing ? (
                            <span className="bg-neutral-600 rounded-sm px-1.5">Follows you</span>
                        ): null}

                    </div>

                </div>
            </div>
            {user.username !== username ? (
                <div>{user.isFollower ? (
                    <UnFollowButton onClick={() => unfollow(user.id, username, parentUsername)}/>
                ): user.isFollowing ? (
                    <Button onClick={() => follow(user.id, username, parentUsername)}>
                        Follow back
                    </Button>
                ):(
                    <Button onClick={() => follow(user.id, username, parentUsername)}>Follow</Button>
                )}</div>
            ): null}
        </div>
    )
}
export default UserFollow