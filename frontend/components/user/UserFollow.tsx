import { userFollow } from "@/schema/api"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { useFollow } from "@/hooks/useFollow"
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

    if (!username) return null

    const displayName = user.name?.trim() || user.username || "User"
    const displayInitial = displayName.charAt(0).toUpperCase()
    const showFollowAction = user.username !== username

    return (
        <div className=" bg-neutral-950/70 px-3 py-3 shadow-sm shadow-black/20 backdrop-blur-sm transition-all hover:border-neutral-700 hover:bg-neutral-900/80 sm:px-4 sm:py-3.5">
            <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Link
                        href={`/${user.username}`}
                        className="group flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-neutral-800 transition-transform hover:scale-[1.03] sm:h-11 sm:w-11"
                        onClick={e => e.stopPropagation()}
                    >
                        {user.profileImage ? (
                            <Image
                                src={user.profileImage}
                                alt={`${displayName} avatar`}
                                height={44}
                                width={44}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-neutral-200">
                                {displayInitial}
                            </span>
                        )}
                    </Link>

                    <div className="min-w-0 flex-1">
                        <Link
                            href={`/${user.username}`}
                            className="block truncate text-sm font-semibold text-white transition-colors hover:text-neutral-200 sm:text-base"
                            onClick={e => e.stopPropagation()}
                        >
                            {displayName}
                        </Link>

                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-neutral-400">
                            <Link href={`/${user.username}`} className="truncate hover:text-neutral-300" onClick={e => e.stopPropagation()}>
                                @{user.username}
                            </Link>
                            {user.isFollowing ? (
                                <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                                    Follows you
                                </span>
                            ) : null}
                        </div>
                    </div>
                </div>

                {showFollowAction ? (
                    <div className="ml-2 flex shrink-0 items-center">
                        {user.isFollower ? (
                            <UnFollowButton onClick={() => unfollow(user.id, username, parentUsername)} />
                        ) : user.isFollowing ? (
                            <Button
                                type="button"
                                size="sm"
                                className="rounded-full border border-white/10 bg-white px-3.5 py-2 text-sm font-medium text-neutral-950 shadow-sm transition-all hover:bg-neutral-200"
                                onClick={() => follow(user.id, username, parentUsername)}
                            >
                                Follow back
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                size="sm"
                                className="rounded-full border border-white/10 bg-white px-3.5 py-2 text-sm font-medium text-neutral-950 shadow-sm transition-all hover:bg-neutral-200"
                                onClick={() => follow(user.id, username, parentUsername)}
                            >
                                Follow
                            </Button>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default UserFollow